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

    const nameField = fields.find((field: any) => field.name === 'name')
    expect(nameField).toBeDefined()
    expect(nameField?.validation).toBeDefined()

    const emailField = fields.find((field: any) => field.name === 'email')
    expect(emailField).toBeDefined()
    expect(emailField?.validation).toBeDefined()
  })

  it('should have VIP status field', () => {
    const fields = lizaCustomer.fields
    const vipField = fields.find((field: any) => field.name === 'isVIP')
    expect(vipField).toBeDefined()
    expect(vipField?.type).toBe('boolean')
    expect(vipField?.initialValue).toBe(true)
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
    expect(fieldTypes).toContain('boolean')
    expect(fieldTypes).toContain('array')
    expect(fieldTypes).toContain('text')
  })
})