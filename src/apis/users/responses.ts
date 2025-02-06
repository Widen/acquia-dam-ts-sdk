export interface GetUserResult {
  city: string | null
  company: string | null
  country: string | null
  email: string
  first_name: string
  id: string
  last_name: string
  phone: string | null
  postal_code: string | null
  state_or_province: string | null
  street_address: string | null
  title: string | null
  username: string
  uuid: string
}

export interface GetContactResult {
  fields: {
    city: ContactField
    company: ContactField
    country: ContactField
    email: ContactField
    firstName: ContactField
    lastName: ContactField
    phone: ContactField
    postalCode: ContactField
    stateOrProvince: ContactField
    streetAddress: ContactField
  }
  uuid: string
}

export interface ContactField {
  required: boolean
  value: string | null
}

export type User = GetUserResult
export type Contact = GetContactResult
