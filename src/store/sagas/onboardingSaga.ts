import { takeEvery, put, select, call } from 'redux-saga/effects'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FormattedOnboardingData, RootState, SagaEffect } from '../../types'
import { STORAGE_KEYS, REDUX_ACTIONS } from '../../constants'
import {
  formatOnboardingData,
  setCompleted,
  setError,
  setLoading,
} from '../slices/onboardingSlice'

function* loadOnboardingDataSaga(): Generator<unknown, void, string | null> {
  try {
    const data: string | null = yield call(
      AsyncStorage.getItem,
      STORAGE_KEYS.ONBOARDING_DATA,
    )
    if (data) {
      const parsedData: FormattedOnboardingData = JSON.parse(data)
      console.log('Loaded onboarding data:', parsedData)
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Error loading onboarding data:', errorMessage)
  }
}

function* saveOnboardingDataSaga(): Generator<unknown, void, RootState> {
  try {
    yield put(setLoading(true))
    const state: RootState = yield select((state: RootState) => state)

    const dataToSave = formatOnboardingData(state.onboarding)

    yield call(
      AsyncStorage.setItem,
      STORAGE_KEYS.ONBOARDING_DATA,
      JSON.stringify(dataToSave),
    )

    // Print to console as required
    console.log('=== ONBOARDING DATA ===')
    console.log(JSON.stringify(dataToSave, null, 2))
    console.log('=====================')

    yield put(setCompleted(true))
    yield put(setLoading(false))
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Error saving onboarding data:', errorMessage)
    yield put(setError(errorMessage))
    yield put(setLoading(false))
  }
}

export function* onboardingSaga(): Generator<unknown, void, unknown> {
  yield takeEvery(REDUX_ACTIONS.ONBOARDING_SAVE_DATA, saveOnboardingDataSaga)
  yield takeEvery(REDUX_ACTIONS.ONBOARDING_LOAD_DATA, loadOnboardingDataSaga)
}
