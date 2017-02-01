import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Popup from '../../../src/pages/popup/Popup.js';
import { expect } from 'chai';
import { PROJECT_CURRENT, PROJECT_ARCHIVE } from '../../../src/pages/constants.js';

const {renderIntoDocument,
		scryRenderedDOMComponentsWithTag,
		scryRenderedDOMComponentsWithClass} = TestUtils;

describe('Popup', () => {
	it('detail section will show nothing here, when it is detailProjectId === 0', () => {
		const detailProjectId = 0;
		const component = renderIntoDocument(<Popup detailProjectId={detailProjectId}/>);
		const items = scryRenderedDOMComponentsWithClass(component, 'project-detail');

		expect(items[0].textContent).to.contain('nothing here');
	});

	it('detail section will show project Name, when it is id specified', () => {
		const links = [
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
		];
		const projects = [
			{ id: 1, projectName: 'React', status: PROJECT_CURRENT,  editing: false, emojis: ['😀', '😫'], links: [] },
			{ id: 2, projectName: 'Redux', status: PROJECT_CURRENT, editing: false, emojis: [], links: links },
			{ id: 3, projectName: 'Rent A room', status: PROJECT_ARCHIVE, editing: false, emojis: [], links: [] }
		];

		const detailProjectId = 2;
		const detailEmoji = "";
		const choosedProjectId = 1
		const component = renderIntoDocument(<Popup projects={projects} choosedProjectId={choosedProjectId} detailProjectId={detailProjectId} detailEmoji={detailEmoji}/>);
		const items = scryRenderedDOMComponentsWithClass(component, 'project-detail');
		
		expect(items[0].textContent).to.contain('Redux');
	});
});