import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ProjectList from '../../../src/pages/popup/ProjectsList.js';
import { expect } from 'chai';
import { List, Map } from 'immutable';
import { PROJECT_CURRENT, PROJECT_ARCHIVE } from '../../../src/pages/constants.js';

const {renderIntoDocument,
		scryRenderedDOMComponentsWithTag} = TestUtils;

describe('ProjectList', () => {
	it('renders a list with only the not archive', () => {
		const projects = [
			{ id: 1, projectName: 'React', status: PROJECT_CURRENT,  editing: false, emojis: ['😀', '😫'], links: [] },
			{ id: 2, projectName: 'Redux', status: PROJECT_CURRENT, editing: false, emojis: [], links: [] },
			{ id: 3, projectName: 'Rent A room', status: PROJECT_ARCHIVE, editing: false, emojis: [], links: [] }
		];
		const component = renderIntoDocument(<ProjectList projects={projects}/>);
		const items = scryRenderedDOMComponentsWithTag(component, 'li');

		expect(items.length).to.equal(2);
		expect(items[0].textContent).to.contain('React');
		expect(items[1].textContent).to.contain('Redux');
	});
});