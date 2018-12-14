import { combineReducers } from 'redux';

import { fetchRepositories } from './repo/reducer'

export const rootReducer = () => combineReducers({ fetchRepositories });