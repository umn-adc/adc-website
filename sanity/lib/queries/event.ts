import {defineQuery} from 'next-sanity'

export const EVENTS_QUERY = defineQuery(`
  *[_type == "event" && date >= now()] | order(date asc) {
    _id,
    id,
    title,
    description,
    link,
    date,
    location,
    attendees,
    type,
    featured
  }
`)
