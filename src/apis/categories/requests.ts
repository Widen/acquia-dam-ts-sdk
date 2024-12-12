export interface AddRemoveAssetsParams {
  /** Array of asset IDs to add to the specified categories */
  assets_to_add?: string[]
  /** Array of assets IDs to remove from the specified categories */
  assets_to_remove?: string[]
  /** Array of 1 or more categories to operate on */
  categories: string[]
}

export interface CreateCategoryParams {
  /** Description */
  description?: string
  /** `true` to reorganize the categories at this level alphabetically after category creation or edit. Defaults to `false` */
  displayAlphabetically?: boolean
  /** To display the new category before another category, provide its UUID here */
  displayBeforeCategory?: string
  /** UUID of the parent category, or "root" to make a top-level category */
  parentCategory: string
  /** Display title */
  title: string
}

export type EditCategoryParams = {
  /** The uuid of the category to edit */
  uuid: string
} & Partial<CreateCategoryParams>
