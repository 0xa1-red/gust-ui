import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto-slab/400.css';
import '@fontsource/roboto-slab/700.css';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Router from './components/Router';

const theme = createTheme({
    palette: {
        primary: {
            main: '#5780a9',
        },
        secondary: {
            main: '#606060',
        },
    },
    typography: {
        body1: {
            fontFamily: 'Roboto Slab'
        },
        subtitle1: {
            fontFamily: 'Roboto Slab'
        },
        body2: {
            fontFamily: 'Roboto Slab'
        },
        subtitle2: {
            fontFamily: 'Roboto Slab'
        }
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router />
        </ThemeProvider>
    );
}

export default App