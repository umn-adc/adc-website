import {type SchemaTypeDefinition} from 'sanity'
import {eventType} from './event'
import {officerType} from './officer'
import {projectType} from './project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, officerType, projectType],
}
