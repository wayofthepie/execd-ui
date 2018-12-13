import { createStyles, Grid, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { isUndefined } from 'util';
import { RepoCard } from './card/repo-card.component';
import { Repository } from './model';

const styles = (theme: Theme) => createStyles({
  gridContainer: { width: "80%", margin: "auto", marginTop: "100px" }
})

interface Props extends WithStyles<typeof styles> {
  repositories?: Repository[]
}

export const RepoGrid = withStyles(styles)((props: Props) =>
  isUndefined(props.repositories) || props.repositories.length === 0
    ? <div>Empty</div>
    : renderRepositories(props.repositories, props.classes)
)

const renderRepositories = (repositories: Repository[], classes: Record<"gridContainer", string>) =>
  <Grid direction="row" container={true} spacing={8} className={classes.gridContainer} >
    {repositories.map((repo, index) =>
      <Grid key={`${repo.name}-${index}`} item={true} xs={12} sm={12} md={6} lg={4} >
        <RepoCard branchStats={repo.branches} repoName={repo.name} />
      </Grid>
    )}
  </Grid >

