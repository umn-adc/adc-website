import {defineQuery} from 'next-sanity'

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
    _id,
    id,
    title,
    description,
    tags,
    type,
    stage,
    href,
    img,
    color,
    stats {
      users,
      rating
    }
  }
`)
