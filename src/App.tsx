import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Unstable_Grid2';
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import React, { useEffect, useState, useTransition } from 'react';
import axios from 'axios';
import moment from 'moment';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Css } from '@mui/icons-material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#5780a9',
        },
        secondary: {
            main: '#606060',
        },
    },
});

type Gust = {
    key: string,
    title: string,
    created_at: GustTimestamp,
    accessed: number,
    starred: number,
}

type GustTimestamp = {
    secs_since_epoch: number
    nanos_since_epoch: number
}

type GustCollection = Gust[]

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router />
        </ThemeProvider>
    );
}

type NavProps = {
    currentPage: string
}

function Navigation(props: NavProps) {
    console.log(`current page: ${props.currentPage}`)

    return (
        <React.Fragment>
            <AppBar position="sticky">
                <Toolbar> {/* Display a Toolbar at the top */}
                    <Typography
                        variant='h6'
                        component='a'
                        href='/'
                        sx={{
                            mr: 2,
                            display: { xs: 'flex' },
                            fontFamily: 'Roboto',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            textAlign: 'center',
                        }}
                    >
                        Gust
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </React.Fragment>
    );
}

function Main() {
    const [gusts, setGusts] = useState<GustCollection>([])

    useEffect(() => {
        axios.get("http://localhost:3000")
            .then((response) => {
                setGusts(response.data as GustCollection)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, [])


    return (
        <div>
            <Grid container>
                <Grid sm={12} md={6} mdOffset={3}>
                    <GustList list={gusts} />
                </Grid>
            </Grid>
        </div>
    )
}

type GustListProps = {
    list: GustCollection
}

function GustList(props: GustListProps) {
    const navigate = (url: string) => {
        window.history.pushState({}, "", url);
        const navigationEvent = new PopStateEvent("navigate");
        window.dispatchEvent(navigationEvent);
    }

    const listItems = props.list.map(gust => {
        const created_at = moment.unix(gust.created_at.secs_since_epoch).format("dddd, MMMM Do YYYY, h:mm:ss a");
        const secondary = `Created at ${created_at} | Read ${gust.accessed} times | Starred ${gust.starred} times`;
        const url = `http://localhost:5173/g/${gust.key}`

        return (
            <ListItem key={gust.key} onClick={() => navigate(url)} sx={{
                cursor: 'pointer',
                ":hover": {
                    backgroundColor: theme.palette.grey["200"]
                }
            }}>
                <ListItemText primary={gust.title} secondary={secondary} />
            </ListItem>
        )
    })

    return (
        <List>{listItems}</List>
    )
}

function Router() {
    const [page, setPage] = useState(window.location.pathname);

    useEffect(() => {
        const onLocationChange = () => {
            setPage(window.location.pathname);
        }
        window.addEventListener("navigate", onLocationChange);
        return () => window.removeEventListener("navigate", onLocationChange);
    });

    let content = <NotFound page={page} />
    if (page == "/") {
        content = <Main />
    }

    return (
        <div>
            <Navigation currentPage={page} />
            {content}
        </div>
    )
}

type NotFoundProps = {
    page: string
}

function NotFound(props: NotFoundProps) {
    return (
        <div>
            <Grid container>
                <Grid sm={12} md={6} mdOffset={3}>
                    <Typography variant='h3'>404</Typography>
                    <Typography variant='subtitle1'>Page {props.page} not found</Typography>
                </Grid>
            </Grid>
        </div>
    )
}

function GustLink() {
    return (
        <a href='#'>test</a>
    )
}

export default App