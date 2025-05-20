import type { CollectionConfig } from "payload/types"

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "price",
      type: "number",
      required: true,
    },
    {
      name: "images",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "alt",
          type: "text",
        },
      ],
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
    },
    {
      name: "details",
      type: "richText",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "inventory",
      type: "group",
      fields: [
        {
          name: "sizes",
          type: "array",
          fields: [
            {
              name: "size",
              type: "text",
            },
            {
              name: "quantity",
              type: "number",
              defaultValue: 0,
            },
          ],
        },
        {
          name: "colors",
          type: "array",
          fields: [
            {
              name: "color",
              type: "text",
            },
            {
              name: "quantity",
              type: "number",
              defaultValue: 0,
            },
          ],
        },
      ],
    },
  ],
}
