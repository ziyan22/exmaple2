import React from 'react';
import TestUtils from 'react-addons-test-utils';
import LinkList from '../../../src/pages/popup/LinkList.js';
import { expect } from 'chai';

const { renderIntoDocument,
			scryRenderedDOMComponentsWithTag,
			scryRenderedDOMComponentsWithClass,
			Simulate} = TestUtils;

describe('LinkList', () => {
	it('render the passed list', () => {
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
				emoji: '😀'
			}
		];
		const component = renderIntoDocument(<LinkList links={links}/>);
		const items = scryRenderedDOMComponentsWithClass(component, 'link-div');
		expect(items[0].textContent).to.contain('GitHub - awesome-react');
	});
	it('invokes a call back when delete button is clicked', () => {
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
				emoji: '😀'
			}
		];
		var isdeleted = false;
    	const deleteIt = () => isdeleted = true;
		const component = renderIntoDocument(<LinkList links={links} deleteLink={deleteIt}/>);
		const buttons = scryRenderedDOMComponentsWithClass(component, 'delete-button');
		Simulate.click(buttons[0]);
		expect(isdeleted).to.equal(true);
	});
});