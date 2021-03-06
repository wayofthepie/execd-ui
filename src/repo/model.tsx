export interface Repository {
  name: string,
  branches: BranchDetails[]
}

export interface BranchDetails {
  name: string;
  status: Status;
}

export enum Status {
  Succeeded = "succeeded",
  InProgress = "in-progress",
  Failed = "failed"
}