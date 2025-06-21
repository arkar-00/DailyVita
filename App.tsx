import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { store } from './src/store'
import AppNavigator from './src/navigation/AppNavigator'

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#C8E6C9"
          translucent={false}
        />
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  )
}
