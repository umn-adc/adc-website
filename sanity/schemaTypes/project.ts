import { defineArrayMember, defineField, defineType } from 'sanity';
import {
  TECH_STACK_OPTIONS,
  isAllowedTechStackValue,
} from './officer-constants';

type ProjectTypeValue = 'mobile' | 'web' | 'cli';

const PROJECT_TYPE_OPTIONS: { title: string; value: ProjectTypeValue }[] = [
  { title: 'Mobile app', value: 'mobile' },
  { title: 'Web app', value: 'web' },
  { title: 'CLI tool', value: 'cli' },
];

const PROJECT_TYPE_VALUES = new Set<ProjectTypeValue>([
  'mobile',
  'web',
  'cli',
]);

const toProjectTypes = (document: Record<string, unknown>): ProjectTypeValue[] => {
  const rawTypes = Array.isArray(document.types)
    ? document.types
    : typeof document.type === 'string'
      ? [document.type]
      : [];

  return rawTypes.filter(
    (value): value is ProjectTypeValue =>
      typeof value === 'string' &&
      PROJECT_TYPE_VALUES.has(value as ProjectTypeValue)
  );
};

const hasProjectType = (document: unknown, value: ProjectTypeValue): boolean => {
  if (!document || typeof document !== 'object') return false;
  return toProjectTypes(document as Record<string, unknown>).includes(value);
};

const hasNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const hasUploadedFile = (value: unknown): boolean => {
  if (!value || typeof value !== 'object') return false;
  const asset = (value as { asset?: unknown }).asset;
  if (!asset || typeof asset !== 'object') return false;
  const ref = (asset as { _ref?: unknown })._ref;
  return typeof ref === 'string' && ref.trim().length > 0;
};

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
      name: 'blurb',
      title: 'Project blurb',
      type: 'string',
      description: 'One short sentence summary.',
      validation: (Rule) => Rule.required().max(180),
    }),
    defineField({
      name: 'description',
      title: 'Legacy description',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'longDescription',
      type: 'text',
      rows: 8,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'types',
      title: 'Project types',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        list: PROJECT_TYPE_OPTIONS,
      },
      validation: (Rule) => Rule.required().min(1).unique(),
    }),
    defineField({
      name: 'type',
      title: 'Legacy project type',
      type: 'string',
      options: {
        list: PROJECT_TYPE_OPTIONS,
      },
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'stage',
      type: 'string',
      options: {
        list: [
          { title: 'Release', value: 'release' },
          { title: 'In development', value: 'dev' },
          { title: 'Deprecated', value: 'unsupported' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'leadership',
      title: 'Leadership',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'projectLeadership',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'officer',
              type: 'reference',
              to: [{ type: 'officer' }],
              options: {
                disableNew: true,
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              givenName: 'officer.givenName',
              familyName: 'officer.familyName',
              officerId: 'officer.id',
            },
            prepare(selection) {
              const { title, givenName, familyName, officerId } = selection;
              const officerName = [givenName, familyName]
                .filter((value) => typeof value === 'string' && value.trim())
                .join(' ');
              return {
                title: title || 'Leadership role',
                subtitle: officerName || officerId || 'Officer',
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.unique(),
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
        Rule.unique().custom((values) => {
          if (!Array.isArray(values) || values.length === 0) return true;

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
      name: 'links',
      type: 'object',
      fields: [
        defineField({
          name: 'web',
          type: 'url',
          hidden: ({ document }) => !hasProjectType(document, 'web'),
        }),
        defineField({
          name: 'ios',
          title: 'iOS',
          type: 'url',
          hidden: ({ document }) => !hasProjectType(document, 'mobile'),
        }),
        defineField({
          name: 'android',
          title: 'Android',
          type: 'url',
          hidden: ({ document }) => !hasProjectType(document, 'mobile'),
        }),
        defineField({
          name: 'other',
          title: 'CLI / other',
          type: 'url',
          hidden: ({ document }) => !hasProjectType(document, 'cli'),
        }),
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const document = context.document as Record<string, unknown> | undefined;
          const stage =
            typeof document?.stage === 'string' ? document.stage : undefined;
          const links = (value ?? {}) as {
            web?: unknown;
            ios?: unknown;
            android?: unknown;
            other?: unknown;
          };
          if (stage === 'dev') return true;

          const requiresWeb = hasProjectType(document, 'web');
          const requiresMobile = hasProjectType(document, 'mobile');
          const requiresCli = hasProjectType(document, 'cli');

          if (requiresWeb && !hasNonEmptyString(links.web)) {
            return 'A web link is required when "web" is selected.';
          }
          if (
            requiresMobile &&
            !hasNonEmptyString(links.ios) &&
            !hasNonEmptyString(links.android)
          ) {
            return 'At least one mobile link (iOS or Android) is required when "mobile" is selected.';
          }
          if (requiresCli && !hasNonEmptyString(links.other)) {
            return 'An "other" link is required when "cli" is selected.';
          }

          return true;
        }),
    }),
    defineField({
      name: 'startDate',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'releaseDate',
      type: 'date',
      hidden: ({ document }) => document?.stage === 'dev',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const stage = context.document?.stage;
          if ((stage === 'release' || stage === 'unsupported') && !value) {
            return 'Release date is required when stage is release or unsupported.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'deprecationDate',
      title: 'Deprecation date',
      type: 'date',
      hidden: ({ document }) => document?.stage !== 'unsupported',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const stage = context.document?.stage;
          if (stage === 'unsupported' && !value) {
            return 'Deprecation date is required when stage is unsupported.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'demoVideo',
      title: 'Demo videos',
      type: 'object',
      fields: [
        defineField({
          name: 'web',
          type: 'file',
          options: {
            accept: 'video/*',
          },
          hidden: ({ document }) => !hasProjectType(document, 'web'),
        }),
        defineField({
          name: 'ios',
          title: 'iOS',
          type: 'file',
          options: {
            accept: 'video/*',
          },
          hidden: ({ document }) => !hasProjectType(document, 'mobile'),
        }),
        defineField({
          name: 'android',
          title: 'Android',
          type: 'file',
          options: {
            accept: 'video/*',
          },
          hidden: ({ document }) => !hasProjectType(document, 'mobile'),
        }),
        defineField({
          name: 'cli',
          title: 'CLI',
          type: 'file',
          options: {
            accept: 'video/*',
          },
          hidden: ({ document }) => !hasProjectType(document, 'cli'),
        }),
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const document = context.document as Record<string, unknown> | undefined;
          const stage =
            typeof document?.stage === 'string' ? document.stage : undefined;
          const demoVideo = (value ?? {}) as {
            web?: unknown;
            ios?: unknown;
            android?: unknown;
            cli?: unknown;
          };
          if (stage === 'dev') return true;

          const requiresWeb = hasProjectType(document, 'web');
          const requiresMobile = hasProjectType(document, 'mobile');
          const requiresCli = hasProjectType(document, 'cli');

          if (requiresWeb && !hasUploadedFile(demoVideo.web)) {
            return 'A web demo video is required when "web" is selected.';
          }
          if (
            requiresMobile &&
            !hasUploadedFile(demoVideo.ios) &&
            !hasUploadedFile(demoVideo.android)
          ) {
            return 'At least one mobile demo video (iOS or Android) is required when "mobile" is selected.';
          }
          if (requiresCli && !hasUploadedFile(demoVideo.cli)) {
            return 'A CLI demo video is required when "cli" is selected.';
          }

          return true;
        }),
    }),
    defineField({
      name: 'terminalExample',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description:
        'Commands/lines to render in the terminal component. Only for CLI projects.',
      hidden: ({ document }) => !hasProjectType(document, 'cli'),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const document = context.document as Record<string, unknown> | undefined;
          const requiresCli = hasProjectType(document, 'cli');
          if (requiresCli && (!Array.isArray(value) || value.length === 0)) {
            return 'At least one terminal example line is required when "cli" is selected.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Upload an image logo for the project hero.',
      options: {
        hotspot: false,
      },
    }),
    defineField({
      name: 'href',
      title: 'External Link',
      type: 'url',
      hidden: true,
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
