import {useState, useEffect} from 'react';
import axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import GustList from './GustList';

function Index() {
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

export default Index;