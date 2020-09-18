import { Collection, ObjectId } from "mongodb"

export interface Viewer {
  _id?: string
  token?: string
  avatar?: string
  walletId?: string
  didRequest: boolean
}

export enum ListingType {
  Apartment = "APARTMENT",
  House = "HOUSE",
}

export interface BookingsIndexMonth {
  [key: string]: boolean
}

export interface BookingsIndexYear {
  [key: string]: BookingsIndexMonth
}

export interface BookingsIndex {
  [key: string]: BookingsIndexYear
}

export interface Booking {
  _id: ObjectId
  listing: ObjectId
  tenant: string
  checkIn: string
  checkOut: string
}

export interface Listing {
  _id: ObjectId
  title: string
  description: string
  image: string
  host: string // one to one relationship / to user id
  type: ListingType
  address: string
  country: string
  admin: string
  city: string
  bookings: ObjectId[]
  bookingsIndex: BookingsIndex
  price: number
  numOfGuests: number
}

export interface User {
  _id: string // will use string instead of ObjectId other auth service return string
  token: string // session token
  name: string
  avatar: string // avatar url
  contact: string // email address
  walletId?: string // wallet id !null user can receive money
  income: number
  bookings: ObjectId[] // one to many relationship
  listings: ObjectId[] // one to many
  authorized?: boolean // not part of document in DB, only for resolver
}

export interface Database {
  bookings: Collection<Booking>
  listings: Collection<Listing>
  users: Collection<User>
}
