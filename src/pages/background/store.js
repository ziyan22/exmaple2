import { createStore } from 'redux';
import { createBackgroundStore } from 'redux-webext';
import { CHOOSE_PROJECT, ARCHIVE_PROJECT, SHOW_PROJECT, BACK_PROJECT_LIST, CHOOSE_EMOJI, DELETE_LINK } from '../constants';
import reducer from './reducers';
import { chooseProject, archiveProject, showProject, backProjectList, chooseEmoji, deleteLink } from './actions';

const store = createStore(reducer);

export default createBackgroundStore({
    store,
    actions: {
        CHOOSE_PROJECT: chooseProject,
        ARCHIVE_PROJECT: archiveProject,
        SHOW_PROJECT: showProject,
        BACK_PROJECT_LIST: backProjectList,
        CHOOSE_EMOJI: chooseEmoji,
        DELETE_LINK: deleteLink
    }
});
