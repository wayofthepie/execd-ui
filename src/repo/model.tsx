export interface Repository {
  name: string,
  branches: BranchDetails[]
}

export interface BranchDetails {
  name: string;
  status: Status;
}

export enum Status {
  Succeeded,
  InProgress,
  Failed
}