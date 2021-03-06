import React from 'react'
import FilledInput from '@material-ui/core/FilledInput';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    searchContainer: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: 100,
        "& p": {
            color: "#F4CDD2",
            padding: 5
        }
    },
    searchBar: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: props => props.type === "Find:" ? "100%" : "55%",
        height: 40,
        backgroundColor: "#3B3B3B",
        borderRadius: "15px"
    },
    timeBar: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 50,
        height: 40,
        backgroundColor: "#3B3B3B",
        borderRadius: "15px"
    },
    input: {
        padding: 15,
        color: "#CCCCCC",
    }
}));

const SearchBar = ({ open, type, submitQuery }) => {
    const classes = useStyles({ type, open });

    const keyPressed = event => {
        if (event.key === "Enter")
            submitQuery();
    };

    const Time = () => {
        if (type !== "Find:") {
            return ([
                <Typography>when</Typography>,
                <FilledInput id={type + "-when"}
                    variant="filled"
                    className={classes.timeBar}
                    disableUnderline={true}
                    inputProps={{
                        className: classes.input
                    }
                    }
                    onKeyDown={keyPressed}
                    placeholder="1h"
                />]
            )
        }
        return null
    };

    return (
        <div className={classes.searchContainer}>
            <Typography>{type}</Typography>
            <FilledInput id={type}
                variant="filled"
                autoFocus={type === "Find:"}
                className={classes.searchBar}
                disableUnderline={true}
                inputProps={{ className: classes.input }}
                onKeyDown={keyPressed}
            />
            <Time />
        </div>
    )
};

export default SearchBar;
