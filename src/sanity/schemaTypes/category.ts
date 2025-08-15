import { defineType, defineField } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: () => '📂',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(50),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'color',
      title: 'Color Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Electric Blue', value: 'from-blue-500 to-cyan-500' },
          { title: 'Power Yellow', value: 'from-yellow-500 to-orange-500' },
          { title: 'Grid Green', value: 'from-green-500 to-emerald-500' },
          { title: 'Market Purple', value: 'from-purple-500 to-violet-500' },
          { title: 'Renewable Teal', value: 'from-teal-500 to-blue-500' },
          { title: 'Risk Red', value: 'from-red-500 to-pink-500' },
        ],
      },
      initialValue: 'from-blue-500 to-cyan-500',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Zap (Power)', value: 'Zap' },
          { title: 'BarChart3 (Markets)', value: 'BarChart3' },
          { title: 'Settings (Grid)', value: 'Settings' },
          { title: 'TrendingUp (Trading)', value: 'TrendingUp' },
          { title: 'Shield (Risk)', value: 'Shield' },
          { title: 'Wind (Renewable)', value: 'Wind' },
          { title: 'Activity (Analytics)', value: 'Activity' },
        ],
      },
      initialValue: 'Zap',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})