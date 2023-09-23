import Grid from '@mui/material/Unstable_Grid2';
import Typography from "@mui/material/Typography";

type NotFoundProps = {
    page: string
}

function NotFound(props: NotFoundProps) {
    return (
        <div>
            <Grid container>
                <Grid sm={12} md={6} mdOffset={3}>
                    <Typography variant='h2'>404</Typography>
                    <Typography variant='subtitle1'>Page {props.page} not found</Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default NotFound;