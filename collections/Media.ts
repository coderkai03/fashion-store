import type { CollectionConfig } from "payload/types"

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "../public/uploads",
    staticURL: "/uploads",
    imageSizes: [
      {
        name: "thumbnail",
        width: 200,
        height: 200,
        position: "centre",
      },
      {
        name: "card",
        width: 640,
        height: 640,
        position: "centre",
      },
      {
        name: "tablet",
        width: 1024,
        height: undefined,
        position: "centre",
      },
    ],
    mimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
}
