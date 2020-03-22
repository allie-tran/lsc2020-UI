import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles'
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button"

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Image from '../redux/Image-cnt'

const popStyle = makeStyles(theme => ({
    detailed: {
        width: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#272727",
        flexDirection: "column",
        padding: 10
    },
    grid: {
        overflow: "scroll",
        padding: 10
    }
}));


const EventPopover = ({ group, closeEvent, getNextScenes, nextSceneRespone, position }) => {
    const classes = popStyle()
    const [nextScenes, setNextScenes] = useState([])
    const [currentDisplay, setCurrentDisplay] = useState(group)

    useEffect(()=>{
        nextSceneRespone.then(res => {
            setNextScenes(res.data.timeline);
        });
    }, [nextSceneRespone])

    return (
        <Paper elevation={4} className={classes.detailed}>
            <Typography variant="overline" color="#F4CDD2">
                Event images
                </Typography>
            <Grid wrap="nowrap" container spacing={2} className={classes.grid}>
                {currentDisplay.map(image => (
                    <Grid item>
                        <Image
                            className={classes.img}
                            image={image}
                            scale={4}
                            onEscapeKeyDown={closeEvent.bind(this)}
                            info
                        />
                    </Grid>
                ))}
            </Grid>
            {position==="before"? <Button onClick={() => getNextScenes(group, "before")}>Previous Events</Button> :
             position==="after"? <Button onClick={() => getNextScenes(group, "after")}>Next Events</Button> :
                                 <Button onClick={() => getNextScenes(group, "current")}>View Full Events</Button>}
            <Grid wrap="nowrap" container spacing={2} className={classes.grid}>
                {nextScenes.map(scene => (
                    <Grid item>
                        <Image
                            className={classes.img}
                            image={scene[0]}
                            scale={1}
                            onEscapeKeyDown={closeEvent.bind(this)}
                            onClick={() => {console.log('clicked'); setCurrentDisplay(scene)}}
                        />
                    </Grid>
                ))}
            </Grid>
        </Paper>)
}

export default EventPopover;
