import './App.css';
import { Switch, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import WithAuth from './hoc/withAuth';
import WithUser from './hoc/withUser';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#ff4747',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
        <div className="App">
          <Switch>
          <Route exact path="/" render={() => (
                <WithAuth>
                  <HomePage/>
                </WithAuth>
              )} />
          <Route exact path="/login" render={() => (
              <WithUser>
                <LoginPage />
              </WithUser>
              )} />
          <Route exact path="/signup" render={() => (
                <WithUser>
                  <SignupPage/>
              </WithUser>
              )} />
          </Switch>
       </div>
    </ThemeProvider>
  );
}

export default App;
