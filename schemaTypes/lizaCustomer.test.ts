// /Users/tafarasithole/Desktop/point-jewels-crm/schemaTypes/lizaCustomer.test.ts
import lizaCustomer from './lizaCustomer'

describe('LIZA Customer Schema', () => {
  it('should define a valid Sanity document type', () => {
    expect(lizaCustomer.name).toBe('lizaCustomer')
    expect(lizaCustomer.title).toBe('LIZA Customer')
    expect(lizaCustomer.type).toBe('document')
  })

  it('should have required fields', () => {
    const fields = lizaCustomer.fields
    expect(fields).toBeDefined()
    expect(Array.isArray(fields)).toBe(true)
    expect(fields.length).toBeGreaterThan(0)

    // Check for firstName and lastName instead of name
    const firstNameField = fields.find((field: any) => field.name === 'firstName')
    expect(firstNameField).toBeDefined()
    expect(firstNameField?.validation).toBeDefined()

    const emailField = fields.find((field: any) => field.name === 'email')
    expect(emailField).toBeDefined()
    expect(emailField?.validation).toBeDefined()
  })

  it('should have LIZA tier field', () => {
    const fields = lizaCustomer.fields
    const tierField = fields.find((field: any) => field.name === 'lizaTier')
    expect(tierField).toBeDefined()
    expect(tierField?.type).toBe('string')
    expect(tierField?.validation).toBeDefined()
  })

  it('should have a preview configuration', () => {
    expect(lizaCustomer.preview).toBeDefined()
    expect(lizaCustomer.preview.select).toBeDefined()
    expect(lizaCustomer.preview.prepare).toBeDefined()
  })

  it('should have proper field types', () => {
    const fields = lizaCustomer.fields
    const fieldTypes = fields.map((field: any) => field.type)
    expect(fieldTypes).toContain('string')
    expect(fieldTypes).toContain('number')
    expect(fieldTypes).toContain('object')
    expect(fieldTypes.some((type: string) => type === 'array' || type === 'reference')).toBe(true)
  })

  it('should have advanced cultural profiling field', () => {
    const fields = lizaCustomer.fields
    const culturalField = fields.find((field: any) => field.name === 'culturalProfile')
    expect(culturalField).toBeDefined()
    expect(culturalField?.type).toBe('object')
    expect(culturalField?.fields).toBeDefined()
    expect(culturalField?.description).toContain('anthropological')
  })
})