import moment from 'moment';

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

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
                    backgroundColor: 'InfoBackground'
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

export default GustList