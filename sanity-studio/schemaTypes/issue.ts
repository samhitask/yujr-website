import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'issue',
  title: 'Issue',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Spring 2025 Issue"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'volume',
      title: 'Volume',
      type: 'number',
      description: 'e.g. 1',
      validation: Rule => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'issueNumber',
      title: 'Issue Number',
      type: 'number',
      description: 'e.g. 1',
      validation: Rule => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'A short summary of this issue displayed above the PDF embed.',
    }),
    defineField({
      name: 'pdf',
      title: 'PDF',
      type: 'file',
      description: 'Upload the full issue as a PDF.',
      options: {
        accept: '.pdf',
      },
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      volume: 'volume',
      issueNumber: 'issueNumber',
      publishedAt: 'publishedAt',
    },
    prepare({ title, volume, issueNumber, publishedAt }) {
      const vol = volume && issueNumber ? `Vol. ${volume}, No. ${issueNumber}` : ''
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : ''
      return {
        title,
        subtitle: [vol, date].filter(Boolean).join(' · '),
      }
    },
  },
})