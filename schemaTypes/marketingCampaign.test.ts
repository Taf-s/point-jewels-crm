import marketingCampaign from './marketingCampaign'

describe('Marketing Campaign Schema', () => {
  it('should define a valid Sanity document type', () => {
    expect(marketingCampaign.name).toBe('marketingCampaign')
    expect(marketingCampaign.title).toBe('Marketing Campaign')
    expect(marketingCampaign.type).toBe('document')
  })

  it('should have required fields', () => {
    const fields = marketingCampaign.fields
    expect(fields).toBeDefined()
    expect(Array.isArray(fields)).toBe(true)
    expect(fields.length).toBeGreaterThan(0)

    const nameField = fields.find((field: any) => field.name === 'name')
    expect(nameField).toBeDefined()
    expect(nameField?.validation).toBeDefined()

    const startDateField = fields.find((field: any) => field.name === 'startDate')
    expect(startDateField).toBeDefined()
    expect(startDateField?.validation).toBeDefined()
  })

  it('should have status field', () => {
    const fields = marketingCampaign.fields
    const statusField = fields.find((field: any) => field.name === 'status')
    expect(statusField).toBeDefined()
    expect(statusField?.initialValue).toBe('planning')
  })

  it('should have a preview configuration', () => {
    expect(marketingCampaign.preview).toBeDefined()
    expect(marketingCampaign.preview.select).toBeDefined()
    expect(marketingCampaign.preview.prepare).toBeDefined()
  })

  it('should have proper field types', () => {
    const fields = marketingCampaign.fields
    const fieldTypes = fields.map((field: any) => field.type)
    expect(fieldTypes).toContain('string')
    expect(fieldTypes).toContain('text')
    expect(fieldTypes).toContain('array')
    expect(fieldTypes).toContain('date')
    expect(fieldTypes).toContain('number')
    expect(fieldTypes).toContain('object')
  })
})