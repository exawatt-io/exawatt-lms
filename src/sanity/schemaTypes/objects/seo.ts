import { defineType, defineField } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title tag for search engines (50-60 characters recommended)',
      validation: Rule => Rule.max(60).warning('Meta titles should be under 60 characters'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines (150-160 characters recommended)',
      validation: Rule => Rule.max(160).warning('Meta descriptions should be under 160 characters'),
    }),
    defineField({
      name: 'keywords',
      title: 'Focus Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Primary keywords for this content (3-5 recommended)',
      validation: Rule => Rule.max(5).warning('Too many keywords can hurt SEO'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Media Image',
      type: 'image',
      description: 'Image for social media sharing (1200x630px recommended)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Alternative text for accessibility and SEO',
        }
      ]
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description: 'Prevent search engines from indexing this content',
      initialValue: false,
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Preferred URL for this content (if different from default)',
    }),
    defineField({
      name: 'structuredData',
      title: 'Structured Data',
      type: 'object',
      description: 'Additional structured data for rich snippets',
      fields: [
        defineField({
          name: 'type',
          title: 'Schema Type',
          type: 'string',
          options: {
            list: [
              { title: 'Course', value: 'Course' },
              { title: 'LearningResource', value: 'LearningResource' },
              { title: 'Article', value: 'Article' },
              { title: 'VideoObject', value: 'VideoObject' },
              { title: 'WebPage', value: 'WebPage' },
            ]
          },
          initialValue: 'Course',
        }),
        defineField({
          name: 'educationalLevel',
          title: 'Educational Level',
          type: 'string',
          options: {
            list: [
              { title: 'Beginner', value: 'beginner' },
              { title: 'Intermediate', value: 'intermediate' },
              { title: 'Advanced', value: 'advanced' },
              { title: 'Professional', value: 'professional' },
            ]
          }
        }),
        defineField({
          name: 'timeRequired',
          title: 'Time Required (ISO 8601)',
          type: 'string',
          description: 'Duration in ISO 8601 format (e.g., PT2H30M for 2 hours 30 minutes)',
          placeholder: 'PT2H30M',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'metaTitle',
      description: 'metaDescription',
    },
    prepare({ title, description }) {
      return {
        title: title || 'SEO Settings',
        subtitle: description || 'No meta description set',
      }
    }
  }
})