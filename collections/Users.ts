import type { CollectionConfig } from "payload/types"

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
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
      name: "cart",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
    },
    {
      name: "role",
      type: "select",
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Customer",
          value: "customer",
        },
      ],
      defaultValue: "customer",
      required: true,
    },
  ],
}
