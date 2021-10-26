import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import IconButton from '@material-ui/core/IconButton';
import LazyLoad from 'react-lazy-load';
import { saveScene } from '../redux/actions/save'
import { submitImage } from '../redux/actions/submit'

const IMAGE_WIDTH = 1024;
const IMAGE_HEIGHT = 768;
const RESIZE_FACTOR = 6;

const imageStyles = makeStyles((theme) => ({
	image: {
		width: (props) => IMAGE_WIDTH / RESIZE_FACTOR * props.scale * window.innerWidth / 1920,
		height: (props) => IMAGE_HEIGHT / RESIZE_FACTOR * props.scale * window.innerWidth / 1920,
		borderRadius: 2,
		flexShrink: 0,
		marginTop: 0,
		marginBottom: 10,
		position: 'relative',
		border: '1px solid #E6E6E6'
	},
	card: {
		width: (props) => IMAGE_WIDTH / RESIZE_FACTOR * props.scale * window.innerWidth / 1920,
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
		marginTop: 10,
		marginBottom: 0,
		marginLeft: 4,
		marginRight: 4
	},
	grid: {
		overflow: 'scroll'
	},
	saveButton: {
		position: 'absolute',
		left: (props) => IMAGE_WIDTH / RESIZE_FACTOR * props.scale * window.innerWidth / 1920 - 25,
		top: (props) => IMAGE_HEIGHT / RESIZE_FACTOR * props.scale * window.innerWidth / 1920 - 50,
		color: '#fff',
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		borderRadius: 3,
		'&:hover': {
			backgroundColor: '#FF6584'
		},
		zIndex: (props) => (props.highlight ? 2 : 1),
		visibility: (props) => (props.hidden ? 'hidden' : 'visible'),
		padding: 0
	},
    similarButton: {
		position: 'absolute',
		left: (props) => IMAGE_WIDTH / RESIZE_FACTOR * props.scale * window.innerWidth / 1920 - 25,
		top: (props) => IMAGE_HEIGHT / RESIZE_FACTOR * props.scale * window.innerWidth / 1920 - 75,
		color: '#fff',
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		borderRadius: 3,
		'&:hover': {
			backgroundColor: '#FF6584'
		},
		zIndex: (props) => (props.highlight ? 2 : 1),
		visibility: (props) => (props.hidden ? 'hidden' : 'visible'),
		padding: 0
	},
	submitButton: {
		position: 'absolute',
		left: (props) => IMAGE_WIDTH / RESIZE_FACTOR * props.scale  * window.innerWidth / 1920- 25,
		top: (props) => IMAGE_HEIGHT / RESIZE_FACTOR * props.scale * window.innerWidth / 1920 - 25,
		color: '#fff',
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		borderRadius: 3,
		'&:hover': {
			backgroundColor: '#FF6584'
		},
		zIndex: (props) => (props.highlight ? 2 : 1),
		visibility: (props) => (props.hidden ? 'hidden' : 'visible'),
        padding: 0
	},
    timeButton: {
		position: 'absolute',
		left: (props) => IMAGE_WIDTH / RESIZE_FACTOR * props.scale * window.innerWidth / 1920 - 25,
		top: (props) => IMAGE_HEIGHT / RESIZE_FACTOR * props.scale * window.innerWidth / 1920 - 75,
		color: '#fff',
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		borderRadius: 3,
		'&:hover': {
			backgroundColor: '#FF6584'
		},
		zIndex: (props) => (props.highlight ? 2 : 1),
		visibility: (props) => (props.hidden ? 'hidden' : 'visible'),
		padding: 0
	},
	info: {
        color: (props) => (props.scale < 1? '#ccc': '#eee'),
        fontSize: (props) => (props.scale<1? 13:16),
		paddingLeft: 5,
        whiteSpace: "pre-wrap",
	}
}));

const areEqual = (prevProps, nextProps) => {
	return (
		prevProps.image === nextProps.image &&
		prevProps.scale === nextProps.scale &&
		prevProps.info === nextProps.info &&
        prevProps.onClick === nextProps.onClick
	);
};

const Image = ({ image, scale, info, onClick, openEvent, similar }) => {
		const classes = imageStyles({ scale });
		const ownOnClick = () => onClick === undefined ? null : onClick(image);
        const dispatch = useDispatch()
		return (
			<div className={classes.card}>
				<LazyLoad
					height={IMAGE_HEIGHT/ RESIZE_FACTOR * scale * window.innerWidth / 1920}
                    width={IMAGE_WIDTH / RESIZE_FACTOR * scale * window.innerWidth / 1920}
					offsetHorizontal={500}
                    debounce={false}
				>
					<img
						alt={image}
						src={'http://lifeseeker-sv.computing.dcu.ie/' + image.split('.')[0] + '.webp'}
						className={classes.image}
						onClick={ownOnClick}
					/>
				</LazyLoad>
				<IconButton onClick={() => dispatch(saveScene([ image ]))} className={classes.saveButton}>
					<BookmarkBorderRoundedIcon fontSize="small" />
				</IconButton>
                {!similar &&
                    <IconButton onClick={(e) => openEvent(e, true, [ image ], 'current')} className={classes.similarButton}>
                        <ImageSearchIcon fontSize="small" />
                    </IconButton>
                }
                {similar && (
					<IconButton
						onClick={(e) => openEvent(e, false, [ image ], 'current')}
						className={classes.timeButton}
					>
						<AccessTimeIcon fontSize="small" />
					</IconButton>
				)}
                <IconButton onClick={() => dispatch(submitImage(image))} className={classes.submitButton}>
					<CheckRoundedIcon fontSize="small" />
				</IconButton>
				{info && <Typography className={classes.info}>{info}</Typography>}
			</div>
		);
	}

Image.whyDidYouRender = true;
export default memo(Image, areEqual);
