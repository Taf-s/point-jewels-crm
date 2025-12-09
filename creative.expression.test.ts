// /Users/tafarasithole/Desktop/point-jewels-crm/schemaTypes/creativeExpression.test.ts
import creativeExpression from './creativeExpression'

describe('Creative Expression Schema', () => {
  it('should define a valid Sanity document type', () => {
    expect(creativeExpression.name).toBe('creativeExpression')
    expect(creativeExpression.title).toBe('Creative Expression Profile')
    expect(creativeExpression.type).toBe('document')
  })

  it('should have reference to customer', () => {
    const fields = creativeExpression.fields
    const customerRef = fields.find((field: any) => field.name === 'customerId')
    expect(customerRef).toBeDefined()
    expect(customerRef?.type).toBe('reference')
    expect(customerRef?.validation).toBeDefined()
  })

  it('should have musical harmony profile', () => {
    const fields = creativeExpression.fields
    const musicField = fields.find((field: any) => field.name === 'musicalHarmony')
    expect(musicField).toBeDefined()
    expect(musicField?.type).toBe('object')
    expect(musicField?.fields).toBeDefined()
  })

  it('should have visual harmony profile', () => {
    const fields = creativeExpression.fields
    const visualField = fields.find((field: any) => field.name === 'visualHarmony')
    expect(visualField).toBeDefined()
    expect(visualField?.type).toBe('object')
    expect(visualField?.fields).toBeDefined()
  })

  it('should have experiential design profile', () => {
    const fields = creativeExpression.fields
    const expField = fields.find((field: any) => field.name === 'experientialDesign')
    expect(expField).toBeDefined()
    expect(expField?.type).toBe('object')
    expect(expField?.fields).toBeDefined()
  })

  it('should have synesthetic bridge', () => {
    const fields = creativeExpression.fields
    const synaField = fields.find((field: any) => field.name === 'synaestheticBridge')
    expect(synaField).toBeDefined()
    expect(synaField?.type).toBe('object')
    expect(synaField?.fields).toBeDefined()
  })

  it('should have a preview configuration', () => {
    expect(creativeExpression.preview).toBeDefined()
    expect(creativeExpression.preview.select).toBeDefined()
    expect(creativeExpression.preview.prepare).toBeDefined()
  })

  it('should have proper field types', () => {
    const fields = creativeExpression.fields
    const fieldTypes = fields.map((field: any) => field.type)
    expect(fieldTypes).toContain('reference')
    expect(fieldTypes).toContain('object')
    expect(fieldTypes).toContain('datetime')
  })
})