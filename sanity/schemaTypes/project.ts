import { defineField, defineType } from 'sanity';

export const projectType = defineType({
  name: 'project',
  title: 'Project',
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
      name: 'description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Mobile app', value: 'mobile' },
          { title: 'Web app', value: 'web' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stage',
      type: 'string',
      options: {
        list: [
          { title: 'Release', value: 'release' },
          { title: 'In development', value: 'dev' },
          { title: 'Unsupported', value: 'unsupported' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'External Link',
      type: 'url',
    }),
    defineField({
      name: 'img',
      title: 'Background Image',
      type: 'image',
      description: 'Image displayed on the project card.',
    }),
    defineField({
      name: 'color',
      title: 'Gradient Classes',
      type: 'string',
      description: 'Tailwind classes, e.g. "from-primary to-indigo-deep"',
    }),
    defineField({
      name: 'stats',
      type: 'object',
      fields: [
        defineField({ name: 'users', type: 'number' }),
        defineField({ name: 'rating', type: 'number' }),
      ],
      hidden: ({ document }) => document?.stage === 'dev',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const stage = context.document?.stage;
          if (stage && stage !== 'dev') {
            const usersMissing =
              value?.users === undefined || value?.users === null;
            const ratingMissing =
              value?.rating === undefined || value?.rating === null;
            if (usersMissing || ratingMissing) {
              return 'Stats are required when stage is not dev.';
            }
          }
          return true;
        }),
    }),
  ],
});
