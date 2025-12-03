/**
 * SCHEMA TYPES INDEX
 * 
 * Central export point for all Sanity schema types.
 * Add new schema types here to register them with Sanity.
 * 
 * Types:
 *   - product: Jewelry pieces with variants
 *   - variant: Material/price options (nested in products)
 *   - collection: Grouped products for organization
 *   - teamMember: Users with access control
 */

import product from './product'
import variant from './variant'
import collection from './collection'
import teamMember from './teamMember'

export const schemaTypes = [
  product,
  variant,
  collection,
  teamMember,
]