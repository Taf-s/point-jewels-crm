import collection from './collection'

describe('Collection Schema', () => {
  it('should define a valid Sanity document type', () => {
    expect(collection.name).toBe('collection')
    expect(collection.title).toBe('Collection')
    expect(collection.type).toBe('document')
  })

  it('should have required fields', () => {
    const fields = collection.fields
    expect(fields).toBeDefined()
    expect(Array.isArray(fields)).toBe(true)
    expect(fields.length).toBeGreaterThan(0)

    // Check for required fields
    const titleField = fields.find((field: any) => field.name === 'title')
    expect(titleField).toBeDefined()
    expect(titleField?.validation).toBeDefined()

    const slugField = fields.find((field: any) => field.name === 'slug')
    expect(slugField).toBeDefined()
    expect(slugField?.validation).toBeDefined()
  })

  it('should have a preview configuration', () => {
    expect(collection.preview).toBeDefined()
    expect(collection.preview.select).toBeDefined()
    expect(collection.preview.prepare).toBeDefined()
  })

  it('should have proper field types', () => {
    const fields = collection.fields
    const fieldTypes = fields.map((field: any) => field.type)
    expect(fieldTypes).toContain('string')
    expect(fieldTypes).toContain('slug')
    expect(fieldTypes).toContain('array')
    expect(fieldTypes).toContain('image')
    expect(fieldTypes).toContain('number')
    expect(fieldTypes).toContain('boolean')
  })

  it('should have LIZA collection tag', () => {
    const fields = collection.fields
    const lizaField = fields.find((field: any) => field.name === 'isLIZACollection')
    expect(lizaField).toBeDefined()
    expect(lizaField?.type).toBe('boolean')
    expect(lizaField?.initialValue).toBe(false)
  })
})