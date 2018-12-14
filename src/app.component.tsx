import { createMuiTheme, MuiThemeProvider, Theme } from "@material-ui/core/";
import { blue } from "@material-ui/core/colors";
import * as React from "react";
import CustomAppBar from './app-bar.component';
import "./app.css";
import { RepoGridContainer } from './repo/repo-grid.container';

const theme: Theme = createMuiTheme({
  palette: {
    primary: blue
  },
  typography: {
    useNextVariants: true
  }
});

const App = () => <MuiThemeProvider theme={theme}>
  <CustomAppBar />
  <RepoGridContainer />
</MuiThemeProvider>

export default App;
