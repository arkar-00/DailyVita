import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
  HealthConcern,
  Diet,
  Allergy,
  OnboardingState,
  FormattedOnboardingData,
} from '../../types'
import { AlcoholOption, STORAGE_KEYS } from '../../constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Helper to format onboarding data
export const formatOnboardingData = (
  state: OnboardingState,
): FormattedOnboardingData => ({
  health_concerns: state.prioritizedConcerns.map((concern, index) => ({
    ...concern,
    priority: index + 1,
  })),
  diets: state.selectedDiets,
  is_daily_exposure: state.isDailyExposure,
  is_smoke: state.isSmoke,
  alcohol: state.alcohol,
  allergies: state.allergies,
  custom_allergies: state.customAllergies,
  timestamp: new Date().toISOString(),
})

// Async thunk for saving onboarding data
export const saveOnboardingData = createAsyncThunk(
  'onboarding/saveData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { onboarding } = getState() as { onboarding: OnboardingState }
      const dataToSave = formatOnboardingData(onboarding)

      await AsyncStorage.setItem(
        STORAGE_KEYS.ONBOARDING_DATA,
        JSON.stringify(dataToSave),
      )

      console.log('=== ONBOARDING DATA ===')
      console.log(JSON.stringify(dataToSave, null, 2))
      console.log('=====================')

      return dataToSave
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred'
      console.error('Error saving onboarding data:', errorMessage)
      return rejectWithValue(errorMessage)
    }
  },
)

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
      if (state.currentStep < state.totalSteps) state.currentStep += 1
    },
    prevStep: (state) => {
      if (state.currentStep > 0) state.currentStep -= 1
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
  extraReducers: (builder) => {
    builder
      .addCase(saveOnboardingData.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(saveOnboardingData.fulfilled, (state) => {
        state.isLoading = false
        state.isCompleted = true
        state.error = null
      })
      .addCase(saveOnboardingData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
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
