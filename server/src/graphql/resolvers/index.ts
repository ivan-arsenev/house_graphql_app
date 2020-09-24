import { bookingResolvers } from "./Bookings"
import { listingResolvers } from "./Listings"
import merge from "lodash.merge"
import { userResolvers } from "./User"
import { viewerResolvers } from "./Viewer"

export const resolvers = merge(
  viewerResolvers,
  userResolvers,
  listingResolvers,
  bookingResolvers
)
