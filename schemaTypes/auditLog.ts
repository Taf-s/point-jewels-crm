import { defineField, defineType } from 'sanity'

/**
 * AUDIT LOG SCHEMA - TIER 1 SECURITY
 * Tracks all CRUD operations, access, and changes for compliance
 * Essential for detecting security incidents and insider threats
 */
export default defineType({
  name: 'auditLog',
  title: 'Audit Log',
  type: 'document',
  fields: [
    // Staff member who performed the action
    defineField({
      name: 'staffMember',
      title: 'Staff Member',
      type: 'reference',
      to: [{ type: 'staff' }],
      validation: (rule) => rule.required(),
      description: 'Staff who performed the action',
    }),

    // Action performed (CRUD operations)
    defineField({
      name: 'action',
      title: 'Action',
      type: 'string',
      options: {
        list: [
          { title: 'Create', value: 'CREATE' },
          { title: 'Read', value: 'READ' },
          { title: 'Update', value: 'UPDATE' },
          { title: 'Delete', value: 'DELETE' },
          { title: 'Export', value: 'EXPORT' },
          { title: 'Login', value: 'LOGIN' },
          { title: 'Failed Login', value: 'FAILED_LOGIN' },
          { title: 'API Access', value: 'API_ACCESS' },
        ],
      },
      validation: (rule) => rule.required(),
      description: 'Type of action performed',
    }),

    // Document type affected
    defineField({
      name: 'documentType',
      title: 'Document Type',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Type of document affected (customer, order, product, etc.)',
    }),

    // Document ID affected
    defineField({
      name: 'documentId',
      title: 'Document ID',
      type: 'string',
      description: 'ID of the document affected',
    }),

    // Sensitive fields accessed
    defineField({
      name: 'sensitiveFieldsAccessed',
      title: 'Sensitive Fields Accessed',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'email',
          'phone',
          'address',
          'paymentInfo',
          'ssn',
          'personalNotes',
          'creditCard',
          'bankInfo',
        ],
      },
      description: 'Sensitive fields that were accessed or modified',
    }),

    // Timestamp with millisecond precision
    defineField({
      name: 'timestamp',
      title: 'Timestamp',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
      description: 'When the action occurred (UTC)',
    }),

    // IP Address for location tracking
    defineField({
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string',
      description: 'IP address of the requester',
    }),

    // User Agent for device/browser tracking
    defineField({
      name: 'userAgent',
      title: 'User Agent',
      type: 'string',
      description: 'Browser/client information',
    }),

    // Geographic location
    defineField({
      name: 'geoLocation',
      title: 'Geo Location',
      type: 'object',
      fields: [
        defineField({ name: 'country', type: 'string', title: 'Country' }),
        defineField({ name: 'city', type: 'string', title: 'City' }),
        defineField({ name: 'latitude', type: 'number', title: 'Latitude' }),
        defineField({ name: 'longitude', type: 'number', title: 'Longitude' }),
      ],
      description: 'Geographic location of the request',
    }),

    // Changes (for Update actions) - encrypted
    defineField({
      name: 'changes',
      title: 'Changes',
      type: 'object',
      fields: [
        defineField({ name: 'beforeHash', type: 'string', title: 'Before (Hash)' }),
        defineField({ name: 'afterHash', type: 'string', title: 'After (Hash)' }),
        defineField({ name: 'changedFields', type: 'array', of: [{ type: 'string' }], title: 'Changed Fields' }),
      ],
      description: 'Before/after values for updates (hashed for security)',
    }),

    // Risk level of the action
    defineField({
      name: 'riskLevel',
      title: 'Risk Level',
      type: 'string',
      options: {
        list: [
          { title: 'Low', value: 'LOW' },
          { title: 'Medium', value: 'MEDIUM' },
          { title: 'High', value: 'HIGH' },
          { title: 'Critical', value: 'CRITICAL' },
        ],
      },
      initialValue: 'LOW',
      description: 'Risk assessment for this action',
    }),

    // Threat detection score
    defineField({
      name: 'threatScore',
      title: 'Threat Score',
      type: 'number',
      description: 'Automated threat detection score (0-100)',
    }),

    // Approval status (for sensitive operations)
    defineField({
      name: 'approvalStatus',
      title: 'Approval Status',
      type: 'string',
      options: {
        list: [
          { title: 'Approved', value: 'approved' },
          { title: 'Pending', value: 'pending' },
          { title: 'Denied', value: 'denied' },
        ],
      },
      description: 'Whether the action was approved for sensitive operations',
    }),

    // Approver (for sensitive operations)
    defineField({
      name: 'approvedBy',
      title: 'Approved By',
      type: 'reference',
      to: [{ type: 'staff' }],
      description: 'Staff member who approved this action',
    }),

    // Notes and context
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Additional context, flags, or incident notes',
    }),

    // Compliance flags
    defineField({
      name: 'complianceFlags',
      title: 'Compliance Flags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'GDPR Relevant',
          'PCI DSS Relevant',
          'Sensitive Data Access',
          'Privilege Escalation',
          'Data Export',
          'Deletion Request',
        ],
      },
      description: 'Flags for compliance monitoring',
    }),

    // Request ID (for tracing)
    defineField({
      name: 'requestId',
      title: 'Request ID',
      type: 'string',
      description: 'Unique request ID for tracing API calls',
    }),
  ],

  preview: {
    select: {
      title: 'action',
      subtitle: 'documentType',
      staff: 'staffMember.name',
      timestamp: 'timestamp',
      risk: 'riskLevel',
    },
    prepare(selection) {
      const { title, subtitle, staff, timestamp, risk } = selection
      return {
        title: `${title} - ${subtitle}`,
        subtitle: `${staff} | ${risk} | ${new Date(timestamp).toLocaleString()}`,
      }
    },
  },
})
