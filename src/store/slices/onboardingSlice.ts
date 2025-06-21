import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { HealthConcern, Diet, Allergy, OnboardingState } from '../../types'
import { AlcoholOption } from '../../constants'

const initialState: OnboardingState = {
  currentStep: 0,
  totalSteps: 4,
  healthConcerns: [],
  prioritizedConcerns: [],
  selectedDiets: [],
  isDailyExposure: null,
  isSmoke: null,
  alcohol: null,
  allergies: [],
  customAllergies: '',
  isLoading: false,
  error: null,
  isCompleted: false,
}

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
    nextStep: (state) => {
      if (state.currentStep < state.totalSteps - 1) {
        state.currentStep += 1
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1
      }
    },
    setHealthConcerns: (state, action: PayloadAction<HealthConcern[]>) => {
      state.healthConcerns = action.payload
    },
    setPrioritizedConcerns: (state, action: PayloadAction<HealthConcern[]>) => {
      state.prioritizedConcerns = action.payload
    },
    setSelectedDiets: (state, action: PayloadAction<Diet[]>) => {
      state.selectedDiets = action.payload
    },
    setDailyExposure: (state, action: PayloadAction<boolean>) => {
      state.isDailyExposure = action.payload
    },
    setSmoke: (state, action: PayloadAction<boolean>) => {
      state.isSmoke = action.payload
    },
    setAlcohol: (state, action: PayloadAction<AlcoholOption>) => {
      state.alcohol = action.payload
    },
    setAllergies: (state, action: PayloadAction<Allergy[]>) => {
      state.allergies = action.payload
    },
    setCustomAllergies: (state, action: PayloadAction<string>) => {
      state.customAllergies = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setCompleted: (state, action: PayloadAction<boolean>) => {
      state.isCompleted = action.payload
    },
    resetOnboarding: () => initialState,
  },
})

export const {
  setCurrentStep,
  nextStep,
  prevStep,
  setHealthConcerns,
  setPrioritizedConcerns,
  setSelectedDiets,
  setDailyExposure,
  setSmoke,
  setAlcohol,
  setAllergies,
  setCustomAllergies,
  setLoading,
  setError,
  setCompleted,
  resetOnboarding,
} = onboardingSlice.actions

export default onboardingSlice.reducer
