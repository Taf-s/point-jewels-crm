import analyticsDashboard from './analyticsDashboard'

describe('Analytics Dashboard Schema', () => {
  it('should define a valid Sanity document type', () => {
    expect(analyticsDashboard.name).toBe('analyticsDashboard')
    expect(analyticsDashboard.title).toBe('Analytics Dashboard')
    expect(analyticsDashboard.type).toBe('document')
  })

  it('should have required fields', () => {
    const fields = analyticsDashboard.fields
    expect(fields).toBeDefined()
    expect(Array.isArray(fields)).toBe(true)
    expect(fields.length).toBeGreaterThan(0)

    const nameField = fields.find((field: any) => field.name === 'name')
    expect(nameField).toBeDefined()
    expect(nameField?.validation).toBeDefined()

    const lastUpdatedField = fields.find((field: any) => field.name === 'lastUpdated')
    expect(lastUpdatedField).toBeDefined()
    expect(lastUpdatedField?.validation).toBeDefined()
  })

  it('should have metrics objects', () => {
    const fields = analyticsDashboard.fields
    const salesMetricsField = fields.find((field: any) => field.name === 'salesMetrics')
    expect(salesMetricsField).toBeDefined()
    expect(salesMetricsField?.type).toBe('object')

    const customerMetricsField = fields.find((field: any) => field.name === 'customerMetrics')
    expect(customerMetricsField).toBeDefined()
    expect(customerMetricsField?.type).toBe('object')
  })

  it('should have a preview configuration', () => {
    expect(analyticsDashboard.preview).toBeDefined()
    expect(analyticsDashboard.preview.select).toBeDefined()
    expect(analyticsDashboard.preview.prepare).toBeDefined()
  })

  it('should have proper field types', () => {
    const fields = analyticsDashboard.fields
    const fieldTypes = fields.map((field: any) => field.type)
    expect(fieldTypes).toContain('string')
    expect(fieldTypes).toContain('object')
    expect(fieldTypes).toContain('datetime')
  })
})