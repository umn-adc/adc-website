import { defineQuery } from 'next-sanity';

const PROJECT_PROJECTION = `
  _id,
  id,
  "slug": coalesce(slug.current, id),
  title,
  blurb,
  description,
  longDescription,
  tags,
  "types": array::compact(coalesce(types, select(defined(type) => [type], []))),
  stage,
  leadership[] {
    title,
    "officer": officer->{
      _id,
      id,
      "slug": slug.current,
      givenName,
      familyName,
      "photo": photo.asset->url
    }
  },
  techStack,
  links {
    web,
    ios,
    android,
    other
  },
  startDate,
  releaseDate,
  deprecationDate,
  demoVideo {
    "web": web.asset->url,
    "ios": ios.asset->url,
    "android": android.asset->url,
    "cli": cli.asset->url
  },
  terminalExample,
  "logo": logo.asset->url,
  href,
  img,
  color,
  stats {
    users,
    rating
  }
`;

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"]
    | order(
        select(
          stage == "dev" => 0,
          stage == "release" => 1,
          stage == "unsupported" => 2,
          3
        ) asc,
        _createdAt desc
      ) {
    ${PROJECT_PROJECTION}
  }
`);

export const PROJECTS_BY_SLUGS_QUERY = defineQuery(`
  *[
    _type == "project" &&
    (
      id in $slugs ||
      slug.current in $slugs
    )
  ] {
    ${PROJECT_PROJECTION}
  }
`);

export const PROJECT_BY_IDENTIFIER_QUERY = defineQuery(`
  *[
    _type == "project" &&
    (
      lower(id) == $identifier ||
      lower(slug.current) == $identifier
    )
  ][0] {
    ${PROJECT_PROJECTION}
  }
`);

export const PROJECT_IDENTIFIERS_QUERY = defineQuery(`
  *[_type == "project"]{
    id,
    "slug": coalesce(slug.current, id)
  }
`);
