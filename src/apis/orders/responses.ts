import type { Contact } from 'apis/users/responses'

export interface CleanAssetsResult {
  removedItems: {
    name: string
    reason: string
  }[]
}

export interface CreateOrderResult {
  orders: GetOrderDetailsResult[]
}

export interface GetOrderDetailsResult {
  assetsInOrder: number
  conversionStatus: string | null
  datePlaced: Date
  downloadCount: number
  expirationDate: Date
  externalPickupLink: string
  orderedItems: OrderItem[]
  recipient: Contact
  sender: Contact
  sequenceNumber: string
  status: string
  uuid: string
}

export interface OrderItem {
  conversions: Record<string, string>
  filename: string
  previews: {
    preview125: string
    preview160: string
    preview300: string
    preview600: string
    preview2048: string
  }
  uuid: string
}

export interface GetZipStatusResult {
  archived: number
  done: boolean
  download: string | null
  errored: boolean
  total: number
}

export interface ListConversionsForOrderResult {
  conversions: {
    approvalRequired: boolean
    description: string | null
    displayOrder: number
    mediaType: string
    name: string
    uuid: string
  }[]
}

export interface ListOrderProfileResult {
  profiles: {
    internetDelivery: boolean
    metadataTypeUuid: string
    name: string
    sendToSelf?: boolean
    specialInstructions: string | null
    uuid: string
  }[]
}

export type Order = GetOrderDetailsResult
