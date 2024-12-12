export interface CreateOrderParams {
  /** Array of asset UUIDs to include in the order */
  assets: string[]
  /** Array of conversion UUIDs to perform on the assets for the order */
  conversions: string[]
  /** Kick off the creation of a zip archive for the order created for the first (or only) recipient listed. Does not create zip archives for any recipient other than the first listed. Defaults to `false` */
  createArchive?: boolean
  /** If metadata is required for the specified order profile, it should be included here */
  metadata?: {
    fields: {
      itemList?: {
        items: { selected: boolean; uuid: string }[]
      }
      uuid: string
      value?: string
    }[]
  }
  /** Notes to include in the order email */
  notes?: string
  /** The UUID of the order profile to be used when creating this order */
  profile: string
  /** Array of the current user's saved contact UUIDs who should receive the order */
  recipients: string[]
  /** Subject to use in the order email, a default is use if left blank */
  subject?: string
}

export interface IdentifyOrderById {
  /** Order UUID */
  id: string
  seqNum?: never
}

export interface IdentifyOrderBySeqNum {
  id?: never
  /** Order Sequence Number */
  seqNum: string
}

export type IdentifyOrder = IdentifyOrderById | IdentifyOrderBySeqNum

export type GetOrderDetailsParams = IdentifyOrder & {
  /** The starting index of assets in the order to include */
  start?: number
}

export interface ListConversionsForOrderParams {
  /** An array of asset UUIDs that will be included in the order */
  assetIds: string[]
  /** The UUID of the order profile */
  profileId: string
}
