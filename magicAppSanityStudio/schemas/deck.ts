import {defineField, defineType} from 'sanity'
import {DecklistInput} from './inputs';

const formatOptions = [
  { title: 'cEDH', value: 'cEDH' },
  { title: 'EDH', value: 'EDH' },
  { title: 'Legacy', value: 'Legacy' },
  { title: 'Vintage', value: 'Vintage' },
  { title: 'Modern', value: 'Modern' },
  { title: 'Standard', value: 'Standard' },
  { title: 'Pauper', value: 'Pauper' },
  { title: 'Pioneer', value: 'Pioneer' },
  { title: 'No Format', value: 'No Format' },
];

export default defineType({
  name: 'deck',
  title: 'Deck',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'creator',
      title: 'Creator',
      type: 'reference',
      to: {type: 'creator'},
    }),
    defineField({
      name: 'decklist',
      title: 'Decklist',
      type: 'text',
      components: {
        input: DecklistInput, // custom input component
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      options: {
        list: formatOptions,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'card' }] }],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'wins',
      title: 'Wins',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'losses',
      title: 'Losses',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      creator: 'creator.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {creator} = selection
      return {...selection, subtitle: creator && `by ${creator}`}
    },
  },
})
