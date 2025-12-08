import { defineField, defineType } from 'sanity'

/**
 * STAFF SCHEMA
 * Manages internal staff/users with roles and permissions.
 * For CRM access control and activity tracking.
 */
export default defineType({
  name: 'staff',
  title: 'Staff',
  type: 'document',
  fields: [
    // Name
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Staff member\'s full name',
    }),

    // Email
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
      description: 'Work email',
    }),

    // Role
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Admin', value: 'admin' },
          { title: 'Manager', value: 'manager' },
          { title: 'Sales Rep', value: 'sales' },
          { title: 'Marketing', value: 'marketing' },
          { title: 'Support', value: 'support' },
        ],
      },
      validation: (rule) => rule.required(),
      description: 'Staff role for permissions',
    }),

    // Department
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          'Sales',
          'Marketing',
          'Operations',
          'Customer Service',
          'Management',
        ],
      },
      description: 'Department affiliation',
    }),

    // Permissions (array for granular control)
    defineField({
      name: 'permissions',
      title: 'Permissions',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'View Customers',
          'Edit Customers',
          'View Orders',
          'Edit Orders',
          'View Analytics',
          'Manage Campaigns',
          'Admin Access',
        ],
      },
      description: 'Specific permissions',
    }),

    // Hire date
    defineField({
      name: 'hireDate',
      title: 'Hire Date',
      type: 'date',
      description: 'Date staff member was hired',
    }),

    // Active status
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether staff member is currently active',
    }),

    // Notes
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Additional notes about the staff member',
    }),
  ],

  // Preview
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, subtitle, isActive } = selection
      return {
        title: title,
        subtitle: `${subtitle} ${isActive ? '' : '(Inactive)'}`,
      }
    },
  },
})