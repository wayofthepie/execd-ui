import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchRepos } from './action';
import { Repository } from './model';
import { RepoAction } from './reducer';
import { RepoGrid } from './repo-grid.component';

interface Props {
  repositories: Repository[],
  error?: string
}

interface DispatchProps {
  fetchRepos: typeof fetchRepos
}

const mapStateToProps = (state: any) => {
  // tslint:disable-next-line:no-console
  console.log(state)
  return {
    error: state.fetchRepositories.error,
    repositories: state.fetchRepositories.repositories
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RepoAction>) => {
  return {
    fetchRepos: () => dispatch(fetchRepos()),
  };
};

export const RepoGridContainer = connect(mapStateToProps, mapDispatchToProps)(
  class extends React.Component<Props & DispatchProps, {}> {
    constructor(props: Props & DispatchProps) {
      super(props)
    }

    public componentDidMount() {
      this.props.fetchRepos()
    }

    public render() {
      return this.props.error !== undefined
        ? <div style={{ marginTop: "100px" }}>{this.props.error}</div>
        : <RepoGrid repositories={this.props.repositories} />
    }
  }
)
