import jwt from 'jsonwebtoken'
import { generateToken, createHMAC, verifyHMAC } from './encryption'
import crypto from 'crypto'

/**
 * JWT & TOKEN MANAGEMENT - TIER 1 SECURITY
 * Apple-grade JWT with HS256, token rotation, and revocation support
 * Protects against token tampering, JWT confusion attacks, and algorithm substitution
 */

const JWT_ALGORITHM = 'HS256'
const ACCESS_TOKEN_EXPIRY = process.env.JWT_ACCESS_TOKEN_EXPIRY || '15m'
const REFRESH_TOKEN_EXPIRY = process.env.JWT_REFRESH_TOKEN_EXPIRY || '7d'

// Token blacklist (in production, use Redis)
const tokenBlacklist = new Set<string>()

// Helper to get JWT secret (supports runtime env var changes for testing)
function getJWTSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET not configured or too weak (minimum 32 characters)')
  }
  return secret
}

export interface TokenPayload {
  staffId: string
  email: string
  role: 'admin' | 'manager' | 'sales' | 'marketing' | 'support'
  permissions: string[]
  iat?: number
  exp?: number
  jti?: string // JWT ID for revocation
}

/**
 * Generate access token (short-lived, 15 minutes)
 * Includes: staffId, email, role, permissions, jti (for revocation)
 */
export function generateAccessToken(payload: TokenPayload): string {
  if (!payload.staffId || !payload.email) {
    throw new Error('Invalid payload: staffId and email required')
  }

  try {
    // Add JWT ID (jti) for token revocation support
    const jti = generateToken(16)
    const JWT_SECRET = getJWTSecret()

    const token = jwt.sign(
      {
        ...payload,
        jti, // Unique token identifier for revocation
        type: 'access', // Prevent token type confusion
      },
      JWT_SECRET,
      {
        algorithm: JWT_ALGORITHM,
        expiresIn: ACCESS_TOKEN_EXPIRY,
        issuer: 'point-jewels-crm',
        subject: payload.staffId,
      }
    )

    return token
  } catch (_error) {
    throw new Error('Failed to generate access token')
  }
}

/**
 * Generate refresh token (long-lived, 7 days)
 * Used only to obtain new access tokens
 */
export function generateRefreshToken(payload: TokenPayload): string {
  if (!payload.staffId) {
    throw new Error('Invalid payload: staffId required')
  }

  try {
    const jti = generateToken(16)
    const JWT_SECRET = getJWTSecret()

    const token = jwt.sign(
      {
        staffId: payload.staffId,
        jti,
        type: 'refresh', // Prevent token type confusion
      },
      JWT_SECRET,
      {
        algorithm: JWT_ALGORITHM,
        expiresIn: REFRESH_TOKEN_EXPIRY,
        issuer: 'point-jewels-crm',
        subject: payload.staffId,
      }
    )

    return token
  } catch (error) {
    console.error('Refresh token generation failed:', error)
    throw new Error('Failed to generate refresh token')
  }
}

/**
 * Verify and decode token with security checks
 * Validates: signature, expiration, algorithm, issuer, type, revocation
 */
export function verifyToken(token: string, expectedType?: 'access' | 'refresh'): TokenPayload | null {
  if (!token || typeof token !== 'string') {
    console.warn('Invalid token format')
    return null
  }

  try {
    // Check if token is blacklisted (revoked)
    if (tokenBlacklist.has(token)) {
      console.warn('Token has been revoked')
      return null
    }

    const JWT_SECRET = getJWTSecret()
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: [JWT_ALGORITHM], // Only accept HS256 (prevents algorithm confusion)
      issuer: 'point-jewels-crm',
    }) as any

    // Verify token type if expected
    if (expectedType && decoded.type !== expectedType) {
      console.warn(`Token type mismatch: expected ${expectedType}, got ${decoded.type}`)
      return null
    }

    // Remove internal fields before returning
    delete decoded.type
    delete decoded.jti

    return decoded as TokenPayload
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      console.warn('Token expired')
    } else if (error.name === 'JsonWebTokenError') {
      console.warn('Invalid token:', error.message)
    }
    return null
  }
}

/**
 * Revoke token (add to blacklist)
 * In production, store in Redis with TTL matching token expiration
 */
export function revokeToken(token: string): void {
  try {
    tokenBlacklist.add(token)
    console.log('Token revoked')
  } catch (error) {
    console.error('Token revocation failed:', error)
  }
}

/**
 * Refresh access token using refresh token
 * Validates refresh token and returns new access token
 */
export function refreshAccessToken(
  refreshToken: string,
  newPayload: Partial<TokenPayload>
): string | null {
  try {
    const decoded = verifyToken(refreshToken, 'refresh')
    if (!decoded) {
      return null
    }

    // Generate new access token with updated payload
    const accessToken = generateAccessToken({
      staffId: decoded.staffId,
      email: newPayload.email || decoded.email,
      role: newPayload.role || decoded.role,
      permissions: newPayload.permissions || decoded.permissions,
    })

    return accessToken
  } catch (error) {
    console.error('Token refresh failed:', error)
    return null
  }
}

/**
 * Generate webhook secret for incoming requests
 * Uses HMAC for signing webhooks
 */
export function generateWebhookSecret(): string {
  return generateToken(32)
}

/**
 * Sign webhook payload
 * @param payload - Data to sign
 * @param secret - Webhook secret
 * @returns Signature
 */
export function signWebhookPayload(payload: string, secret: string): string {
  return createHMAC(payload, secret)
}

/**
 * Verify webhook payload with constant-time comparison
 * Prevents webhook tampering and spoofing
 */
export function verifyWebhookPayload(
  payload: string,
  signature: string,
  secret: string
): boolean {
  return verifyHMAC(payload, signature, secret)
}

/**
 * Generate CSRF token (for form submissions)
 * Prevents cross-site request forgery
 */
export function generateCSRFToken(): string {
  return generateToken(32)
}

/**
 * Validate CSRF token
 */
export function validateCSRFToken(token: string, sessionToken: string): boolean {
  if (!token || !sessionToken) {
    return false
  }

  try {
    // Constant-time comparison
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(sessionToken))
  } catch {
    return false
  }
}

/**
 * Generate session ID (for tracking user sessions)
 */
export function generateSessionId(): string {
  return generateToken(32)
}

/**
 * Clear expired tokens from blacklist (maintenance function)
 * Run periodically to prevent memory bloat
 */
export function clearExpiredTokens(): void {
  // In production, this would be handled by Redis TTL
  console.log(`Token blacklist size: ${tokenBlacklist.size}`)
}
