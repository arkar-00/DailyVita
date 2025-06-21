import { takeEvery, put, select, call } from 'redux-saga/effects'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FormattedOnboardingData, SagaEffect } from '../../types'
import { STORAGE_KEYS, REDUX_ACTIONS } from '../../constants'

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

export function* onboardingSaga(): Generator<unknown, void, unknown> {
  yield takeEvery(REDUX_ACTIONS.ONBOARDING_LOAD_DATA, loadOnboardingDataSaga)
}
