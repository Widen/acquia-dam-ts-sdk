export interface CreateEditCategoryResult {
  children: CategoryV1[]
  id: number
  title: string
  uuid: string
}

export interface CategoryTreeResult {
  categories: CategoryV1[]
  parentCategory: null
}

export interface ListCategoriesResult {
  item_type: string
  items: CategoryV2[]
  total_count: number
}

export interface CategoryV1 {
  children: CategoryV1[]
  id: number
  title: string
  uuid: string
}

export interface CategoryV2 {
  _links: {
    assets: string
    categories: string
  }
  id: string
  name: string
  parts: string[]
  path: string
}
