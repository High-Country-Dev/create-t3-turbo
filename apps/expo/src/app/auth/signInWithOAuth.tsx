import React from 'react'
import { Button, View } from 'react-native'
import { useOAuth } from '@clerk/clerk-expo'

import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser'

const SignInWithOAuth = () => {
  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_discord' })

  const handleSignInWithDiscordPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow()
      if (createdSessionId) {
        void setActive?.({ session: createdSessionId })
      } else {
        // Modify this code to use signIn or signUp to set this missing requirements you set in your dashboard.
        throw new Error(
          'There are unmet requirements, modifiy this else to handle them',
        )
      }
    } catch (err) {
      console.log('error signing in', JSON.stringify(err, null, 2))
    }
  }, [startOAuthFlow])

  return (
    <View className='rounded-lg border-2 border-gray-500 p-4'>
      <Button
        title='Sign in with Discord'
        onPress={() => {
          console.log('press discord')
          void handleSignInWithDiscordPress()
        }}
      />
    </View>
  )
}

export default SignInWithOAuth
