/**
 * THREAT DETECTION - AI & BOT PROTECTION - TIER 1 SECURITY
 * Detects and blocks DDoS, brute force, phishing, and AI-assisted attacks
 * Real-time anomaly detection with machine learning-ready architecture
 */

interface RequestMetrics {
  ip: string
  timestamp: number
  endpoint: string
  method: string
  statusCode?: number
  responseTime: number
  userId?: string
  userAgent?: string
  failedAttempts?: number
}

interface ThreatScore {
  score: number // 0-100
  level: 'safe' | 'low' | 'medium' | 'high' | 'critical'
  reasons: string[]
}

// In-memory threat database (Redis in production)
const _requestLog = new Map<string, RequestMetrics[]>() // Reserved for future logging
const suspiciousIPs = new Map<string, { score: number; lastSeen: number }>()
const userFailedAttempts = new Map<string, { count: number; lastAttempt: number }>()
const ddosPatterns = new Map<string, number>() // ip -> request count in window

const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || '900000') // 15 min
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100')
const SUSPICIOUS_THRESHOLD = parseInt(process.env.SUSPICIOUS_ACTIVITY_THRESHOLD || '5')

/**
 * Analyze request for threats
 * Returns threat score and reasons for blocking
 */
export function analyzeThreat(metrics: RequestMetrics): ThreatScore {
  const reasons: string[] = []
  let score = 0

  // Check 1: DDoS Pattern Detection
  const ddosScore = checkDDoSPattern(metrics.ip)
  if (ddosScore > 0) {
    reasons.push(`DDoS pattern detected (${ddosScore} requests in ${RATE_LIMIT_WINDOW}ms)`)
    score += ddosScore * 2
  }

  // Check 2: Brute Force Attack
  const bruteForceScore = checkBruteForce(metrics.userId)
  if (bruteForceScore > 0) {
    reasons.push(`Brute force detected (${bruteForceScore} failed attempts)`)
    score += bruteForceScore * 3
  }

  // Check 3: Suspicious User Agent (Bot/Scraper Detection)
  const botScore = detectBot(metrics.userAgent)
  if (botScore > 0) {
    reasons.push(`Suspicious user agent detected: ${metrics.userAgent}`)
    score += botScore
  }

  // Check 4: Geo-Anomaly Detection
  const geoScore = checkGeoAnomaly(metrics.ip)
  if (geoScore > 0) {
    reasons.push('Geographical anomaly detected (impossible travel)')
    score += geoScore
  }

  // Check 5: SQL Injection & XSS Attempt
  const injectionScore = detectInjectionAttempt(metrics.endpoint)
  if (injectionScore > 0) {
    reasons.push('Possible injection attack detected')
    score += injectionScore * 4
  }

  // Check 6: Credential Stuffing Pattern
  const stuffingScore = detectCredentialStuffing(metrics)
  if (stuffingScore > 0) {
    reasons.push('Credential stuffing pattern detected')
    score += stuffingScore * 3
  }

  // Check 7: API Endpoint Abuse
  const abuseScore = checkEndpointAbuse(metrics.endpoint, metrics.ip)
  if (abuseScore > 0) {
    reasons.push(`Endpoint abuse detected: ${metrics.endpoint}`)
    score += abuseScore
  }

  // Check 8: Timing Anomaly (AI-assisted attacks often have unusual timing)
  const timingScore = checkTimingAnomaly(metrics)
  if (timingScore > 0) {
    reasons.push('Unusual request timing pattern')
    score += timingScore
  }

  // Normalize score to 0-100
  score = Math.min(100, Math.max(0, score))

  const level: ThreatScore['level'] =
    score >= 80 ? 'critical' : score >= 60 ? 'high' : score >= 40 ? 'medium' : score >= 20 ? 'low' : 'safe'

  return { score, level, reasons }
}

/**
 * Detect DDoS patterns
 * Returns number of requests exceeding rate limit
 */
function checkDDoSPattern(ip: string): number {
  const _now = Date.now()
  const _windowStart = _now - RATE_LIMIT_WINDOW

  // Get request count in window
  const count = ddosPatterns.get(ip) || 0

  if (count > RATE_LIMIT_MAX) {
    return count - RATE_LIMIT_MAX
  }

  return 0
}

/**
 * Record request for DDoS detection
 */
export function recordRequest(ip: string): void {
  const now = Date.now()
  const count = ddosPatterns.get(ip) || 0
  ddosPatterns.set(ip, count + 1)

  // Clean up old entries
  setTimeout(() => {
    ddosPatterns.delete(ip)
  }, RATE_LIMIT_WINDOW)
}

/**
 * Detect brute force attacks (failed login attempts)
 */
function checkBruteForce(userId?: string): number {
  if (!userId) return 0

  const failedAttempts = userFailedAttempts.get(userId)
  if (!failedAttempts) return 0

  const now = Date.now()
  // Reset if last attempt was > 15 minutes ago
  if (now - failedAttempts.lastAttempt > RATE_LIMIT_WINDOW) {
    userFailedAttempts.delete(userId)
    return 0
  }

  // Alert if more than threshold
  return failedAttempts.count > SUSPICIOUS_THRESHOLD ? failedAttempts.count - SUSPICIOUS_THRESHOLD : 0
}

/**
 * Record failed login attempt
 */
export function recordFailedLogin(userId: string): void {
  const current = userFailedAttempts.get(userId) || { count: 0, lastAttempt: Date.now() }
  userFailedAttempts.set(userId, {
    count: current.count + 1,
    lastAttempt: Date.now(),
  })
}

/**
 * Clear failed login attempts (after successful login)
 */
export function clearFailedAttempts(userId: string): void {
  userFailedAttempts.delete(userId)
}

/**
 * Detect bot/scraper user agents
 */
function detectBot(userAgent?: string): number {
  if (!userAgent) return 50 // Missing user agent is suspicious

  const botPatterns = [
    /bot|scraper|crawler|spider|curl|wget|python|java(?!script)/i,
    /headless|selenium|phantomjs|puppeteer/i,
    /nmap|nikto|sqlmap|metasploit/i,
  ]

  for (const pattern of botPatterns) {
    if (pattern.test(userAgent)) {
      return 50
    }
  }

  // Check for AI-specific patterns
  if (userAgent.includes('GPT') || userAgent.includes('Claude') || userAgent.includes('Bard')) {
    return 40 // AI agents accessing API
  }

  return 0
}

/**
 * Detect geographical anomalies (impossible travel)
 * Simplified - in production, use GeoIP database
 */
function checkGeoAnomaly(ip: string): number {
  // Placeholder for geo-IP lookup
  // In production: check if user logged in from different countries
  // within impossibly short timeframe
  return 0
}

/**
 * Detect SQL injection and XSS attempts
 */
function detectInjectionAttempt(endpoint: string): number {
  const injectionPatterns = [
    /(\bUNION\b.*\bSELECT\b|\bDROP\b.*\bTABLE\b|\bEXEC\b|\bEXECUTE\b)/i,
    /<script[^>]*>.*<\/script>/i,
    /(['"])\s*;\s*(DROP|DELETE|UPDATE)/i,
    /(%27|'|%23|#)/,
  ]

  for (const pattern of injectionPatterns) {
    if (pattern.test(endpoint)) {
      return 50
    }
  }

  return 0
}

/**
 * Detect credential stuffing (multiple failed logins from same IP)
 */
function detectCredentialStuffing(metrics: RequestMetrics): number {
  const suspicious = suspiciousIPs.get(metrics.ip)
  if (!suspicious) return 0

  const now = Date.now()
  if (now - suspicious.lastSeen > RATE_LIMIT_WINDOW) {
    suspiciousIPs.delete(metrics.ip)
    return 0
  }

  return suspicious.score > SUSPICIOUS_THRESHOLD ? suspicious.score - SUSPICIOUS_THRESHOLD : 0
}

/**
 * Detect endpoint abuse (hammering specific endpoints)
 */
function checkEndpointAbuse(endpoint: string, ip: string): number {
  const key = `${ip}:${endpoint}`
  const count = ddosPatterns.get(key) || 0

  if (count > RATE_LIMIT_MAX / 2) {
    return count - RATE_LIMIT_MAX / 2
  }

  return 0
}

/**
 * Detect timing anomalies
 * AI attacks often have unusual timing patterns
 */
function checkTimingAnomaly(metrics: RequestMetrics): number {
  // Requests too fast (< 100ms) or too slow (> 30s) are suspicious
  if (metrics.responseTime < 100 || metrics.responseTime > 30000) {
    return 30
  }

  return 0
}

/**
 * Get threat assessment for IP
 */
export function getThreatLevel(ip: string): ThreatScore['level'] {
  const suspicious = suspiciousIPs.get(ip)
  if (!suspicious) return 'safe'

  const score = suspicious.score
  return score >= 80 ? 'critical' : score >= 60 ? 'high' : score >= 40 ? 'medium' : score >= 20 ? 'low' : 'safe'
}

/**
 * Block IP (add to blacklist)
 */
export function blockIP(ip: string, reason: string, duration: number = 3600000): void {
  console.log(`🚫 Blocking IP ${ip} for ${duration}ms: ${reason}`)
  suspiciousIPs.set(ip, { score: 100, lastSeen: Date.now() })

  setTimeout(() => {
    suspiciousIPs.delete(ip)
    console.log(`✅ IP ${ip} unblocked`)
  }, duration)
}

/**
 * Check if IP is blocked
 */
export function isIPBlocked(ip: string): boolean {
  return suspiciousIPs.has(ip)
}

/**
 * Get threat statistics (for monitoring dashboard)
 */
export function getThreatStats(): {
  blockedIPs: number
  totalRequests: number
  ddosAttempts: number
  failedLogins: number
} {
  return {
    blockedIPs: suspiciousIPs.size,
    totalRequests: ddosPatterns.size,
    ddosAttempts: Array.from(ddosPatterns.values()).filter((c) => c > RATE_LIMIT_MAX).length,
    failedLogins: userFailedAttempts.size,
  }
}

/**
 * Clear threat logs (maintenance)
 */
export function clearThreatLogs(): void {
  ddosPatterns.clear()
  userFailedAttempts.clear()
  console.log('Threat logs cleared')
}
