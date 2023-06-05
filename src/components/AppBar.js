import React, { memo, useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
// import Button from '@material-ui/core/Button'
import SearchBar from "./SearchBar";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import Typography from '@material-ui/core/Typography';
import LoginIcon from "@mui/icons-material/Login";
import { login } from "../redux/actions/submit";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import TextField from "@mui/material/TextField";
import Button from "@material-ui/core/Button";

import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'fixed',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        width: "100%",
        height: 60,
        backgroundColor: "#212121",
        top: 0, left: 0,
        zIndex: 4
    },
    appBar2: {
    position: "fixed",
    width: ({open}) => (open ? "82.5%" : "100%"),
    height: 42,
    backgroundColor: "rgba(0,0,0,0)",
    top: 60,
    left: 0,
    zIndex: 3,
    boxShadow: "none",
    },
    realSpace: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        height: 42,
        zIndex: 1,
    },
    icon: {
        padding: 10,
        marginRight: 10,
        backgroundColor: "#FF6584",
    },
    text: {
        marginLeft: 5,
        marginRight: 5,
        cursor: "default",
    flexShrink: 0,
  },
  button: {
    color: "#000000",
    }
}));
var isEqual = require("lodash.isequal");

const Bar = memo( function Bar({ open, submitQuery, isQuestion, changeQuestion}) {
    const classes = useStyles({ open, isQuestion });
    const [openLogin, setOpenLogin] = useState(false);
    const [sessionID, setSessionID] = useState("vbs");
    const inputRef = useRef(null);
    const dispatch = useDispatch();

    const handleClickOpen = () => {
      setOpenLogin(true);
    };

    const handleClose = () => {
      setOpenLogin(false);
    };
    
    const visualisation = useSelector((state) =>
      state.search.info ? state.search.info.query_visualisation : null
    );
    const [chips, setChips] = useState(visualisation);

    const handleDelete = useCallback((indices, infoType, text) => {
        var input = inputRef.current;
        if (input) {
          switch (infoType) {
            case "LOCATION":
              input.value = input.value += " --disable-location " + text;
              break;
            case "REGION":
              input.value = input.value += " --disable-region " + text;
              break;
            case "WEEKDAY":
              input.value = input.value += " --disable-time " + text;
              break;
          }
          input.scrollTo(input.scrollWidth, 0);
          // remove chips[index1][index2]
          var newChips = [...chips];
          newChips[indices[0]][1] = newChips[indices[0]][1].filter(
            (_, i) => i !== indices[1]
          );
          console.log("set chips")
          setChips(newChips);
        }
    }, [chips]);

    

    useEffect(() => {
        setChips(visualisation);
    }, [visualisation]);

    return (
        <span>
        <AppBar key="1" className={classes.appBar}>
            <SearchBar type="Before:" submitQuery={submitQuery} />
          <SearchBar
            inputRef={inputRef}
            type="Find:"
            submitQuery={submitQuery}
          />
            <SearchBar type="After:" submitQuery={submitQuery} />
            <Tooltip title="Clear All" arrow>
                <span>
                <IconButton size="small" className={classes.icon} onClick={() => {window.location.reload();return false}}>
                    <RefreshIcon />
                </IconButton>
                </span>
            </Tooltip>
            <Tooltip title="Login" arrow>
                <span>
              <IconButton
                size="small"
                className={classes.icon}
                onClick={handleClickOpen}
              >
                    <LoginIcon />
                </IconButton>
                </span>
            </Tooltip>
            <Tooltip title="Search" arrow>
                <span>
              <IconButton
                size="small"
                className={classes.icon}
                onClick={() => submitQuery(false, 0, false)}
              >
                    <SearchIcon />
                </IconButton>
                </span>
            </Tooltip>
        </AppBar>
        <AppBar key="2" className={classes.appBar2}>
            <div className={classes.realSpace}>
            {chips
              ? chips.map((text, index) =>
                  text[1]? text[1].map((text2, index2) => (
                    <Chip
                      key={text[0] + ": " + text2}
                      label={text[0] + ": " + text2}
                      clickable={false}
                      variant="outlined"
                      className={classes.text}
                      color="info"
                      onDelete={
                        ["LOCATION", "REGION", "WEEKDAY"].includes(text[0])
                          ? () => handleDelete([index, index2], text[0], text2)
                          : undefined
                }
                    />
                  )): null
                )
              : null}
            </div>
        </AppBar>
        <Dialog open={openLogin} onClose={handleClose}>
          <DialogTitle>Log In</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="login"
              label="session_id"
              variant="standard"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSessionID(event.target.value);
              }}
              value={sessionID}
            />
          </DialogContent>
          <DialogActions>
            <Button className={classes.button} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              className={classes.button}
              onClick={() => {
                handleClose();
                dispatch(login(sessionID));
              }}
            >
              Log In
            </Button>
          </DialogActions>
        </Dialog>
        </span>
    );
}, (prevProps, nextProps) => {
    return prevProps.open === nextProps.open &&
    isEqual(prevProps.chips, nextProps.chips) &&
    isEqual(prevProps.visualisation, nextProps.visualisation)
});

Bar.whyDidYouRender = true

export default Bar;
