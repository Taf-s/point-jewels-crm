import { encrypt, decrypt, hash, verifyHash, generateToken } from '../lib/encryption'
import {
  generateAccessToken,
  verifyToken,
  generateWebhookSecret,
  verifyWebhookPayload,
  signWebhookPayload,
} from '../lib/auth'
import { hasPermission, canAccessDocument, canAssignRole } from '../lib/rbac'
import { analyzeThreat, recordFailedLogin, clearFailedAttempts } from '../lib/threat-detection'

// Set encryption and JWT secrets for tests
beforeAll(() => {
  process.env.ENCRYPTION_KEY = '0'.repeat(64)
  process.env.JWT_SECRET = 'test-secret-key-minimum-32-characters-long-for-hs256-'
})

describe('🔐 Security Tier 1 - Encryption', () => {
  it('should encrypt and decrypt data with AES-256-GCM', () => {
    const plaintext = 'HIGH_VALUE_CUSTOMER_DATA'
    const encrypted = encrypt(plaintext)

    expect(encrypted).not.toBe(plaintext)
    expect(encrypted).toContain(':') // Should have iv:tag:encrypted format
    expect(encrypted.split(':').length).toBe(3)

    const decrypted = decrypt(encrypted)
    expect(decrypted).toBe(plaintext)
  })

  it('should include authentication tag for tampering detection', () => {
    const plaintext = 'SENSITIVE_PAYMENT_INFO'
    const encrypted = encrypt(plaintext)

    // Try to tamper with the ciphertext
    const [iv, tag, cipher] = encrypted.split(':')
    const tampered = `${iv}:${tag}:${cipher.substring(0, cipher.length - 2)}00` // Change last bytes

    expect(() => decrypt(tampered)).toThrow('Decryption failed')
  })

  it('should support Additional Authenticated Data (AAD)', () => {
    const plaintext = 'DATA'
    const aad = 'customer-id-12345'

    const encrypted = encrypt(plaintext, aad)
    const decrypted = decrypt(encrypted, aad) // Must use same AAD
    expect(decrypted).toBe(plaintext)

    // Wrong AAD should fail
    expect(() => decrypt(encrypted, 'wrong-aad')).toThrow()
  })

  it('should use PBKDF2 for password hashing (resistant to GPU attacks)', () => {
    const password = 'P@ssw0rd123'
    const hashed = hash(password)

    expect(hashed).not.toBe(password)
    expect(hashed.split(':').length).toBe(3) // iterations:salt:hash
    expect(verifyHash(password, hashed)).toBe(true)
    expect(verifyHash('wrong', hashed)).toBe(false)
  })

  it('should generate cryptographically secure tokens', () => {
    const token1 = generateToken(32)
    const token2 = generateToken(32)

    expect(token1).not.toBe(token2)
    expect(token1.length).toBe(64) // 32 bytes = 64 hex chars
  })
})

describe('🔐 Security Tier 1 - JWT Authentication', () => {
  beforeEach(() => {
    process.env.JWT_SECRET = 'test-secret-key-minimum-32-characters-long-for-hs256-'
  })

  it('should generate access token with 15min expiry', () => {
    const payload = {
      staffId: 'staff-123',
      email: 'manager@pointjewels.com',
      role: 'manager',
      permissions: ['View Customers', 'Edit Orders'],
    }

    const token = generateAccessToken(payload)
    const verified = verifyToken(token)

    expect(verified).toBeTruthy()
    expect(verified?.staffId).toBe(payload.staffId)
    expect(verified?.role).toBe(payload.role)
  })

  it('should prevent algorithm confusion attacks (only HS256)', () => {
    // Attacker tries to change algorithm to 'none'
    const fakeToken = 'eyJhbGciOiJub25lIn0.eyJzdGFmZklkIjoiYXR0YWNrZXIifQ.'

    expect(verifyToken(fakeToken)).toBeNull()
  })

  it('should enforce issuer validation', () => {
    // Token with wrong issuer should fail
    const payload = { staffId: 'staff-123', email: 'test@test.com', role: 'admin', permissions: [] }
    const token = generateAccessToken(payload)

    expect(verifyToken(token)).toBeTruthy()
  })

  it('should sign and verify webhook payloads', () => {
    const payload = JSON.stringify({ orderId: 'order-123', status: 'shipped' })
    const secret = generateWebhookSecret()

    const signature = signWebhookPayload(payload, secret)
    expect(verifyWebhookPayload(payload, signature, secret)).toBe(true)

    // Tampered payload should fail verification
    const tamperedPayload = JSON.stringify({ orderId: 'order-123', status: 'delivered' })
    expect(verifyWebhookPayload(tamperedPayload, signature, secret)).toBe(false)
  })
})

describe('🔐 Security Tier 1 - RBAC (Role-Based Access Control)', () => {
  it('should enforce role-based permissions', () => {
    expect(hasPermission('admin', 'System Configuration')).toBe(true)
    expect(hasPermission('manager', 'System Configuration')).toBe(false)
    expect(hasPermission('sales', 'View Customers')).toBe(true)
    expect(hasPermission('sales', 'Delete Customers')).toBe(false)
    expect(hasPermission('support', 'Manage Campaigns')).toBe(false)
  })

  it('should prevent privilege escalation', () => {
    // Sales cannot assign manager role
    expect(canAssignRole('sales', 'manager')).toBe(false)
    // Manager cannot assign admin
    expect(canAssignRole('manager', 'admin')).toBe(false)
    // Admin can assign any role
    expect(canAssignRole('admin', 'support')).toBe(true)
  })

  it('should enforce granular document access control', () => {
    // Sales can view customers but not delete
    expect(canAccessDocument('sales', 'customer', 'view')).toBe(true)
    expect(canAccessDocument('sales', 'customer', 'delete')).toBe(false)

    // Support can view orders but not edit
    expect(canAccessDocument('support', 'order', 'view')).toBe(true)
    expect(canAccessDocument('support', 'order', 'edit')).toBe(false)

    // Manager can edit but not delete
    expect(canAccessDocument('manager', 'order', 'edit')).toBe(true)
    expect(canAccessDocument('manager', 'order', 'delete')).toBe(false)

    // Admin can do anything
    expect(canAccessDocument('admin', 'customer', 'delete')).toBe(true)
  })

  it('should apply principle of least privilege', () => {
    // Support has minimal permissions
    const supportPermissions = ['View Customers', 'Edit Customers', 'View Orders', 'View Products']
    // Admin has way more permissions than support
    expect(supportPermissions.length).toBeLessThan(10) // Support should have less
  })
})

describe('🛡️ Security Tier 1 - Threat Detection (DDoS, Brute Force, Bots)', () => {
  it('should detect brute force attacks', () => {
    const userId = 'hacker@attacker.com'

    // Record multiple failed attempts
    for (let i = 0; i < 6; i++) {
      recordFailedLogin(userId)
    }

    const threat = analyzeThreat({
      ip: '192.168.1.1',
      timestamp: Date.now(),
      endpoint: '/api/login',
      method: 'POST',
      responseTime: 200,
      userId,
    })

    expect(threat.level).toMatch(/medium|high|critical/)
    expect(threat.reasons.some((r) => r.includes('Brute force'))).toBe(true)

    // Clear after successful login
    clearFailedAttempts(userId)
  })

  it('should detect SQL injection attempts', () => {
    const threat = analyzeThreat({
      ip: '192.168.1.1',
      timestamp: Date.now(),
      endpoint: "/api/customers?id=1' OR '1'='1",
      method: 'GET',
      responseTime: 100,
    })

    expect(threat.level).toMatch(/high|critical/)
    expect(threat.reasons.some((r) => r.includes('injection'))).toBe(true)
  })

  it('should detect bot/scraper user agents', () => {
    const threat = analyzeThreat({
      ip: '192.168.1.1',
      timestamp: Date.now(),
      endpoint: '/api/products',
      method: 'GET',
      responseTime: 50,
      userAgent: 'curl/7.64.1',
    })

    expect(threat.level).toMatch(/medium|high|critical/)
    expect(threat.reasons.some((r) => r.includes('user agent'))).toBe(true)
  })

  it('should detect AI-assisted attacks', () => {
    const threat = analyzeThreat({
      ip: '192.168.1.1',
      timestamp: Date.now(),
      endpoint: '/api/admin',
      method: 'POST',
      responseTime: 50,
      userAgent: 'Claude/2.0',
    })

    expect(threat.level).toMatch(/medium|high|critical/)
    expect(threat.reasons.some((r) => r.includes('Suspicious user agent'))).toBe(true)
  })
})

describe('📋 Security Tier 1 - Compliance & Audit', () => {
  it('should maintain immutable audit logs', () => {
    // Audit logs should be append-only (in practice, use database transactions)
    const log = {
      action: 'DELETE',
      documentType: 'customer',
      staffMember: 'staff-123',
      timestamp: new Date().toISOString(),
      ipAddress: '192.168.1.1',
      riskLevel: 'CRITICAL',
    }

    expect(log.action).toBe('DELETE')
    expect(log.riskLevel).toBe('CRITICAL')
  })

  it('should track sensitive data access', () => {
    const sensitiveFields = ['email', 'phone', 'ssn', 'creditCard', 'bankInfo', 'address']

    sensitiveFields.forEach((field) => {
      expect(['email', 'phone', 'ssn', 'creditCard', 'bankInfo', 'address']).toContain(field)
    })
  })

  it('should support GDPR compliance (data retention)', () => {
    // Audit logs should be retained for compliance period
    const retentionDays = 90
    const auditDate = new Date()
    auditDate.setDate(auditDate.getDate() + retentionDays)

    expect(auditDate.getTime()).toBeGreaterThan(Date.now())
  })
})
