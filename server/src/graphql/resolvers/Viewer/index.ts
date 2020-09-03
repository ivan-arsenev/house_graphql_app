import crypto from "crypto"
import { IResolvers } from "apollo-server-express"
import { Viewer } from "../../../lib/types"
import { Google } from "../../../lib/api"
import { LogInArgs } from "./types"

export const viewerResolvers: IResolvers = {
  Query: {
    authUrl: (): string => {
      try {
        return Google.authUrl
      } catch (error) {
        throw new Error(`Failed to query Google Auth Url: ${error}`)
      }
    },
  },
  Mutation: {
    logIn: (_root: undefined, { input }: LogInArgs) => {
      try {
        const code = input ? input.code : null
      } catch (error) {}
    },
    logOut: () => {
      return "Mutation.logOut"
    },
  },
  Viewer: {
    id: (viewer: Viewer) => {
      return viewer._id
    },
    hasWallet: (viewer: Viewer): boolean | undefined => {
      return viewer.walletId ? true : undefined
    },
  },
}
