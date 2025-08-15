import { defineType, defineField } from 'sanity'

export const course = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  icon: () => '📚',
  fields: [
    defineField({
      name: 'title',
      title: 'Course Title',
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
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(200),
      description: 'Brief description for course cards and listings',
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
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
      ],
      group: 'content',
    }),
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'reference',
      to: [{ type: 'instructor' }],
      validation: (rule) => rule.required(),
      group: 'details',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
      group: 'details',
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
      group: 'details',
    }),
    defineField({
      name: 'duration',
      title: 'Course Duration',
      type: 'string',
      description: 'e.g. "4 weeks", "2-3 months"',
      validation: (rule) => rule.required(),
      group: 'details',
    }),
    defineField({
      name: 'estimatedHours',
      title: 'Estimated Hours',
      type: 'number',
      description: 'Total estimated study time in hours',
    }),
    defineField({
      name: 'prerequisites',
      title: 'Prerequisites',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'course' }],
        },
      ],
    }),
    defineField({
      name: 'learningObjectives',
      title: 'Learning Objectives',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'What students will learn in this course',
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
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'content',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'object',
      fields: [
        {
          name: 'amount',
          title: 'Price Amount',
          type: 'number',
          validation: (rule) => rule.min(0),
        },
        {
          name: 'currency',
          title: 'Currency',
          type: 'string',
          options: {
            list: ['USD', 'EUR', 'GBP'],
          },
          initialValue: 'USD',
        },
        {
          name: 'isFree',
          title: 'Free Course',
          type: 'boolean',
          initialValue: false,
        },
      ],
      group: 'details',
    }),
    defineField({
      name: 'status',
      title: 'Course Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Coming Soon', value: 'coming-soon' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Course',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'enrollmentCount',
      title: 'Enrollment Count',
      type: 'number',
      initialValue: 0,
      description: 'Total number of enrolled students',
    }),
    defineField({
      name: 'rating',
      title: 'Average Rating',
      type: 'number',
      validation: (rule) => rule.min(0).max(5),
      description: 'Average course rating (0-5)',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      description: 'Search engine optimization settings for this course',
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
      name: 'details',
      title: 'Course Details',
    },
    {
      name: 'seo',
      title: 'SEO & Marketing',
    },
  ],
  fieldsets: [
    {
      name: 'content',
      title: 'Content',
      options: { collapsible: false },
    },
    {
      name: 'pricing',
      title: 'Pricing',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'metadata',
      title: 'Metadata',
      options: { collapsible: true, collapsed: true },
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'instructor.name',
      media: 'featuredImage',
      difficulty: 'difficulty',
      status: 'status',
    },
    prepare({ title, subtitle, media, difficulty, status }) {
      return {
        title,
        subtitle: `${subtitle} • ${difficulty} • ${status}`,
        media,
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