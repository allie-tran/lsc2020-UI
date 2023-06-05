import React, {memo, forwardRef} from 'react';
import FilledInput from '@material-ui/core/FilledInput';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	searchContainer: {
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: (props) => (props.type === 'Find:' ?  "100%" : "50%"),
        height: "100%",
		'& p': {
			color: '#F4CDD2',
			padding: 5
		},
	},
	searchBar: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: (props) => (props.type === 'Find:' ? "85%" : "50%"),
		height: 40,
		backgroundColor: '#3B3B3B',
		borderRadius: '15px'
	},
	timeBar: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 50,
		height: 40,
		backgroundColor: '#3B3B3B',
		borderRadius: '15px'
	},
	input: {
		padding: 15,
		color: '#CCCCCC'
	}
}));

const SearchBar = memo(forwardRef(function SearchBar({ inputRef, open, type, submitQuery, changeQuestion, isQuestion}) {
	const classes = useStyles({ type, open });
	const keyPressed = (event) => {
    if (event.key === "Enter") submitQuery(true, 0);
  };

   const handleBlur = () => {
     // Move the cursor to the end of the input text
     const input = inputRef.current;
     if (input) {
          input.scrollTo(input.scrollWidth, 0);
     }
	};

    const Time = () => {
            if (type !== 'Find:') {
                return [
                    <Typography key="text">when</Typography>,
                    <FilledInput
                        key="input"
                        id={type + '-when'}
                        variant="filled"
                        className={classes.timeBar}
                        disableUnderline={true}
                        inputProps={{
                            className: classes.input
                        }}
                        onKeyDown={keyPressed}
                        placeholder="1h"
                    />
                ];
            }
        return null;
    };

	return (
		<div className={classes.searchContainer}>
			<Typography>{type}</Typography>
			<FilledInput
				id={type}
				variant="filled"
                autoFocus={type === "Find:"}
				className={classes.searchBar}
				disableUnderline={true}
				inputProps={{ className: classes.input }}
				onKeyDown={keyPressed}
                inputRef={inputRef}
                onBlur={handleBlur}
			/>
			<Time type={type}/>
		</div>
	);
}));

SearchBar.whyDidYouRender = true;
export default SearchBar;
