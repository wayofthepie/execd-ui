
import { createStandardAction } from 'typesafe-actions';
import { Repository } from '../model';

export const fetchRepos = createStandardAction('repos/FETCH')<void, void>()
export const fetchReposSuccess = createStandardAction("repos/FETCH/SUCCESS")<Repository[]>()
export const fetchReposFailure = createStandardAction("repos/FETCH/FAILURE")<string>()