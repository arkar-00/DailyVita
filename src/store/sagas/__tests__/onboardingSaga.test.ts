import { expectSaga } from 'redux-saga-test-plan'
import { call, select, takeEvery } from 'redux-saga/effects'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  setCompleted,
  setError,
  setLoading,
  formatOnboardingData,
} from '../../slices/onboardingSlice'
import { REDUX_ACTIONS, STORAGE_KEYS } from '@/src/constants'
import { RootState } from '@/src/types'
import { loadOnboardingDataSaga, onboardingSaga, saveOnboardingDataSaga } from '../onboardingSaga'
import { throwError } from 'redux-saga-test-plan/providers'

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}))

describe('saveOnboardingDataSaga', () => {
  const mockState: RootState = {
    onboarding: {
      prioritizedConcerns: [{ id: 1, name: 'Sleep' }],
      selectedDiets: [],
      isDailyExposure: true,
      isSmoke: false,
      alcohol: '0-1',
      allergies: [],
      customAllergies: '',
      currentStep: 1,
      totalSteps: 5,
      healthConcerns: [],
      isLoading: false,
      error: null,
      isCompleted: false,
    },
  }

  it('should save data and dispatch success actions', () => {
    const formatted = formatOnboardingData(mockState.onboarding)
    return expectSaga(saveOnboardingDataSaga)
      .provide([
        [select(), mockState],
        [
          call(AsyncStorage.setItem, STORAGE_KEYS.ONBOARDING_DATA, JSON.stringify(formatted)),
          undefined,
        ],
      ])
      .put(setLoading(true))
      .put(setCompleted(true))
      .put(setLoading(false))
      .run()
  })

  it('should handle error if save fails', () => {
    const error = new Error('Save failed')

    return expectSaga(saveOnboardingDataSaga)
      .provide([
        [select(), { onboarding: mockState.onboarding }],
        [
          call(
            AsyncStorage.setItem,
            STORAGE_KEYS.ONBOARDING_DATA,
            JSON.stringify(formatOnboardingData(mockState.onboarding)),
          ),
          throwError(error),
        ],
      ])
      .put(setLoading(true))
      .put(setError('Save failed'))
      .put(setLoading(false))
      .run()
  })
})

describe('loadOnboardingDataSaga', () => {
  it('should load and parse saved onboarding data', () => {
    const saved = { alcohol: '0-1', timestamp: '2024-01-01' }

    return expectSaga(loadOnboardingDataSaga)
      .provide([[call(AsyncStorage.getItem, STORAGE_KEYS.ONBOARDING_DATA), JSON.stringify(saved)]])
      .run()
  })

  it('should handle error during load', () => {
    const error = new Error('Load failed')

    return expectSaga(loadOnboardingDataSaga)
      .provide([[call(AsyncStorage.getItem, STORAGE_KEYS.ONBOARDING_DATA), Promise.reject(error)]])
      .run()
  })
})

describe('onboardingSaga', () => {
  const generator = onboardingSaga()

  it('should watch for onboarding actions', () => {
    expect(generator.next().value).toEqual(
      takeEvery(REDUX_ACTIONS.ONBOARDING_SAVE_DATA, saveOnboardingDataSaga),
    )
    expect(generator.next().value).toEqual(
      takeEvery(REDUX_ACTIONS.ONBOARDING_LOAD_DATA, loadOnboardingDataSaga),
    )
    expect(generator.next().done).toBe(true)
  })
})
