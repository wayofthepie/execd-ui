import { createMuiTheme, createStyles, MuiThemeProvider, Theme, withStyles, WithStyles } from "@material-ui/core/";
import { blue } from "@material-ui/core/colors";
import { fade } from '@material-ui/core/styles/colorManipulator';
import * as React from "react";
import CustomAppBar from './app-bar.component';
import "./app.css";
import { Repository, Status } from './repo/model';
import { RepoGrid } from './repo/repo-grid.component';

const theme: Theme = createMuiTheme({
  palette: {
    primary: blue
  },
  typography: {
    useNextVariants: true
  }
});

const styles = (styleTheme: Theme) =>
  createStyles({
    inputInput: {
      paddingBottom: styleTheme.spacing.unit,
      paddingLeft: styleTheme.spacing.unit * 10,
      paddingRight: styleTheme.spacing.unit,
      paddingTop: styleTheme.spacing.unit,
      transition: styleTheme.transitions.create('width'),
      width: '100%',
      [styleTheme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    search: {
      '&:hover': {
        backgroundColor: fade(styleTheme.palette.common.white, 0.25),
      },
      backgroundColor: fade(styleTheme.palette.common.white, 0.15),
      borderRadius: styleTheme.shape.borderRadius,
      marginLeft: 0,
      marginRight: styleTheme.spacing.unit * 2,
      position: 'relative',
      width: '100%',
      [styleTheme.breakpoints.up('sm')]: {
        marginLeft: styleTheme.spacing.unit * 3,
        width: 'auto',
      },
    },
  });

// Some sample data for now
const masterStats = {
  name: "master",
  status: Status.InProgress
}

const repo: Repository = {
  branches: [masterStats],
  name: "test-repo"
}
// End sample data

const App = withStyles(styles)(
  class extends React.Component<Props> {
    public render() {
      return (
        <MuiThemeProvider theme={theme}>
          <div>
            <CustomAppBar />
            <RepoGrid repositories={[repo]} />
          </div>
        </MuiThemeProvider>
      );
    }
  });

interface Props extends WithStyles<typeof styles> { }

export default App;
