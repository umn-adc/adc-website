import {defineField, defineType} from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attendees',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'Coding Workshop', value: 'codingWorkshop'},
          {title: 'Design Workshop', value: 'designWorkshop'},
          {title: 'Panel', value: 'panel'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'featured', type: 'boolean'}),
  ],
})
