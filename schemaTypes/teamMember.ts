import { defineField, defineType } from 'sanity'

/**
 * TEAM MEMBER SCHEMA
 * 
 * Represents a person with access to the CMS.
 * Controls role-based access and permissions.
 * 
 * Roles:
 *   - Owner/Master: Full system control (that's Liza!)
 *   - Product Manager: Can add/edit products
 *   - Viewer: Read-only access for previews
 */
export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    // Person's full name
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'The person\'s full name',
    }),

    // Email address (used for access)
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value?.includes('@')) {
            return 'Must be a valid email'
          }
          return true
        }),
      description: 'Email address for this team member',
    }),

    // Access level/permissions
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Owner/Master', value: 'owner' },
          { title: 'Product Manager', value: 'product_manager' },
          { title: 'Viewer', value: 'viewer' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
      description: 'Owner: Full control | Product Manager: Add/edit products | Viewer: Read-only',
    }),

    // Active status toggle
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Deactivate to revoke access without deleting the record',
    }),
  ],

  // Customizes how team members appear in the list view
  preview: {
    select: {
      title: 'name',
      role: 'role',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, role, isActive } = selection
      const status = isActive ? '✓' : '✗'
      return {
        title: `${status} ${title}`,
        subtitle: role,
      }
    },
  },
})
