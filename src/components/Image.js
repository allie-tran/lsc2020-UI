import React, { memo, useState } from 'react';
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
        border: (props) => props.highlight ? '2px solid #FF6584': props.dark? '1px solid black': '1px solid #E6E6E6',
        transition: 'all 100ms ease-in',
	},
	card: {
		width: (props) => IMAGE_WIDTH / RESIZE_FACTOR * props.scale * window.innerWidth / 1920,
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
		marginTop: 10,
		marginBottom: 0,
		marginLeft: 4,
		marginRight: 4,
        transition: 'all 100ms ease-in',
        transformOrigin: 'top left',
        "&:hover, &:focus": {
            transform: (props) => props.zoomed? 'scale(2.5)':  'scale(1.0)',
            zIndex: 10000,
            "& $info": {
                display: (props) => props.zoomed? "none" : ""
            }
        }
	},
	grid: {
		overflow: 'scroll'
	},
	saveButton: {
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
    zoomButton: {
		position: 'absolute',
		left: (props) => IMAGE_WIDTH / RESIZE_FACTOR * props.scale * window.innerWidth / 1920 - 25,
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
	submitButton: {
		position: 'absolute',
		left: (props) => IMAGE_WIDTH / RESIZE_FACTOR * props.scale  * window.innerWidth / 1920- 25,
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
	info: {
        color: (props) => (props.scale > 1? '#eee': props.dark? '#444':'#ccc'),
        fontSize: (props) => (props.scale>1? 16:13),
		paddingLeft: 5,
        paddingTop: 2,
        whiteSpace: "pre-wrap",
	}
}));

const areEqual = (prevProps, nextProps) => {
	return (
		prevProps.image === nextProps.image &&
		prevProps.scale === nextProps.scale &&
		prevProps.info === nextProps.info &&
        prevProps.highlight === nextProps.highlight
	);
};

const Image = ({ image, scale, info, onClick, openEvent, zoomed, disableLazyLoad, highlight, dark}) => {
    const [zoom, setZoom] = useState(false);
    const classes = imageStyles({ scale, highlight, zoomed: zoom, dark});
    const ownOnClick = () => onClick === undefined ? null : onClick(image);
    const dispatch = useDispatch()
    return (
        <div onMouseLeave={() => setZoom(false)}
             className={classes.card}>
            {disableLazyLoad? <img
                    alt={image}
                    src={'http://localhost:8001/' + image}
                    className={classes.image}
                    onClick={ownOnClick}
                />:
                <LazyLoad
                height={IMAGE_HEIGHT/ RESIZE_FACTOR * scale * window.innerWidth / 1920}
                width={IMAGE_WIDTH / RESIZE_FACTOR * scale * window.innerWidth / 1920}
                offsetHorizontal={500}
                debounce={false}
            >
                <img
                    alt={image}
                    src={'http://localhost:8001/' + image}
                    className={classes.image}
                    onClick={ownOnClick}
                />
            </LazyLoad>}
            <IconButton onMouseEnter={() => setZoom(true)}
                        className={classes.zoomButton}>
                <ImageSearchIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => dispatch(saveScene([ image ]))} className={classes.saveButton}>
                <BookmarkBorderRoundedIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => dispatch(submitImage(image))} className={classes.submitButton}>
                <CheckRoundedIcon fontSize="small" />
            </IconButton>
            {info && <Typography className={classes.info}>{info}</Typography>}
        </div>
    );
}

Image.whyDidYouRender = true;
export default memo(Image, areEqual);
