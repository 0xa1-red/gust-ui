import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

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
                            display: 'flex',
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

export default Navigation;