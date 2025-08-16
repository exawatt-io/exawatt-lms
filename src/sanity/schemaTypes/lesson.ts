import { defineType, defineField } from 'sanity'

export const lesson = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  icon: () => '📖',
  fields: [
    defineField({
      name: 'title',
      title: 'Lesson Title',
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
      name: 'course',
      title: 'Course',
      type: 'reference',
      to: [{ type: 'course' }],
      validation: (rule) => rule.required(),
      group: 'structure',
    }),
    defineField({
      name: 'orderIndex',
      title: 'Lesson Order',
      type: 'number',
      validation: (rule) => rule.required().min(1),
      description: 'Order of this lesson within the course',
      group: 'structure',
    }),
    defineField({
      name: 'description',
      title: 'Lesson Description',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Lesson Content',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
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
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {
          type: 'object',
          name: 'codeBlock',
          title: 'Code Block',
          fields: [
            {
              name: 'language',
              title: 'Language',
              type: 'string',
              options: {
                list: [
                  { title: 'JavaScript', value: 'javascript' },
                  { title: 'Python', value: 'python' },
                  { title: 'MATLAB', value: 'matlab' },
                  { title: 'R', value: 'r' },
                  { title: 'SQL', value: 'sql' },
                  { title: 'JSON', value: 'json' },
                ],
              },
            },
            {
              name: 'code',
              title: 'Code',
              type: 'text',
            },
          ],
        },
        {
          type: 'object',
          name: 'callout',
          title: 'Callout Box',
          fields: [
            {
              name: 'type',
              title: 'Callout Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Info', value: 'info' },
                  { title: 'Warning', value: 'warning' },
                  { title: 'Success', value: 'success' },
                  { title: 'Error', value: 'error' },
                ],
              },
            },
            {
              name: 'content',
              title: 'Content',
              type: 'text',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'estimatedDuration',
      title: 'Estimated Duration (minutes)',
      type: 'number',
      validation: (rule) => rule.min(1).max(240),
      group: 'content',
    }),
    defineField({
      name: 'learningObjectives',
      title: 'Learning Objectives',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'content',
    }),
    defineField({
      name: 'keyTerms',
      title: 'Key Terms',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'term',
              title: 'Term',
              type: 'string',
            },
            {
              name: 'definition',
              title: 'Definition',
              type: 'text',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'hasQuiz',
      title: 'Has Quiz',
      type: 'boolean',
      initialValue: false,
      group: 'structure',
    }),
    defineField({
      name: 'hasSimulation',
      title: 'Has Simulation Exercise',
      type: 'boolean',
      initialValue: false,
      group: 'structure',
    }),
    defineField({
      name: 'simulationReference',
      title: 'Related Simulation',
      type: 'reference',
      to: [{ type: 'simulation' }],
      hidden: ({ document }) => !document?.hasSimulation,
      group: 'structure',
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
      group: 'settings',
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
      description: 'Search engine optimization settings for this lesson',
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
      name: 'structure',
      title: 'Course Structure',
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
      course: 'course.title',
      order: 'orderIndex',
    },
    prepare({ title, course, order }) {
      return {
        title: `${order}. ${title}`,
        subtitle: course,
      }
    },
  },
  orderings: [
    {
      title: 'Course Order',
      name: 'courseOrder',
      by: [
        { field: 'course', direction: 'asc' },
        { field: 'orderIndex', direction: 'asc' },
      ],
    },
  ],
})