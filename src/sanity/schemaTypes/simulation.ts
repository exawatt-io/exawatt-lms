import { defineType, defineField } from 'sanity'

export const simulation = defineType({
  name: 'simulation',
  title: 'Simulation',
  type: 'document',
  icon: () => '⚡',
  fields: [
    defineField({
      name: 'title',
      title: 'Simulation Title',
      type: 'string',
      validation: (rule) => rule.required().max(80),
      group: 'content',
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
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(200),
      group: 'content',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
      ],
      group: 'content',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'Beginner' },
          { title: 'Intermediate', value: 'Intermediate' },
          { title: 'Advanced', value: 'Advanced' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'estimatedDuration',
      title: 'Estimated Duration',
      type: 'string',
      description: 'e.g. "15-30 min", "1-2 hours"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Main features and capabilities of this simulation',
    }),
    defineField({
      name: 'learningObjectives',
      title: 'Learning Objectives',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'What users will learn from this simulation',
    }),
    defineField({
      name: 'prerequisites',
      title: 'Prerequisites',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'course' }, { type: 'simulation' }],
        },
      ],
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'BarChart3 (Markets)', value: 'BarChart3' },
          { title: 'Zap (Power)', value: 'Zap' },
          { title: 'TrendingUp (Trading)', value: 'TrendingUp' },
          { title: 'Activity (Analytics)', value: 'Activity' },
          { title: 'Wind (Renewable)', value: 'Wind' },
          { title: 'Settings (Grid)', value: 'Settings' },
        ],
      },
      initialValue: 'BarChart3',
    }),
    defineField({
      name: 'colorGradient',
      title: 'Color Gradient',
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
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'defaultParameters',
      title: 'Default Parameters',
      type: 'object',
      description: 'Default simulation parameters as JSON',
      fields: [
        {
          name: 'generators',
          title: 'Default Generators',
          type: 'text',
          description: 'JSON array of generator configurations',
        },
        {
          name: 'demand',
          title: 'Default Demand',
          type: 'text',
          description: 'JSON array of demand configurations',
        },
        {
          name: 'settings',
          title: 'Default Settings',
          type: 'text',
          description: 'JSON object of simulation settings',
        },
      ],
      group: 'configuration',
    }),
    defineField({
      name: 'scenarios',
      title: 'Predefined Scenarios',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'scenario',
          fields: [
            {
              name: 'name',
              title: 'Scenario Name',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
            {
              name: 'parameters',
              title: 'Parameters',
              type: 'text',
              description: 'JSON parameters for this scenario',
            },
            {
              name: 'isDefault',
              title: 'Default Scenario',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
      group: 'configuration',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'New', value: 'new' },
          { title: 'Locked', value: 'locked' },
          { title: 'Coming Soon', value: 'coming-soon' },
          { title: 'Maintenance', value: 'maintenance' },
        ],
      },
      initialValue: 'available',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Simulation',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'userCount',
      title: 'User Count',
      type: 'number',
      initialValue: 0,
      description: 'Total number of users who have used this simulation',
    }),
    defineField({
      name: 'rating',
      title: 'Average Rating',
      type: 'number',
      validation: (rule) => rule.min(0).max(5),
      description: 'Average simulation rating (0-5)',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'settings',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      description: 'Search engine optimization settings for this simulation',
      group: 'seo',
    }),
  ],
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'configuration',
      title: 'Simulation Config',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.title',
      difficulty: 'difficulty',
      status: 'status',
    },
    prepare({ title, subtitle, difficulty, status }) {
      return {
        title,
        subtitle: `${subtitle} • ${difficulty} • ${status}`,
      }
    },
  },
  orderings: [
    {
      title: 'Title',
      name: 'title',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Published Date',
      name: 'publishedAt',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Rating',
      name: 'rating',
      by: [{ field: 'rating', direction: 'desc' }],
    },
  ],
})