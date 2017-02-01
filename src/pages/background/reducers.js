import {combineReducers} from 'redux';
import { Map } from 'immutable';
import _ from 'lodash';

import {
	PROJECT_ARCHIVE,
	DELETE_LINK, 
	CHOOSE_EMOJI, 
	BACK_PROJECT_LIST, 
	SHOW_PROJECT, 
	ARCHIVE_PROJECT, 
	CHOOSE_PROJECT,
	SET_STATE
} from '../constants';

function findProjectIndex(state, projectId) {
	return _.findIndex(state.projects, function(o) { return o.id == projectId; })
}

function findLinkIndex(state, projectIndex, linkId){
	return state.get('projects').get(projectIndex).get('links').findIndex(
		(link) => link.get('id') === linkId
	);
}

function deleteLink( state, linkId, projectId ) {
	const projectIndex = findProjectIndex(state, projectId);
	const deletedLinks = _.chain(state).get(`projects[${projectIndex}].links`).remove(n => { return n.id !== linkId }).value();
	return _.set(state, `projects[${projectIndex}].links`, deletedLinks);
}

export default function(state = {}, action) {
	switch (action.type) {
		case DELETE_LINK:
			return deleteLink(state, action.linkId, action.projectId);
		case CHOOSE_EMOJI:
			return {
				...state,
				detailEmoji: action.emoji
			};
		case BACK_PROJECT_LIST:
			return {
				...state,
				detailProjectId: 0,
				detailEmoji: ''
			};
		case SHOW_PROJECT:
			console.log('change project to show project with id:', action.projectId);
			return {
				...state,
				detailProjectId: action.projectId,
				detailEmoji: ''
			};
		case ARCHIVE_PROJECT:
			const projectIndex = findProjectIndex(state, action.projectId);
			return _.set(state, `projects[${projectIndex}].status`, PROJECT_ARCHIVE);
		case CHOOSE_PROJECT:
			return {
				...state,
				choosedProjectId: action.projectId === state.choosedProjectId ? 0 : action.projectId
			}
		case SET_STATE:
			return _.merge(state, action.state);
	}
	return state;
}

// state structure
// projects: List
// 		-->project: Map
// 		--> project: Map
// 				--> id: Int
// 				--> projectName: String
// 				--> status: String
// 				--> editing: Boolean
// 				--> emojis: Array
// 				--> links: List 
// 						--> link: Map
// 						--> link: Map
// 								--> id: Int
// 								--> linkUrl: String
// 								--> linkTitle: String
// 								--> iconUrl: String
// 								--> emoji: String
// detailProjectId: Int
// detailEmoji: String
// choosedProjectId : Int

// export default combineReducers({
// 	backgroundCounter: createCounterReducer(INCREMENT_BACKGROUND_COUNTER, DECREMENT_BACKGROUND_COUNTER),
// 	uiCounter: createCounterReducer(INCREMENT_UI_COUNTER, DECREMENT_UI_COUNTER)
// });