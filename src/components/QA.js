import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import FilledInput from "@material-ui/core/FilledInput";
import Typography from "@material-ui/core/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { setTextAnswers, answerForScene } from "../redux/actions/qa";
import MouseTooltip from "react-sticky-mouse-tooltip";


const QAstyles = makeStyles((theme) => ({
  pane: {
    width: ({ isQuestion }) => (isQuestion ? "calc(15% - 10px)" : "0"),
    height: `calc(100% - 90px)`,
    position: "absolute",
    top: 90,
    left: 0,
    backgroundColor: "#272727",
    border: "5px solid #272727",
  },
  answer: {
    position: "absolute",
    bottom: 16,
    height: 48,
    width: "100%",
    zIndex: 5,
    color: "#eee",
    backgroundColor: "rgb(208 220 174)",
  },
  input: {
    padding: 15,
    color: "#000",
  },
  info: {
    padding: 10,
    color: "#CCCCCC",
  },
  mouse: {
    backgroundColor: "rgba(208 220 174 50)",
    color: "#fff",
    padding: 15,
  },
}));

const QAPane = ({ isQuestion, changeQuestion }) => {
  const classes = QAstyles({ isQuestion });
  const texts = useSelector((state) => state.qa.texts);
  const dispatch = useDispatch();
  const answerSceneResponse = useSelector(
    (state) => state.qa.answerSceneResponse
  );
  const [isMouseTooltipVisible, setMouseTooltipVisible] = useState(false);

  const toggleMouseTooltip = (value) => {
    setMouseTooltipVisible(value);
  };

  const copyText = (value) => {
    document.getElementById("answer").value = value;
    navigator.clipboard.writeText(value);
    toggleMouseTooltip(true);
    setTimeout(function () {
        toggleMouseTooltip(false);
    }, 2000);
    }

  useEffect(
    () => {
      if (answerSceneResponse) {
        answerSceneResponse.then((res) => {
          if (res.data.texts) {
            dispatch(setTextAnswers(res.data.texts));
          }
        });
      }
    }, // eslint-disable-next-line
    [answerSceneResponse]
  );

  return (
    <div className={classes.pane}>
      {isQuestion ? (
        <Typography className={classes.info}>
          Here are some possible answers:
        </Typography>
      ) : null}
      {isQuestion ? (
        <List>
          {texts
            ? texts.map((answer, id) => (
                <ListItem disablePadding>
                  <ListItemButton dense onClick={() => copyText(answer)}>
                    <ListItemText className={classes.info} primary={answer} />
                  </ListItemButton>
                </ListItem>
              ))
            : null}
        </List>
      ) : null}
      <FilledInput
        className={classes.answer}
        id={"answer"}
        placeholder="Submit Answer!"
        variant="filled"
        disableUnderline={true}
        inputProps={{ className: classes.input }}
        // onKeyDown={keyPressed}
      />
      {/* <MouseTooltip visible={isMouseTooltipVisible} offsetX={15} offsetY={10}>
        <div className={classes.mouse}>Copied!</div>
      </MouseTooltip> */}
    </div>
  );
};

export default QAPane;
