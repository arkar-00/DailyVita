import { all, fork } from 'redux-saga/effects'
import { onboardingSaga } from './onboardingSaga'

export function* rootSaga() {
  yield all([fork(onboardingSaga)])
}
