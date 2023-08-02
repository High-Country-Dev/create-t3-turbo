/* eslint-disable @typescript-eslint/require-await */
import type Clerk from '@clerk/clerk-js'
import type { AuthProvider } from 'react-admin'
import { PreviousLocationStorageKey } from 'react-admin'

import type { ClerkPublicMetadata } from '@acme/shared'

// Helpful articles
// https://clerk.com/docs/reference/clerkjs/clerk#open-sign-in-props
// https://github.com/marmelab/ra-auth-auth0/blob/main/packages/demo-react-admin/src/App.tsx
// https://marmelab.com/react-admin/Authentication.html

export const ClerkAuthProvider = (
  client: Clerk,
  {
    redirectOnCheckAuth,
    afterSignInUrl,
  }: { redirectOnCheckAuth: boolean; afterSignInUrl: string },
): AuthProvider => ({
  // Used when the redirection to Auth0 is done from a custom login page
  async login() {
    client.openSignIn({
      afterSignInUrl: `${window.location.origin}/auth-callback`,
    })
    return
  },
  // called when the user clicks on the logout button
  async logout() {
    return client.signOut().then(() => client.openSignIn({ afterSignInUrl }))
  },
  // called when the API returns an error
  async checkError({ status }) {
    if (status === 401 || status === 403) {
      throw new Error('Unauthorized')
    }
  },
  // called when the user navigates to a new location, to check for authentication
  async checkAuth() {
    const isAuthenticated = !!client.session?.user
    if (isAuthenticated) {
      return
    }

    if (redirectOnCheckAuth) {
      localStorage.setItem(PreviousLocationStorageKey, window.location.href)
      return client.openSignIn({
        afterSignInUrl:
          localStorage.getItem(PreviousLocationStorageKey) ??
          `${window.location.origin}/auth-callback`,
      })
    }
    throw new Error('Unauthorized')
  },
  // called when the user navigates to a new location, to check for permissions / roles
  async getPermissions() {
    if (!client.session) {
      return
    }
    const permissions = client.session?.user
      .publicMetadata as ClerkPublicMetadata
    return permissions
  },
  async getIdentity() {
    const user = client.session?.user
    if (user) {
      return {
        id: user.id,
        fullName: user.fullName ?? undefined,
        email: user.emailAddresses,
        avatar: user.imageUrl,
      }
    }
    throw new Error('Failed to get identity.')
  },
  async handleCallback() {
    const query = window.location.search
    if (query.includes('code=') && query.includes('state=')) {
      try {
        await client.handleRedirectCallback()
        return
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw { redirectTo: false, message: error.message }
        }
      }
    }
    throw new Error('Failed to handle login callback.')
  },
})
