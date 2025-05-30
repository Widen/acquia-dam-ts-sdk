// Generated by ts-to-zod
import { z } from 'zod'

export const cleanAssetsResultSchema = z.object({
  removedItems: z.array(
    z.object({
      name: z.string(),
      reason: z.string(),
    })
  ),
})

export const orderItemSchema = z.object({
  conversions: z.record(z.string()),
  filename: z.string(),
  previews: z.object({
    preview125: z.string(),
    preview160: z.string(),
    preview300: z.string(),
    preview600: z.string(),
    preview2048: z.string(),
  }),
  uuid: z.string(),
})

export const getZipStatusResultSchema = z.object({
  archived: z.number(),
  done: z.boolean(),
  download: z.string().nullable(),
  errored: z.boolean(),
  total: z.number(),
})

export const listConversionsForOrderResultSchema = z.object({
  conversions: z.array(
    z.object({
      approvalRequired: z.boolean(),
      description: z.string().nullable(),
      displayOrder: z.number(),
      mediaType: z.string(),
      name: z.string(),
      uuid: z.string(),
    })
  ),
})

export const listOrderProfileResultSchema = z.object({
  profiles: z.array(
    z.object({
      internetDelivery: z.boolean(),
      metadataTypeUuid: z.string(),
      name: z.string(),
      sendToSelf: z.boolean().optional(),
      specialInstructions: z.string().nullable(),
      uuid: z.string(),
    })
  ),
})

const contactSchema = z.any()

export const getOrderDetailsResultSchema = z.object({
  assetsInOrder: z.number(),
  conversionStatus: z.string().nullable(),
  datePlaced: z.date(),
  downloadCount: z.number(),
  expirationDate: z.date(),
  externalPickupLink: z.string(),
  orderedItems: z.array(orderItemSchema),
  recipient: contactSchema,
  sender: contactSchema,
  sequenceNumber: z.string(),
  status: z.string(),
  uuid: z.string(),
})

export const orderSchema = getOrderDetailsResultSchema

export const createOrderResultSchema = z.object({
  orders: z.array(getOrderDetailsResultSchema),
})
