import salesOrder from './salesOrder'

describe('Sales Order Schema', () => {
  it('should define a valid Sanity document type', () => {
    expect(salesOrder.name).toBe('salesOrder')
    expect(salesOrder.title).toBe('Sales Order')
    expect(salesOrder.type).toBe('document')
  })

  it('should have required fields', () => {
    const fields = salesOrder.fields
    expect(fields).toBeDefined()
    expect(Array.isArray(fields)).toBe(true)
    expect(fields.length).toBeGreaterThan(0)

    const orderNumberField = fields.find((field: any) => field.name === 'orderNumber')
    expect(orderNumberField).toBeDefined()
    expect(orderNumberField?.validation).toBeDefined()

    const customerField = fields.find((field: any) => field.name === 'customer')
    expect(customerField).toBeDefined()
    expect(customerField?.validation).toBeDefined()

    const itemsField = fields.find((field: any) => field.name === 'items')
    expect(itemsField).toBeDefined()
    expect(itemsField?.validation).toBeDefined()

    const totalField = fields.find((field: any) => field.name === 'totalAmount')
    expect(totalField).toBeDefined()
    expect(totalField?.validation).toBeDefined()
  })

  it('should have status and payment fields', () => {
    const fields = salesOrder.fields
    const statusField = fields.find((field: any) => field.name === 'status')
    expect(statusField).toBeDefined()
    expect(statusField?.initialValue).toBe('pending')

    const paymentField = fields.find((field: any) => field.name === 'paymentMethod')
    expect(paymentField).toBeDefined()
  })

  it('should have a preview configuration', () => {
    expect(salesOrder.preview).toBeDefined()
    expect(salesOrder.preview.select).toBeDefined()
    expect(salesOrder.preview.prepare).toBeDefined()
  })

  it('should have proper field types', () => {
    const fields = salesOrder.fields
    const fieldTypes = fields.map((field: any) => field.type)
    expect(fieldTypes).toContain('string')
    expect(fieldTypes).toContain('reference')
    expect(fieldTypes).toContain('datetime')
    expect(fieldTypes).toContain('array')
    expect(fieldTypes).toContain('number')
    expect(fieldTypes).toContain('text')
  })
})