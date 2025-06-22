import { takeEvery, put, select, call } from 'redux-saga/effects'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FormattedOnboardingData, RootState } from '../../types'
import { STORAGE_KEYS, REDUX_ACTIONS } from '../../constants'
import { formatOnboardingData, setCompleted, setError, setLoading } from '../slices/onboardingSlice'

export function* loadOnboardingDataSaga(): Generator {
  try {
    const data: string | null = yield call(AsyncStorage.getItem, STORAGE_KEYS.ONBOARDING_DATA)
    if (data) {
      const parsedData: FormattedOnboardingData = JSON.parse(data)
      console.log('Loaded onboarding data:', parsedData)
    }
  } catch (error: any) {
    const errorMessage = error?.message || 'Unknown error occurred'
    console.error('Error loading onboarding data:', errorMessage)
  }
}

export function* saveOnboardingDataSaga(): Generator {
  try {
    yield put(setLoading(true))
    const state: RootState = yield select()
    const dataToSave = formatOnboardingData(state.onboarding)

    yield call(AsyncStorage.setItem, STORAGE_KEYS.ONBOARDING_DATA, JSON.stringify(dataToSave))

    console.log('=== ONBOARDING DATA ===')
    console.log(JSON.stringify(dataToSave, null, 2))
    console.log('=====================')

    yield put(setCompleted(true))
  } catch (error: any) {
    const errorMessage = error?.message || 'Unknown error occurred'
    console.error('Error saving onboarding data:', errorMessage)
    yield put(setError(errorMessage))
  } finally {
    yield put(setLoading(false))
  }
}

export function* onboardingSaga(): Generator {
  yield takeEvery(REDUX_ACTIONS.ONBOARDING_SAVE_DATA, saveOnboardingDataSaga)
  yield takeEvery(REDUX_ACTIONS.ONBOARDING_LOAD_DATA, loadOnboardingDataSaga)
}
