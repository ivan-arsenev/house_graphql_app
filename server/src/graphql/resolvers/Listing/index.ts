import { Database, Listing, User } from "../../../lib/types"

import { IResolvers } from "apollo-server-express"
import { ListingArgs } from "./types"
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

    host: async (
      listing: Listing,
      _args: {},
      { db }: { db: Database }
    ): Promise<User> => {
      const host = await db.users.findOne({ _id: listing.host })
      if (!host) {
        throw new Error("host can't be found")
      }
      return host
    },

    bookingsIndex: (listing: Listing): string => {
      return JSON.stringify(listing.bookingsIndex)
    },
  },
}
