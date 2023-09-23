import {useState, useEffect} from 'react';
import axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

function ShowGust(props: ShowGustProps) {
    const [gust, setGust] = useState<GustContent | undefined>(undefined)

    useEffect(() => {
        axios.get(`http://localhost:3000/g/${props.gustKey}`)
            .then((response) => {
                setGust(response.data as GustContent)
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
                    {gust?.content}
                </Grid>
            </Grid>
        </div>
    )
}

export default ShowGust;