import {
	DELETE_LINK, 
	CHOOSE_EMOJI, 
	BACK_PROJECT_LIST, 
	SHOW_PROJECT, 
	ARCHIVE_PROJECT, 
	CHOOSE_PROJECT,
	SET_STATE
} from '../constants';

export function chooseProject({ projectId }) {
	return {
		type: CHOOSE_PROJECT,
		projectId
	};
}

export function setState( state ) {
	return { 
		type: SET_STATE,
		state
	};
}

export function archiveProject({ projectId }) {
	return {
		type: ARCHIVE_PROJECT,
		projectId
	};
}

export function showProject({ projectId }) {
	console.log('in action', projectId);
	return {
		type: SHOW_PROJECT,
		projectId
	};
}

export function backProjectList() {
	return { type: BACK_PROJECT_LIST };
}

export function chooseEmoji({ emoji }) {
	return {
		type: CHOOSE_EMOJI,
		emoji
	};
}

export function deleteLink({ linkId, projectId }) {
	return {
		type: DELETE_LINK,
		linkId,
		projectId
	};
}