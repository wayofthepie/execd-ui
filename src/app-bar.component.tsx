import { AppBar, createStyles, Grid, InputBase, Theme, Toolbar, Typography, withStyles, WithStyles } from "@material-ui/core/";
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import * as React from "react";
import "./app.css";
// import execdLogo from './assets/execd.svg';

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
    searchIcon: {
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      pointerEvents: 'none',
      position: 'absolute',
      width: styleTheme.spacing.unit * 9,
    },
  });

// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(
//     applyMiddleware(sagaMiddleware)
// );

const CustomAppBar = withStyles(styles)(
  class extends React.Component<Props> {
    public render() {
      const { classes } = this.props;
      return (
        <div>
          <AppBar style={{ margin: 0 }} >
            <Toolbar>
              <Grid container={true}>
                <Grid item={true} xs={4}>
                  <Typography variant="h6" color="inherit">
                    Execd
                  </Typography>
                </Grid>
                <Grid item={true} xs={4}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      classes={{
                        input: classes.inputInput,
                        root: classes.inputRoot,
                      }}
                      placeholder="Search…"
                    />
                  </div>
                </Grid>
              </Grid>
            </Toolbar>

          </AppBar >
        </div >
      );
    }
  });

interface Props extends WithStyles<typeof styles> { }

export default CustomAppBar;