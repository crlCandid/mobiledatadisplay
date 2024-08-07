import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import * as Components from './components';
import * as Consts from './utils/consts';

// import * as Testing from './components/utils/confirmation';

const theme = createTheme({
  spacing:8,
  palette: {
    primary: {
      main: Consts.Colors.Primary.Main,
    },
    secondary: {
      main: Consts.Colors.Secondary.Main,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* <Route path='/test' element={<Testing.ConfirmationDialog />} /> */}
          <Route path='/' element={<Components.Login />} />
          <Route path='/app' element={<Components.Navbar />} >
            <Route path='' element={<Components.Main />} />
            <Route path='reports' element={<Components.Reports.Main />} />
            <Route path='reports/detail/:id' element={<Components.Reports.Detail />} />
            <Route path='reports/crud' element={<Components.Reports.Crud />} />
            <Route path='areas' element={<Components.Areas.Main />} />
            <Route path='users' element={<Components.Users.Main />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;