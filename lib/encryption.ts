import crypto from 'crypto'

/**
 * ENCRYPTION UTILITIES - TIER 1 SECURITY
 * AES-256-GCM encryption with authentication tags (prevents tampering)
 * Apple-grade cryptography with constant-time comparisons
 */

const ALGORITHM = 'aes-256-gcm'
const SALT_LENGTH = 32
const TAG_LENGTH = 16
const IV_LENGTH = 12

// Helper to get encryption key (supports runtime env var changes for testing)
function getEncryptionKey(): Buffer {
  const key = process.env.ENCRYPTION_KEY
  if (!key) {
    throw new Error('Encryption key not configured')
  }
  const keyBuffer = Buffer.from(key, 'hex')
  if (keyBuffer.length !== 32) {
    throw new Error('Encryption key must be 32 bytes (64 hex characters)')
  }
  return keyBuffer
}

/**
 * Encrypt sensitive data with GCM mode (includes authentication)
 * Prevents both eavesdropping and tampering
 * @param plaintext - Data to encrypt
 * @param additionalData - AAD (Additional Authenticated Data) for integrity
 * @returns Encrypted data with IV, tag, and AAD
 */
export function encrypt(plaintext: string, additionalData?: string): string {
  const ENCRYPTION_KEY = getEncryptionKey()

  if (!plaintext || plaintext.trim() === '') {
    throw new Error('Cannot encrypt empty data')
  }

  try {
    // Generate cryptographically random IV (12 bytes for GCM)
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv)

    // Add additional authenticated data (prevents tampering)
    if (additionalData) {
      cipher.setAAD(Buffer.from(additionalData, 'utf8'))
    }

    // Encrypt the plaintext
    let encrypted = cipher.update(plaintext, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    // Get authentication tag (prevents tampering)
    const tag = cipher.getAuthTag()

    // Format: iv:tag:encrypted
    return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted}`
  } catch (error) {
    console.error('Encryption failed:', error)
    throw new Error('Encryption operation failed')
  }
}

/**
 * Decrypt sensitive data with GCM mode verification
 * Verifies authenticity before decryption (prevents tampering)
 * @param ciphertext - Encrypted data (hex format: iv:tag:encrypted)
 * @param additionalData - AAD (must match encryption AAD)
 * @returns Decrypted plaintext
 */
export function decrypt(ciphertext: string, additionalData?: string): string {
  const ENCRYPTION_KEY = getEncryptionKey()

  try {
    const [ivHex, tagHex, encrypted] = ciphertext.split(':')

    if (!ivHex || !tagHex || !encrypted) {
      throw new Error('Invalid ciphertext format')
    }

    const iv = Buffer.from(ivHex, 'hex')
    const tag = Buffer.from(tagHex, 'hex')

    // Verify IV length
    if (iv.length !== IV_LENGTH) {
      throw new Error('Invalid IV length')
    }

    // Verify tag length
    if (tag.length !== TAG_LENGTH) {
      throw new Error('Invalid authentication tag length')
    }

    const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv)
    decipher.setAuthTag(tag)

    // Verify additional data if provided
    if (additionalData) {
      decipher.setAAD(Buffer.from(additionalData, 'utf8'))
    }

    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
  } catch (error) {
    console.error('Decryption failed:', error)
    throw new Error('Decryption failed - possible tampering detected')
  }
}

/**
 * Hash data with PBKDF2 (resistant to GPU/ASIC attacks)
 * Slower hash function prevents brute force attacks
 * @param plaintext - Data to hash
 * @param iterations - PBKDF2 iterations (default: 310,000 - NIST recommendation)
 * @returns Salted hash
 */
export function hash(plaintext: string, iterations: number = 310000): string {
  if (!plaintext) {
    throw new Error('Cannot hash empty data')
  }

  try {
    const salt = crypto.randomBytes(SALT_LENGTH)
    const hash = crypto.pbkdf2Sync(plaintext, salt, iterations, 64, 'sha256')
    // Format: iterations:salt:hash
    return `${iterations}:${salt.toString('hex')}:${hash.toString('hex')}`
  } catch (error) {
    console.error('Hashing failed:', error)
    throw new Error('Hashing operation failed')
  }
}

/**
 * Verify hash with constant-time comparison (prevents timing attacks)
 * @param plaintext - Data to verify
 * @param storedHash - Previously stored hash
 * @returns Boolean (uses constant-time comparison)
 */
export function verifyHash(plaintext: string, storedHash: string): boolean {
  if (!plaintext || !storedHash) {
    return false
  }

  try {
    const [iterations, salt, originalHash] = storedHash.split(':')
    const computed = crypto.pbkdf2Sync(
      plaintext,
      Buffer.from(salt, 'hex'),
      parseInt(iterations),
      64,
      'sha256'
    )

    // Constant-time comparison (prevents timing attacks)
    return crypto.timingSafeEqual(computed, Buffer.from(originalHash, 'hex'))
  } catch (_error) {
    // Return false on any error (prevents information leakage)
    return false
  }
}

/**
 * Generate cryptographically secure random token
 * Suitable for tokens, secrets, and random identifiers
 * @param length - Token length in bytes
 * @returns Random hex string
 */
export function generateToken(length: number = 32): string {
  if (length < 16) {
    throw new Error('Token length must be at least 16 bytes')
  }

  try {
    return crypto.randomBytes(length).toString('hex')
  } catch (error) {
    console.error('Token generation failed:', error)
    throw new Error('Failed to generate secure token')
  }
}

/**
 * Generate cryptographically secure random bytes
 * @param length - Number of bytes
 * @returns Random buffer
 */
export function generateRandomBytes(length: number): Buffer {
  if (length < 1) {
    throw new Error('Length must be at least 1')
  }

  try {
    return crypto.randomBytes(length)
  } catch (error) {
    console.error('Random bytes generation failed:', error)
    throw new Error('Failed to generate random bytes')
  }
}

/**
 * Create HMAC signature (for data integrity verification)
 * @param data - Data to sign
 * @param secret - Secret key
 * @returns HMAC signature
 */
export function createHMAC(data: string, secret: string): string {
  try {
    return crypto
      .createHmac('sha256', secret)
      .update(data)
      .digest('hex')
  } catch (error) {
    console.error('HMAC creation failed:', error)
    throw new Error('HMAC operation failed')
  }
}

/**
 * Verify HMAC signature (constant-time comparison)
 * @param data - Original data
 * @param signature - HMAC signature to verify
 * @param secret - Secret key
 * @returns Boolean
 */
export function verifyHMAC(data: string, signature: string, secret: string): boolean {
  try {
    const computed = createHMAC(data, secret)
    return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(signature))
  } catch (_error) {
    return false
  }
}

/**
 * Derive key from password (for key wrapping, not encryption)
 * Uses PBKDF2 with high iteration count
 * @param password - Password to derive from
 * @param salt - Salt (should be random)
 * @param length - Desired key length
 * @returns Derived key
 */
export function deriveKey(password: string, salt: Buffer, length: number = 32): Buffer {
  try {
    return crypto.pbkdf2Sync(password, salt, 310000, length, 'sha256')
  } catch (error) {
    console.error('Key derivation failed:', error)
    throw new Error('Key derivation failed')
  }
}
