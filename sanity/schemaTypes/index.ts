import {type SchemaTypeDefinition} from 'sanity'
import {eventType} from './event'
import {projectType} from './project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, projectType],
}
