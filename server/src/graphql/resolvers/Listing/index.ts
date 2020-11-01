import { Database, Listing, User } from "../../../lib/types"
import { ListingArgs, ListingBookingsArgs, ListingBookingsData } from "./types"

import { IResolvers } from "apollo-server-express"
import { ObjectId } from "mongodb"
import { Request } from "express"
import { authorize } from "../../../lib/utils"

export const listingResolvers: IResolvers = {
  Query: {
    listing: async (
      _root: undefined,
      { id }: ListingArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<Listing> => {
      try {
        const listing = await db.listings.findOne({ _id: new ObjectId(id) })
        if (!listing) {
          throw new Error("listing not found")
        }

        const viewer = await authorize(db, req)
        if (viewer && viewer._id === listing.host) {
          listing.authorized = true
        }
        return listing
      } catch (error) {
        throw new Error(`Failed to query listing: ${error}`)
      }
    },
  },
  Listing: {
    id: (listing: Listing): string => {
      return listing._id.toString()
    },

    bookingsIndex: (listing: Listing): string => {
      return JSON.stringify(listing.bookingsIndex)
    },
    bookings: async (
      listing: Listing,
      { limit, page }: ListingBookingsArgs,
      { db }: { db: Database }
    ): Promise<ListingBookingsData | null> => {
      // Offset-based pagination (numbered pages)
      try {
        if (!listing.authorized) return null

        const data: ListingBookingsData = {
          total: 0,
          result: [],
        }

        let cursor = await db.bookings.find({
          _id: { $in: listing.bookings },
        })

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0)
        cursor = cursor.limit(limit)

        data.total = await cursor.count()
        data.result = await cursor.toArray()

        return data
      } catch (error) {
        throw new Error(`Failed to query listing bookings: ${error}`)
      }
    },
  },
}
