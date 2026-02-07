import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Anonymous',
    }),
    defineField({
      name: 'pubDate',
      title: 'Publish Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'draft',
      title: 'Draft',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'image',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})