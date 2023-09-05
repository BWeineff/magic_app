import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'card',
    title: 'Card',
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
    ],
    preview: {
        select: {
            title: 'name',
        },
    },
})
