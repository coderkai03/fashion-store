import type { CollectionConfig } from "payload/types"

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "id",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "products",
      type: "array",
      fields: [
        {
          name: "product",
          type: "relationship",
          relationTo: "products",
          required: true,
        },
        {
          name: "quantity",
          type: "number",
          required: true,
          min: 1,
        },
        {
          name: "price",
          type: "number",
          required: true,
        },
        {
          name: "variant",
          type: "group",
          fields: [
            {
              name: "size",
              type: "text",
            },
            {
              name: "color",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      name: "status",
      type: "select",
      options: [
        {
          label: "Pending",
          value: "pending",
        },
        {
          label: "Processing",
          value: "processing",
        },
        {
          label: "Shipped",
          value: "shipped",
        },
        {
          label: "Delivered",
          value: "delivered",
        },
        {
          label: "Cancelled",
          value: "cancelled",
        },
      ],
      defaultValue: "pending",
      required: true,
    },
    {
      name: "shippingAddress",
      type: "group",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "address",
          type: "text",
          required: true,
        },
        {
          name: "city",
          type: "text",
          required: true,
        },
        {
          name: "state",
          type: "text",
          required: true,
        },
        {
          name: "zipCode",
          type: "text",
          required: true,
        },
        {
          name: "country",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "paymentInfo",
      type: "group",
      fields: [
        {
          name: "method",
          type: "select",
          options: [
            {
              label: "Credit Card",
              value: "credit_card",
            },
            {
              label: "PayPal",
              value: "paypal",
            },
          ],
          required: true,
        },
        {
          name: "transactionId",
          type: "text",
        },
      ],
    },
    {
      name: "total",
      type: "number",
      required: true,
    },
  ],
}
