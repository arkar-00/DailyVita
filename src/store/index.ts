import { configureStore } from '@reduxjs/toolkit'
import onboardingReducer from './slices/onboardingSlice'

export const store = configureStore({
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

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
