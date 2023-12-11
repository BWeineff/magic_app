import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

const config = defineConfig({
  name: 'default',
  title: 'Magic App Studio',

  projectId: 'y9gs3c3v',
  dataset: 'production',

  apiversion: '2023-12-01',

  basePath: '/admin',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

export default config
