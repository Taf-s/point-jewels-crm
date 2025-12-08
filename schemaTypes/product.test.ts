import product from './product'

describe('Product Schema', () => {
  it('should define a valid Sanity document type', () => {
    expect(product.name).toBe('product')
    expect(product.title).toBe('Product')
    expect(product.type).toBe('document')
  })

  it('should have required fields', () => {
    const fields = product.fields
    expect(fields).toBeDefined()
    expect(Array.isArray(fields)).toBe(true)
    expect(fields.length).toBeGreaterThan(0)

    const nameField = fields.find((field: any) => field.name === 'name')
    expect(nameField).toBeDefined()
    expect(nameField?.validation).toBeDefined()

    const skuField = fields.find((field: any) => field.name === 'sku')
    expect(skuField).toBeDefined()
    expect(skuField?.validation).toBeDefined()

    const priceField = fields.find((field: any) => field.name === 'price')
    expect(priceField).toBeDefined()
    expect(priceField?.validation).toBeDefined()

    const imagesField = fields.find((field: any) => field.name === 'images')
    expect(imagesField).toBeDefined()
    expect(imagesField?.validation).toBeDefined()
  })

  it('should have inventory and active fields', () => {
    const fields = product.fields
    const inventoryField = fields.find((field: any) => field.name === 'inventory')
    expect(inventoryField).toBeDefined()
    expect(inventoryField?.type).toBe('number')

    const activeField = fields.find((field: any) => field.name === 'isActive')
    expect(activeField).toBeDefined()
    expect(activeField?.type).toBe('boolean')
    expect(activeField?.initialValue).toBe(true)
  })

  it('should have a preview configuration', () => {
    expect(product.preview).toBeDefined()
    expect(product.preview.select).toBeDefined()
    expect(product.preview.prepare).toBeDefined()
  })

  it('should have proper field types', () => {
    const fields = product.fields
    const fieldTypes = fields.map((field: any) => field.type)
    expect(fieldTypes).toContain('string')
    expect(fieldTypes).toContain('number')
    expect(fieldTypes).toContain('array')
    expect(fieldTypes).toContain('boolean')
    expect(fieldTypes).toContain('reference')
  })
})