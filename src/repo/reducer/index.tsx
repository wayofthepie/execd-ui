import { ActionType, getType } from 'typesafe-actions';
import { Repository } from '../model';
import * as repo from './../action';

export type RepoAction = ActionType<typeof repo>;

export interface State {
  repositories: Repository[],
  error?: string
}

export const fetchRepositories = (state: State, action: RepoAction): State => {
  switch (action.type) {
    case getType(repo.fetchRepos):
      return state;
    case getType(repo.fetchReposFailure):
      return { ...state, error: action.payload }
    case getType(repo.fetchReposSuccess):
      return { ...state, repositories: action.payload, error: undefined }
    default:
      return { repositories: [], error: undefined }
  }
}