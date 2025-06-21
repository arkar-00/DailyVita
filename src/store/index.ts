import { configureStore } from '@reduxjs/toolkit'
import onboardingReducer from './slices/onboardingSlice'

const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export { store }
export type { RootState, AppDispatch }
