import {List, Map, fromJS} from 'immutable';
import _ from 'lodash';
import {expect} from 'chai';

import reducer from '../src/pages/background/reducers.js';
import { PROJECT_CURRENT, PROJECT_ARCHIVE } from '../src/pages/constants.js';
import {
	DELETE_LINK, 
	CHOOSE_EMOJI, 
	BACK_PROJECT_LIST, 
	SHOW_PROJECT, 
	ARCHIVE_PROJECT, 
	CHOOSE_PROJECT,
	SET_STATE
} from '../src/pages/constants.js';

describe('reducer', () => {
	it('handles SET_STATE with plain JS payload', () => {
		const initialState = {};
		const action = {
			type: 'SET_STATE',
			state: {
				projects: [
					{ id: 1, projectName: 'Buy a Car', status: PROJECT_CURRENT, editing: false, emojis: ['😀', '😫'], links: [] },
					{ id: 2, projectName: 'Rent A room', status: PROJECT_CURRENT, editing: false, emojis: [], links: [] }
				],
				detailProjectId: 0,
				detailEmoji: ''
			}
		};
		const nextState = reducer(initialState, action);
		expect(nextState).to.deep.equal({
			projects: [
				{ id: 1, projectName: 'Buy a Car', status: PROJECT_CURRENT, editing: false, emojis: ['😀', '😫'], links: [] },
				{ id: 2, projectName: 'Rent A room', status: PROJECT_CURRENT, editing: false, emojis: [], links: [] }
			],
			detailProjectId: 0,
			detailEmoji: ''
		});
	});

	it('handles SET_STATE without initial state', () => {
		const action = {
			type: 'SET_STATE',
			state: {
				projects: [
					{ id: 1, projectName: 'Buy a Car', status: PROJECT_CURRENT, editing: false, emojis: ['😀', '😫'], links: [] },
					{ id: 2, projectName: 'Rent A room', status: PROJECT_CURRENT, editing: false, emojis: [], links: [] }
				],
				detailProjectId: 0,
				detailEmoji: ''
			}
		};
		const nextState = reducer(undefined, action);
		expect(nextState).to.deep.equal({
			projects: [
				{ id: 1, projectName: 'Buy a Car', status: PROJECT_CURRENT, editing: false, emojis: ['😀', '😫'], links: [] },
				{ id: 2, projectName: 'Rent A room', status: PROJECT_CURRENT, editing: false, emojis: [], links: [] }
			],
			detailProjectId: 0,
			detailEmoji: ''
		});
	});

	it('handles BACK_PROJECT_LIST by changing the detailProjectId and detailEmoji', () => {
		const initialState = {
			projects: [
				{ id: 1, projectName: 'Buy a Car', status: PROJECT_CURRENT, editing: false, emojis: ['😀', '😫'], links: [] },
				{ id: 2, projectName: 'Rent A room', status: PROJECT_CURRENT, editing: false, emojis: [], links: [] }
			],
			detailProjectId: 1,
			detailEmoji: '😀'
		};
		const action = {
			type: BACK_PROJECT_LIST
		};
		const nextState = reducer(initialState, action);
		expect(nextState).to.deep.equal({
			projects: [
				{ id: 1, projectName: 'Buy a Car', status: PROJECT_CURRENT, editing: false, emojis: ['😀', '😫'], links: [] },
				{ id: 2, projectName: 'Rent A room', status: PROJECT_CURRENT, editing: false, emojis: [], links: [] }
			],
			detailProjectId: 0,
			detailEmoji: ''
		});
	});

	it('handles CHOOSE_EMOJI by changing the detailEmoji', () => {
		const initialState = {
			projects: [
				{ id: 1, projectName: 'Buy a Car', status: PROJECT_CURRENT, editing: false, emojis: ['😀', '😫'], links: [] },
				{ id: 2, projectName: 'Rent A room', status: PROJECT_CURRENT, editing: false, emojis: [], links: [] }
			],
			detailProjectId: 1,
			detailEmoji: '😀'
		};
		const action = {
			type: CHOOSE_EMOJI,
			emoji: '😫'
		}
		const nextState = reducer(initialState, action);
		expect(nextState).to.deep.equal({
			projects: [
				{ id: 1, projectName: 'Buy a Car', status: PROJECT_CURRENT, editing: false, emojis: ['😀', '😫'], links: [] },
				{ id: 2, projectName: 'Rent A room', status: PROJECT_CURRENT, editing: false, emojis: [], links: [] }
			],
			detailProjectId: 1,
			detailEmoji: '😫'
		});
	});

	it('handles SHOW_PROJECT by changing the detailEmoji', () => {
		const initialState = {
			projects: [
				{ id: 1, projectName: 'Buy a Car', status: PROJECT_CURRENT, editing: false, emojis: ['😀', '😫'], links: [] },
				{ id: 2, projectName: 'Rent A room', status: PROJECT_CURRENT, editing: false, emojis: [], links: [] }
			],
			detailProjectId: 0,
			detailEmoji: ''
		};
		const action = {
			type: SHOW_PROJECT,
			projectId: 2
		}
		const nextState = reducer(initialState, action);
		expect(nextState).to.deep.equal({
			projects: [
				{ id: 1, projectName: 'Buy a Car', status: PROJECT_CURRENT, editing: false, emojis: ['😀', '😫'], links: [] },
				{ id: 2, projectName: 'Rent A room', status: PROJECT_CURRENT, editing: false, emojis: [], links: [] }
			],
			detailProjectId: 2,
			detailEmoji: ''
		});
	});

	it('handles ARCHIVE_PROJECT by changing the status to PROJECT_ARCHIVE', () => {
		const initialState = {
			projects: [
				{ id: 1, projectName: 'Buy a Car', status: PROJECT_CURRENT, editing: false, emojis: ['😀', '😫'], links: [] },
				{ id: 2, projectName: 'Rent A room', status: PROJECT_CURRENT, editing: false, emojis: [], links: [] }
			],
			detailProjectId: 0,
			detailEmoji: ''
		};
		const action = {
			type: ARCHIVE_PROJECT,
			projectId: 1
		}
		const nextState = reducer(initialState, action);
		expect(nextState).to.deep.equal({
			projects: [
				{ id: 1, projectName: 'Buy a Car', status: PROJECT_ARCHIVE, editing: false, emojis: ['😀', '😫'], links: [] },
				{ id: 2, projectName: 'Rent A room', status: PROJECT_CURRENT, editing: false, emojis: [], links: [] }
			],
			detailProjectId: 0,
			detailEmoji: ''
		});
	});

	it('handles CHOOSE_PROJECT by changing the choosedProjectId, if choosedProjectId is the same with action.projectId, choosedProjectId change to 0', () => {
		const initialState = {
			projects: [
				{ id: 1, projectName: 'Buy a Car', status: PROJECT_CURRENT, editing: false, emojis: ['😀', '😫'], links: [] },
				{ id: 2, projectName: 'Rent A room', status: PROJECT_CURRENT, editing: false, emojis: [], links: [] }
			],
			detailProjectId: 0,
			detailEmoji: '',
			choosedProjectId: 1
		};
		const action = {
			type: CHOOSE_PROJECT,
			projectId: 1
		}
		const nextState = reducer(initialState, action);
		expect(nextState).to.deep.equal({
			projects: [
				{ id: 1, projectName: 'Buy a Car', status: PROJECT_CURRENT, editing: false, emojis: ['😀', '😫'], links: [] },
				{ id: 2, projectName: 'Rent A room', status: PROJECT_CURRENT, editing: false, emojis: [], links: [] }
			],
			detailProjectId: 0,
			detailEmoji: '',
			choosedProjectId: 0
		});
	});

	it('handles CHOOSE_PROJECT by changing the choosedProjectId, if choosedProjectId is not the same with action.projectId, choosedProjectId change to action.projectId', () => {
		const initialState = {
			projects: [
				{ id: 1, projectName: 'Buy a Car', status: PROJECT_CURRENT, editing: false, emojis: ['😀', '😫'], links: [] },
				{ id: 2, projectName: 'Rent A room', status: PROJECT_CURRENT, editing: false, emojis: [], links: [] }
			],
			detailProjectId: 0,
			detailEmoji: '',
			choosedProjectId: 2
		};
		const action = {
			type: CHOOSE_PROJECT,
			projectId: 1
		}
		const nextState = reducer(initialState, action);
		expect(nextState).to.deep.equal({
			projects: [
				{ id: 1, projectName: 'Buy a Car', status: PROJECT_CURRENT, editing: false, emojis: ['😀', '😫'], links: [] },
				{ id: 2, projectName: 'Rent A room', status: PROJECT_CURRENT, editing: false, emojis: [], links: [] }
			],
			detailProjectId: 0,
			detailEmoji: '',
			choosedProjectId: 1
		});
	});
	it('handles DELETE_LINK delete the link in given projectId', () => {
		const initialState = {
			projects: [
				{ id: 1, projectName: 'Buy a Car', status: PROJECT_CURRENT, editing: false, emojis: ['😀', '😫'], links: [
					{
						id: 1,
						linkUrl: 'https://github.com/enaqx/awesome-react#redux-tutorials',
						linkTitle: 'GitHub - awesome-react',
						iconUrl: 'linkUrl',
						emoji: '😀'
					},
					{
						id: 2,
						linkUrl: 'https://github.com/ivantsov/redux-webext',
						linkTitle: 'GitHub - redux-webext',
						iconUrl: 'linkUrl',
						emoji: '😫'
					}
				]},
				{ id: 2, projectName: 'Rent A room', status: PROJECT_CURRENT, editing: false, emojis: [], links: [] }
			],
			detailProjectId: 0,
			detailEmoji: '',
			choosedProjectId: 1
		};
		const action = {
			type: DELETE_LINK,
			linkId: 2,
			projectId: 1
		}
		const nextState = reducer(initialState, action);
		expect(nextState).to.deep.equal({
			projects: [
				{ id: 1, projectName: 'Buy a Car', status: PROJECT_CURRENT, editing: false, emojis: ['😀', '😫'], links: [
					{
						id: 1,
						linkUrl: 'https://github.com/enaqx/awesome-react#redux-tutorials',
						linkTitle: 'GitHub - awesome-react',
						iconUrl: 'linkUrl',
						emoji: '😀'
					}
				]},
				{ id: 2, projectName: 'Rent A room', status: PROJECT_CURRENT, editing: false, emojis: [], links: [] }
			],
			detailProjectId: 0,
			detailEmoji: '',
			choosedProjectId: 1
		});
	});
});