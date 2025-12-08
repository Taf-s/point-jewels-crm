import customer from './customer'

describe('Customer Schema', () => {
  it('should define a valid Sanity document type', () => {
    expect(customer.name).toBe('customer')
    expect(customer.title).toBe('Customer')
    expect(customer.type).toBe('document')
  })

  it('should have required fields', () => {
    const fields = customer.fields
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

  it('should have customer type field', () => {
    const fields = customer.fields
    const typeField = fields.find((field: any) => field.name === 'customerType')
    expect(typeField).toBeDefined()
    expect(typeField?.type).toBe('string')
    expect(typeField?.initialValue).toBe('regular')
  })

  it('should have a preview configuration', () => {
    expect(customer.preview).toBeDefined()
    expect(customer.preview.select).toBeDefined()
    expect(customer.preview.prepare).toBeDefined()
  })

  it('should have proper field types', () => {
    const fields = customer.fields
    const fieldTypes = fields.map((field: any) => field.type)
    expect(fieldTypes).toContain('string')
    expect(fieldTypes).toContain('text')
    expect(fieldTypes).toContain('array')
  })
})