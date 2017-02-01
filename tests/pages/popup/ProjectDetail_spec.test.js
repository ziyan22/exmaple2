import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ProjectDetail from '../../../src/pages/popup/ProjectDetail.js';
import { expect } from 'chai';
import { PROJECT_CURRENT, PROJECT_WAITING, PROJECT_ARCHIVE } from '../../../src/pages/constants.js';

const { renderIntoDocument,
			scryRenderedDOMComponentsWithTag,
			scryRenderedDOMComponentsWithClass,
			Simulate} = TestUtils;

describe('ProjectDetail', () => {
	it('renders a detailPage with the projectName', () => {
		const project = { id: 1, projectName: 'React', status: PROJECT_CURRENT,  editing: false, emojis: ['😀', '😫'], links: {} };
		const component = renderIntoDocument(<ProjectDetail project={project} detailEmoji='😀'/>);
		const items = scryRenderedDOMComponentsWithClass(component, 'project-info');
		expect(items[0].textContent).to.contain('React');
	});

	it('renders a detailPage with emoji button list', () => {
		// const links = Map({ 
		//   '😀': Map({
		//         id: 1,
		//         linkUrl: 'https://github.com/enaqx/awesome-react#redux-tutorials',
		//         linkTitle: 'GitHub - awesome-react',
		//         iconUrl: 'linkUrl',
		//         emoji: '😀'
		//       }),
		//   '😫': Map({
		//         id: 2,
		//         linkUrl: 'https://github.com/ivantsov/redux-webext',
		//         linkTitle: 'GitHub - redux-webext',
		//         iconUrl: 'linkUrl',
		//         emoji: '😫'
		//       })
		// });
		const project = { id: 1, projectName: 'React', status: PROJECT_CURRENT,  editing: false, emojis: ['😀', '😫'], links: {} };
		const component = renderIntoDocument(<ProjectDetail project={project} detailEmoji='😀'/>);
		const items = scryRenderedDOMComponentsWithClass(component, 'emoji-list');
		expect(items[0].children.length).to.equal(2);
	});

	it('renders a detailPage with emoji button list', () => {
		const project = { id: 1, projectName: 'React', status: PROJECT_CURRENT,  editing: false, emojis: ['😀', '😫'], links: {} };
		const component = renderIntoDocument(<ProjectDetail project={project} detailEmoji='😀'/>);
		const items = scryRenderedDOMComponentsWithClass(component, 'emoji-list');
		expect(items[0].children.length).to.equal(2);
	});
	it('when emoji is empty string it will find the first emoji and call chooseEmoji function', () => {
		var newEmoji = false;
    	const chooseEmojiBa = () => newEmoji = true;
		const project = { id: 1, projectName: 'React', status: PROJECT_CURRENT,  editing: false, emojis: ['😀', '😫'], links: {} };
		const component = renderIntoDocument(<ProjectDetail project={project} detailEmoji='' chooseEmoji={chooseEmojiBa}/>);
		// const items = scryRenderedDOMComponentsWithClass(component, 'emoji-button');
		// expect(items[0].classList.contains('selected')).to.equal(true);
		expect(newEmoji).to.equal(true);
	});
	it('invoke call back when back button is clicked', () => {
		var isBack = false;
    	const backBack = () => isBack = true;
    	const project = { id: 1, projectName: 'React', status: PROJECT_CURRENT,  editing: false, emojis: ['😀', '😫'], links: {} };
		const component = renderIntoDocument(<ProjectDetail project={project} backProjectList={backBack} detailEmoji='😀'/>);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		Simulate.click(buttons[0]);
		expect(isBack).to.equal(true);
	});
});
