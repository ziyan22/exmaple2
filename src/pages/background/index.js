import store from './store';
import { setState } from './actions';
import { PROJECT_CURRENT, PROJECT_ARCHIVE } from '../constants.js'


const FirstState = {
	projects:[
		{ id: 1, projectName: 'Buy a Car', status: PROJECT_CURRENT, editing: false, emojis: ['😀', '😫'], links: [
			{ id: 1, linkUrl: 'https://github.com/enaqx/awesome-react#redux-tutorials', linkTitle: 'GitHub - awesome-react', iconUrl: 'linkUrl', emoji: '😀' },
			{ id: 2, linkUrl: 'https://github.com/ivantsov/redux-webext', linkTitle: 'GitHub - redux-webext', iconUrl: 'linkUrl', emoji: '😫' }
		]},
		{ id: 2, projectName: 'Rent A room', status: PROJECT_ARCHIVE, editing: false, emojis: [], links: [] }
	],
	detailProjectId: 0,
	detailEmoji: '',
	choosedProjectId: 1,
}

store.dispatch(setState(FirstState));

console.dir(store.getState());
