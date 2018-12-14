import { Card, CardContent, Chip, createStyles, Divider, Grid, IconButton, LinearProgress, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import ErrorIcon from '@material-ui/icons/Error';
import HistoryIcon from '@material-ui/icons/HistoryOutlined';

import * as React from 'react';
import { BranchDetails, Status } from './../model';

const styles = (theme: Theme) => createStyles({
  cardAction: { marginTop: "-8px" },
  divider: { marginTop: "2px", marginBottom: "15px" },
  root: { marginTop: "" },
});

interface Props extends WithStyles<typeof styles> {
  repoName: string,
  branchStats: BranchDetails[],
  onChipClick?: (repoName: string, branchName: string) => void
}

export const RepoCard = withStyles(styles)(({ repoName, branchStats, classes }: Props) => {
  const statsId = `${repoName}-stats`;
  return <Card>
    <CardContent>
      <Grid container={true} alignContent="space-between" justify="space-between">
        <Grid item={true} xs={10}>
          <Typography
            color={"textSecondary"}
            variant="h6"
          >
            {repoName}
          </Typography>
        </Grid>
        <Grid item={true} xs={2} className={classes.cardAction}>
          <IconButton >
            <HistoryIcon />
          </IconButton>
        </Grid>
      </Grid>
      <div id={statsId}>
        {branchStats.length > 0 ? renderBranches(repoName, branchStats, classes) : null}
      </div>
    </CardContent>
  </Card>
});

const errorIcon = <ErrorIcon style={{ color: red[400] }} />
const inProgressIcon = <LinearProgress />

const renderBranches = (
  repoName: string,
  branchStats: BranchDetails[],
  classes: Record<"divider", string>
) => <React.Fragment>
    <Divider className={classes.divider} />
    {branchStats
      .filter(stats => stats.status !== Status.Succeeded)
      .map(stats => {
        const avatarIcon = stats.status === Status.Failed ? errorIcon : undefined;
        const progressBar = stats.status === Status.InProgress ? inProgressIcon : null;
        return <Chip
          key={`${repoName}-${stats.name}`}
          variant="outlined"
          avatar={avatarIcon}
          label={<div>
            <Typography color="textPrimary">
              {stats.name}
            </Typography>
            {progressBar}
          </div>
          }
          clickable={true}
        />
      })}
  </React.Fragment>
