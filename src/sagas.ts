import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects'
import { watchFetchRepos } from "src/repo/sagas"

export default function* rootSaga(): SagaIterator {
  yield [fork(watchFetchRepos)]
}