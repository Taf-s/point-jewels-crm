import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
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
    }),
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
      description: 'Owner can do everything. Product Manager can add/edit products. Viewer can only see.',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Deactivate to revoke access without deleting the record',
    }),
  ],
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
