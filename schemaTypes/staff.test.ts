import staff from './staff'

describe('Staff Schema', () => {
  it('should define a valid Sanity document type', () => {
    expect(staff.name).toBe('staff')
    expect(staff.title).toBe('Staff')
    expect(staff.type).toBe('document')
  })

  it('should have required fields', () => {
    const fields = staff.fields
    expect(fields).toBeDefined()
    expect(Array.isArray(fields)).toBe(true)
    expect(fields.length).toBeGreaterThan(0)

    const nameField = fields.find((field: any) => field.name === 'name')
    expect(nameField).toBeDefined()
    expect(nameField?.validation).toBeDefined()

    const emailField = fields.find((field: any) => field.name === 'email')
    expect(emailField).toBeDefined()
    expect(emailField?.validation).toBeDefined()

    const roleField = fields.find((field: any) => field.name === 'role')
    expect(roleField).toBeDefined()
    expect(roleField?.validation).toBeDefined()
  })

  it('should have active status field', () => {
    const fields = staff.fields
    const activeField = fields.find((field: any) => field.name === 'isActive')
    expect(activeField).toBeDefined()
    expect(activeField?.type).toBe('boolean')
    expect(activeField?.initialValue).toBe(true)
  })

  it('should have a preview configuration', () => {
    expect(staff.preview).toBeDefined()
    expect(staff.preview.select).toBeDefined()
    expect(staff.preview.prepare).toBeDefined()
  })

  it('should have proper field types', () => {
    const fields = staff.fields
    const fieldTypes = fields.map((field: any) => field.type)
    expect(fieldTypes).toContain('string')
    expect(fieldTypes).toContain('text')
    expect(fieldTypes).toContain('array')
    expect(fieldTypes).toContain('date')
    expect(fieldTypes).toContain('boolean')
  })
})