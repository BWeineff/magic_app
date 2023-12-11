import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'scryfallCard',
  title: 'Scryfall Card',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
    }),
    defineField({
      name: 'image_uris',
      title: 'Image URIs',
      type: 'object',
      fields: [
        {
          name: 'normal',
          title: 'Normal',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'cmc',
      title: 'Converted Mana Cost',
      type: 'number',
    }),
    defineField({
      name: 'type_line',
      title: 'Type Line',
      type: 'string',
    }),
    defineField({
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'set_name',
      title: 'Set Name',
      type: 'string',
    }),
    defineField({
      name: 'rarity',
      title: 'Rarity',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
});
