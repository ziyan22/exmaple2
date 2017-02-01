import React from 'react';
import TestUtils from 'react-addons-test-utils';
import EmojiButton from '../../../src/pages/popup/EmojiButton.js';
import { expect } from 'chai';
import { PROJECT_CURRENT, PROJECT_WAITING, PROJECT_ARCHIVE } from '../../../src/pages/constants.js';

const { renderIntoDocument,
			scryRenderedDOMComponentsWithTag,
			Simulate} = TestUtils;

describe('EmojiButton', () => {
	it('renders a EmojiButton differently when it is selected', () => {
		const component = renderIntoDocument(<EmojiButton emoji='😀' selected='true'/>);
		const items = scryRenderedDOMComponentsWithTag(component, 'div');
		expect(items[0].classList.contains('selected')).to.equal(true);
	});
	it('invoke a call back function when click the emoji button', () => {
	    var changedEmoji = false;
	    const changeEmoji = () => changedEmoji = true;
	    const component = renderIntoDocument( <EmojiButton emoji='😀' chooseEmoji={changeEmoji} /> );
	    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
	    Simulate.click(buttons[0]);
	    expect(changedEmoji).to.equal(true);
	});
	//TODO have back button -- back button will have a function --change detailEmoji and detailProjectId to 0
});