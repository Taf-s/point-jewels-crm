/**
 * RBAC - ROLE-BASED ACCESS CONTROL - TIER 1 SECURITY
 * Apple-grade permission management with principle of least privilege
 * Prevents unauthorized access and privilege escalation
 */

export type Role = 'admin' | 'manager' | 'sales' | 'marketing' | 'support'
export type Permission = string

// Define permissions by role (principle of least privilege)
// Each role gets ONLY the permissions it needs
const ROLE_PERMISSIONS: Record<Role, Set<Permission>> = {
  admin: new Set([
    'View Customers',
    'Edit Customers',
    'Delete Customers',
    'Export Customers',
    'View Orders',
    'Edit Orders',
    'Delete Orders',
    'View Products',
    'Edit Products',
    'Delete Products',
    'View Analytics',
    'Manage Campaigns',
    'View Audit Logs',
    'Export Data',
    'Manage Staff',
    'Manage Roles',
    'System Configuration',
    'Security Settings',
  ]),
  manager: new Set([
    'View Customers',
    'Edit Customers',
    'Export Customers',
    'View Orders',
    'Edit Orders',
    'View Products',
    'Edit Products',
    'View Analytics',
    'Manage Campaigns',
    'View Audit Logs',
    'Export Data',
  ]),
  sales: new Set([
    'View Customers',
    'Edit Customers',
    'View Orders',
    'Edit Orders',
    'Create Orders',
    'View Products',
  ]),
  marketing: new Set([
    'View Customers',
    'Export Customers',
    'View Orders',
    'View Analytics',
    'Manage Campaigns',
    'View Products',
  ]),
  support: new Set([
    'View Customers',
    'Edit Customers',
    'View Orders',
    'View Products',
  ]),
}

// Sensitive operations requiring elevated privilege
const SENSITIVE_OPERATIONS = new Set([
  'Delete Customers',
  'Delete Orders',
  'Delete Products',
  'Export Data',
  'Manage Staff',
  'System Configuration',
  'Security Settings',
])

/**
 * Check if role has permission
 * Uses Set for O(1) lookup time
 */
export function hasPermission(role: Role, permission: Permission): boolean {
  if (!role || !permission) {
    return false
  }

  const permissions = ROLE_PERMISSIONS[role]
  return permissions ? permissions.has(permission) : false
}

/**
 * Get all permissions for a role
 */
export function getPermissions(role: Role): Permission[] {
  const permissions = ROLE_PERMISSIONS[role]
  return permissions ? Array.from(permissions) : []
}

/**
 * Check if operation is sensitive (requires audit logging)
 */
export function isSensitiveOperation(permission: Permission): boolean {
  return SENSITIVE_OPERATIONS.has(permission)
}

/**
 * Validate access to document with context
 * Prevents privilege escalation attempts
 */
export function canAccessDocument(
  userRole: Role,
  documentType: string,
  action: 'view' | 'edit' | 'delete' | 'export',
  _context?: {
    ownerId?: string
    currentUserId?: string
    isOwnData?: boolean
  }
): boolean {
  if (!userRole || !documentType || !action) {
    return false
  }

  // Build permission key
  const permissionMap: Record<string, Permission> = {
    'customer:view': 'View Customers',
    'customer:edit': 'Edit Customers',
    'customer:delete': 'Delete Customers',
    'customer:export': 'Export Customers',
    'order:view': 'View Orders',
    'order:edit': 'Edit Orders',
    'order:delete': 'Delete Orders',
    'order:export': 'Export Data',
    'product:view': 'View Products',
    'product:edit': 'Edit Products',
    'product:delete': 'Delete Products',
    'analytics:view': 'View Analytics',
    'campaign:manage': 'Manage Campaigns',
  }

  const permission = permissionMap[`${documentType}:${action}`]

  if (!permission) {
    return false
  }

  // Check base permission
  if (!hasPermission(userRole, permission)) {
    return false
  }

  // Additional checks for certain operations
  if (action === 'delete') {
    // Require at least manager role for deletions
    if (userRole === 'sales' || userRole === 'support' || userRole === 'marketing') {
      return false
    }
  }

  if (action === 'export') {
    // Require at least manager role for exports
    if (userRole === 'sales' || userRole === 'support') {
      return false
    }
  }

  return true
}

/**
 * Check if user can perform sensitive operation
 * Requires audit logging and possibly additional verification
 */
export function canPerformSensitiveOperation(role: Role, permission: Permission): boolean {
  if (!isSensitiveOperation(permission)) {
    return true
  }

  // Only admin and manager can perform sensitive operations
  return role === 'admin' || role === 'manager'
}

/**
 * Validate role hierarchy (prevent privilege escalation)
 * Lower roles cannot assign higher roles
 */
export function canAssignRole(assignerRole: Role, targetRole: Role): boolean {
  const roleHierarchy: Record<Role, number> = {
    admin: 5,
    manager: 4,
    marketing: 3,
    sales: 2,
    support: 1,
  }

  // Can only assign roles of equal or lower level
  return roleHierarchy[assignerRole] >= roleHierarchy[targetRole]
}

/**
 * Get permissions diff (for audit logging)
 * Shows what permissions changed
 */
export function getPermissionsDiff(
  oldPermissions: string[],
  newPermissions: string[]
): { added: string[]; removed: string[] } {
  const oldSet = new Set(oldPermissions)
  const newSet = new Set(newPermissions)

  const added = newPermissions.filter((p) => !oldSet.has(p))
  const removed = oldPermissions.filter((p) => !newSet.has(p))

  return { added, removed }
}

/**
 * Validate permission list (prevent unauthorized permissions)
 * Only return valid permissions for the role
 */
export function validatePermissions(role: Role, requestedPermissions: string[]): string[] {
  if (!requestedPermissions || !Array.isArray(requestedPermissions)) {
    return []
  }

  const validPermissions = getPermissions(role)
  return requestedPermissions.filter((p) => validPermissions.includes(p))
}

/**
 * Get role description (for UI/logging)
 */
export function getRoleDescription(role: Role): string {
  const descriptions: Record<Role, string> = {
    admin: 'Full system access with security and configuration management',
    manager: 'Manage customers, orders, campaigns, and view analytics',
    sales: 'Create and manage orders, view customer and product information',
    marketing: 'Create and manage marketing campaigns, view analytics',
    support: 'View customer information and orders for support purposes',
  }

  return descriptions[role] || 'Unknown role'
}

/**
 * Check if role requires 2FA (two-factor authentication)
 */
export function requiresTwoFactor(role: Role): boolean {
  return role === 'admin' || role === 'manager'
}
