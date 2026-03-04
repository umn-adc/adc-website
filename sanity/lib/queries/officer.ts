import { defineQuery } from 'next-sanity';

const OFFICER_PROJECTION = `
  _id,
  id,
  "slug": slug.current,
  givenName,
  familyName,
  current,
  specialization,
  positions[] {
    position,
    startYear,
    endYear
  },
  "logo": logo.asset->url,
  "projects": projects[]->{
    "identifier": coalesce(slug.current, id)
  }.identifier,
  "modelUrl": modelFile.asset->url,
  bioShort,
  bioLong,
  detailsTitle,
  leadershipStyle,
  nationalities,
  college,
  major,
  classYear,
  techStack,
  companies,
  highlights,
  hobbies,
  links[] {
    type,
    label,
    url
  }
`;

export const OFFICERS_QUERY = defineQuery(`
  *[_type == "officer" && current == true] | order(id asc) {
    ${OFFICER_PROJECTION}
  }
`);

export const OFFICER_BY_IDENTIFIER_QUERY = defineQuery(`
  *[
    _type == "officer" &&
    (
      lower(slug.current) == $slugIdentifier ||
      lower(id) == $hexIdentifier
    )
  ][0] {
    ${OFFICER_PROJECTION}
  }
`);

export const OFFICER_IDENTIFIERS_QUERY = defineQuery(`
  *[_type == "officer"]{
    id,
    "slug": slug.current
  }
`);
