import { defineArrayMember, defineField, defineType } from 'sanity';
import { apiVersion } from '../env';
import {
  buildCanonicalOfficerSlug,
  getNextHexOfficerId,
  isAllowedTechStackValue,
  NATIONALITY_OPTIONS,
  OFFICER_HEX_ID_PATTERN,
  slugifyOfficerValue,
  TECH_STACK_OPTIONS,
} from './officer-constants';

const officerLinkTypeOptions = [
  { title: 'Portfolio', value: 'portfolio' },
  { title: 'GitHub', value: 'github' },
  { title: 'LinkedIn', value: 'linkedin' },
  { title: 'X', value: 'x' },
  { title: 'Instagram', value: 'instagram' },
  { title: 'YouTube', value: 'youtube' },
  { title: 'Facebook', value: 'facebook' },
  { title: 'Twitch', value: 'twitch' },
  { title: 'Other', value: 'other' },
];

const collegeOptions = [
  { title: 'Carlson School of Management (CSOM)', value: 'CSOM' },
  { title: 'College of Biological Sciences (CBS)', value: 'CBS' },
  { title: 'College of Design (CDes / CDES)', value: 'CDES' },
  {
    title: 'College of Education and Human Development (CEHD)',
    value: 'CEHD',
  },
  {
    title: 'College of Food, Agricultural and Natural Resource Sciences (CFANS)',
    value: 'CFANS',
  },
  { title: 'College of Liberal Arts (CLA)', value: 'CLA' },
  { title: 'College of Science and Engineering (CSE)', value: 'CSE' },
  { title: 'School of Nursing (SON)', value: 'SON' },
  {
    title: 'College of Continuing and Professional Studies (CCAPS)',
    value: 'CCAPS',
  },
  { title: 'School of Dentistry (SOD)', value: 'SOD' },
  { title: 'Medical School (Med)', value: 'MED' },
  { title: 'College of Pharmacy (Pharm / COP)', value: 'COP' },
  { title: 'Humphrey School of Public Affairs (HSPA / Humphrey)', value: 'HSPA' },
  { title: 'School of Public Health (SPH)', value: 'SPH' },
  { title: 'College of Veterinary Medicine (CVM)', value: 'CVM' },
];

const toPublishedDocumentId = (documentId?: string): string =>
  (documentId ?? '').replace(/^drafts\./, '');

export const officerType = defineType({
  name: 'officer',
  title: 'Officer',
  type: 'document',
  initialValue: async (_, context) => {
    const client = context.getClient({ apiVersion });
    const existingIds = await client.fetch<Array<string | null>>(
      '*[_type == "officer" && defined(id)].id'
    );

    return {
      id: getNextHexOfficerId(existingIds),
    };
  },
  fields: [
    defineField({
      name: 'id',
      title: 'Hex ID',
      type: 'string',
      description: 'Displayed on profile pages (format: 0x0000).',
      validation: (Rule) =>
        Rule.required()
          .regex(OFFICER_HEX_ID_PATTERN)
          .error('Use the format 0x0000 (4 hex digits).')
          .custom(async (value, context) => {
            if (typeof value !== 'string' || !OFFICER_HEX_ID_PATTERN.test(value)) {
              return true;
            }

            const client = context.getClient({ apiVersion });
            const publishedId = toPublishedDocumentId(context.document?._id);
            const draftId = publishedId ? `drafts.${publishedId}` : '__none__';

            const duplicateCount = await client.fetch<number>(
              `count(
                *[
                  _type == "officer" &&
                  lower(id) == $hexId &&
                  !(_id in [$publishedId, $draftId])
                ]
              )`,
              {
                draftId,
                hexId: value.trim().toLowerCase(),
                publishedId: publishedId || '__none__',
              }
            );

            return duplicateCount === 0 || 'Hex ID must be unique.';
          }),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc?.givenName ?? ''}-${doc?.familyName ?? ''}`,
        slugify: (input) =>
          slugifyOfficerValue(typeof input === 'string' ? input : ''),
      },
      validation: (Rule) =>
        Rule.required().custom((value, context) => {
          const document = (context.document ?? {}) as {
            givenName?: string;
            familyName?: string;
          };
          const current = value?.current?.trim().toLowerCase();
          const expected = buildCanonicalOfficerSlug(
            document.givenName,
            document.familyName
          );

          if (!current) return 'Slug is required.';
          if (!expected) return true;
          if (current !== expected) {
            return `Slug must match "givenName-familyName" (expected "${expected}").`;
          }

          return true;
        }),
    }),
    defineField({
      name: 'givenName',
      title: 'Given name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'familyName',
      title: 'Family name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'current',
      title: 'Current officer',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'specialization',
      type: 'string',
    }),
    defineField({
      name: 'positions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'officerPosition',
          fields: [
            defineField({
              name: 'position',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'startYear',
              type: 'number',
              validation: (Rule) => Rule.required().integer().min(2000).max(2100),
            }),
            defineField({
              name: 'endYear',
              type: 'number',
              validation: (Rule) => Rule.required().integer().min(2000).max(2100),
            }),
          ],
          preview: {
            select: {
              title: 'position',
              startYear: 'startYear',
              endYear: 'endYear',
            },
            prepare(selection) {
              const { title, startYear, endYear } = selection;
              const range =
                startYear && endYear
                  ? startYear === endYear
                    ? `${startYear}`
                    : `${startYear}-${endYear}`
                  : '';
              return {
                title: title || 'Position',
                subtitle: range,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Upload an image logo for the profile action button and hero.',
      options: {
        hotspot: false,
      },
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      description: 'Upload a profile photo for this officer.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'project' }],
          options: {
            disableNew: true,
          },
        }),
      ],
      description: 'Ordered list used to pull project cards for this profile.',
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'modelFile',
      title: 'Lanyard model (.glb)',
      type: 'file',
      options: {
        accept: '.glb,model/gltf-binary',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bioShort',
      title: 'Short bio',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bioLong',
      title: 'Long bio',
      type: 'text',
      rows: 8,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'detailsTitle',
      type: 'string',
    }),
    defineField({
      name: 'leadershipStyle',
      type: 'string',
    }),
    defineField({
      name: 'nationalities',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
          options: {
            list: NATIONALITY_OPTIONS,
          },
        }),
      ],
      options: {
        layout: 'tags',
      },
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'college',
      type: 'string',
      options: {
        list: collegeOptions,
      },
    }),
    defineField({
      name: 'major',
      type: 'string',
    }),
    defineField({
      name: 'classYear',
      type: 'number',
      validation: (Rule) => Rule.integer().min(2000).max(2100),
    }),
    defineField({
      name: 'techStack',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
          options: {
            list: TECH_STACK_OPTIONS,
          },
        }),
      ],
      options: {
        layout: 'tags',
      },
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .unique()
          .custom((values) => {
            if (!Array.isArray(values)) return true;

            const invalid = values.find(
              (value) => typeof value === 'string' && !isAllowedTechStackValue(value)
            );

            return (
              !invalid ||
              `Unsupported tech stack value "${invalid}". Use one of the predefined options.`
            );
          }),
    }),
    defineField({
      name: 'companies',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'highlights',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'hobbies',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'officerLink',
          fields: [
            defineField({
              name: 'type',
              type: 'string',
              options: {
                list: officerLinkTypeOptions,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              type: 'string',
              hidden: ({ parent }) => parent?.type !== 'other',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as { type?: string } | undefined;
                  if (parent?.type === 'other' && !value) {
                    return 'Label is required when link type is "other".';
                  }
                  return true;
                }),
            }),
            defineField({
              name: 'url',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              type: 'type',
              label: 'label',
              url: 'url',
            },
            prepare(selection) {
              const { type, label, url } = selection;
              const resolvedLabel = type === 'other' ? label || 'Other' : type;
              return {
                title: resolvedLabel || 'Link',
                subtitle: url || '',
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      givenName: 'givenName',
      familyName: 'familyName',
      id: 'id',
      media: 'logo',
    },
    prepare(selection) {
      const { givenName, familyName, id, media } = selection;
      const fullName = [givenName, familyName].filter(Boolean).join(' ').trim();
      return {
        title: fullName || 'Officer',
        subtitle: id || '',
        media,
      };
    },
  },
});
