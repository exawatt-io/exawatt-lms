import { type SchemaTypeDefinition } from 'sanity'

import { category } from './category'
import { instructor } from './instructor'
import { course } from './course'
import { lesson } from './lesson'
import { simulation } from './simulation'

// Object types
import { seo } from './objects/seo'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Core content types
    category,
    instructor,
    course,
    lesson,
    simulation,
    
    // Object types
    seo,
  ],
}
