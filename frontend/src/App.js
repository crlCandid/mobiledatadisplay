import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import * as Components from './components';

const theme = createTheme({
  spacing:8,
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<Components.Login />} />
          <Route path='/app' element={<Components.Navbar />} >
            <Route path='' element={<Components.Main />} />
            <Route path='reports' element={<Components.Reports.Main />} />
            <Route path='areas' element={<Components.Areas.Main />} />
            <Route path='users' element={<Components.Users.Main />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;