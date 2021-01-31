import { Booking, Database, Listing, User } from "../lib/types"

import { MongoClient } from "mongodb"

const url = `${process.env.DB_LOCAL_STRING}` // `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net` `${process.env.DB_LOCAL_STRING}` //

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
  const db = client.db("main")

  return {
    bookings: db.collection<Booking>("bookings"),
    listings: db.collection<Listing>("listings"),
    users: db.collection<User>("users"),
  }
}
