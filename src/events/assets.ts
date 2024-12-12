interface BaseAssetEvent {
  asset_id: string
  event_context: {
    user: {
      email: string
      id: string
    }
  }
  webhook_configuration_id: string
  webhook_delivery_id: string
}

export interface AssetCreatedEvent extends BaseAssetEvent {
  date_created: string
  event_type: 'asset_created'
}

export interface AssetDeletedEvent extends BaseAssetEvent {
  date_deleted: string
  event_type: 'asset_deleted'
}

export interface AssetReleasestringUpdatedEvent extends BaseAssetEvent {
  change: {
    new_value: string
    old_value: string
  }
  event_type: 'asset_release_date_updated'
}

export interface AssetExpirationstringUpdatedEvent extends BaseAssetEvent {
  change: {
    new_value: string
    old_value: string
  }
  event_type: 'asset_expiration_date_updated'
}

export interface AssetAssetGroupsUpdatedEvent extends BaseAssetEvent {
  change: {
    new_value: {
      id: string
    }[]
    old_value: {
      id: string
    }[]
  }
  event_type: 'asset_asset_groups_updated'
}

export interface AssetCategoriesUpdatedEvent extends BaseAssetEvent {
  change: {
    new_value: Category[]
    old_value: Category[]
  }
  event_type: 'asset_categories_updated'
}

export interface AssetTagsUpdatedEvent extends BaseAssetEvent {
  change: {
    new_value: Tag[]
    old_value: Tag[]
  }
  event_type: 'asset_tags_updated'
}

export interface AssetPingEvent extends BaseAssetEvent {
  event_type: 'ping'
}

export interface AssetVersionAddedEvent extends BaseAssetEvent {
  asset_version_id: string
  date_created: string
  event_type: 'asset_version_added'
  version_number: string
}

export interface Tag {
  display_name: string
  id: string
  value: string
}

export interface Category {
  _links: {
    assets: string
    categories: string
  }
  id: string
  name: string
  parts: string[]
  path: string
}
