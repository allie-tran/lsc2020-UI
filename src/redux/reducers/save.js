import {
    SAVE_SCENE,
    REMOVE_SCENE
} from '../actions/save'

const initialState = {
    saved: [['Thumbnail1', 'img1', 'img2'],
    ['Thumbnail2', 'img1', 'img2'],
    ['Thumbnail3', 'img1', 'img2'],
    ['Thumbnail4', 'img1', 'img2'],
    ['Thumbnail5', 'img1', 'img2']]
};
export default function (state = initialState, action) {
    if (action.type === SAVE_SCENE) {
        return {
            ...state,
            saved: [...state.saved, action.scene]
        }
    }
    else if (action.type === REMOVE_SCENE) {
        return {
            ...state,
            saved: [...state.saved.slice(0, action.sceneId),
            ...state.saved.slice(action.sceneId + 1)]
        }
    }
    return state
}
