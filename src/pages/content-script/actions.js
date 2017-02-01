import {
	DELETE_LINK, 
	CHOOSE_EMOJI, 
	BACK_PROJECT_LIST, 
	SHOW_PROJECT, 
	ARCHIVE_PROJECT, 
	CHOOSE_PROJECT,
} from '../constants';

export function chooseProject(projectId) {
	return {
		type: CHOOSE_PROJECT,
		projectId
	};
}

export function archiveProject(projectId) {
	return {
		type: ARCHIVE_PROJECT,
		projectId
	};
}

export function showProject(projectId) {
	console.log('in action popup page', projectId);
	return {
		type: SHOW_PROJECT,
		projectId
	};
}

export function backProjectList() {
	return { type: BACK_PROJECT_LIST };
}

export function chooseEmoji(emoji) {
	return {
		type: CHOOSE_EMOJI,
		emoji
	};
}

export function deleteLink(linkId, projectId) {
	return {
		type: DELETE_LINK,
		linkId,
		projectId
	};
}