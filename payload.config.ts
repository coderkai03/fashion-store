import { buildConfig } from "payload/config"
import path from "path"

import { Users } from "./collections/Users"
import { Products } from "./collections/Products"
import { Orders } from "./collections/Orders"
import { Media } from "./collections/Media"
import { Categories } from "./collections/Categories"

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Products, Orders, Media, Categories],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  cors: ["http://localhost:3000"],
  csrf: ["http://localhost:3000"],
})
