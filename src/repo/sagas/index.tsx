import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects'
import { getType } from 'typesafe-actions';
import * as actions from "../action"
import * as client from "../client"

export function* watchFetchRepos(): SagaIterator {
  yield takeEvery(getType(actions.fetchRepos), fetchRepos)
}

export function* fetchRepos(): SagaIterator {
  try {
    const data = yield call(client.fetchRepos);
    yield put(actions.fetchReposSuccess(data));
  } catch (error) {
    yield put(actions.fetchReposFailure(error.message));
  }
}