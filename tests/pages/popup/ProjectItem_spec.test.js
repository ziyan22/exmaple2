import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ProjectItem from '../../../src/pages/popup/ProjectItem';
import { expect } from 'chai';
import { PROJECT_CURRENT, PROJECT_WAITING, PROJECT_ARCHIVE } from '../../../src/pages/constants.js';

const { renderIntoDocument,
       scryRenderedDOMComponentsWithTag,
       scryRenderedDOMComponentsWithClass,
       Simulate} = TestUtils;

describe('ProjectItem', () => {
  it('renders an item', () => {
    const component = renderIntoDocument( <ProjectItem projectName="react" /> );
    const project = scryRenderedDOMComponentsWithTag(component, 'li');
    expect(project.length).to.equal(1);
    expect(project[0].textContent).to.contain('react');
  });

  it('get darken when the item it is selected', () => {
    const component1 = renderIntoDocument( <ProjectItem projectName="react" ifChoosen={true} /> );
    const component2 = renderIntoDocument( <ProjectItem projectName="redux" ifChoosen={false} /> );
    
    const project1 = scryRenderedDOMComponentsWithTag(component1, 'li');
    const project2 = scryRenderedDOMComponentsWithTag(component2, 'li');
    expect(project1[0].classList.contains('current')).to.equal(true);
    expect(project2[0].classList.contains('current')).to.equal(false);
  });

  it('should look different when editing', () => {
    const text = 'React';
    const component = renderIntoDocument(
      <ProjectItem projectName="react" isEditing={true}/>
    );
    const project = scryRenderedDOMComponentsWithTag(component, 'li');
    expect(project[0].classList.contains('editing')).to.equal(true);
  });

  it('invokes callback when archive is clicked', () => {
    const projectName = "react";
    var isDelete = false;
    const deleteThis = () => isDelete = true;
    const component = renderIntoDocument( <ProjectItem projectName={projectName} archiveProject={deleteThis} /> );

    const buttons = scryRenderedDOMComponentsWithClass(component, 'archive');
    Simulate.click(buttons[0]);
    expect(isDelete).to.equal(true);
  });

  it('invokes callback when choose is clicked', () => {
    const projectName = "react";
    var isChoose = false;
    const isChooseFun = () => isChoose = true;
    const component = renderIntoDocument( <ProjectItem projectName={projectName} chooseProject={isChooseFun} /> );
    const buttons = scryRenderedDOMComponentsWithClass(component, 'choose');
    Simulate.click(buttons[0]);
    expect(isChoose).to.equal(true);
  });

  it('invokes callback when detail is clicked', () => {
    const projectName = "react";
    var isShowed = false;
    const showDetail = () => isShowed = true;
    const component = renderIntoDocument( <ProjectItem projectName={projectName} showProject={showDetail} /> );
    const buttons = scryRenderedDOMComponentsWithClass(component, 'detail');
    Simulate.click(buttons[0]);
    expect(isShowed).to.equal(true);
  });
});

  // it('calls a callback when text is double clicked', () => {
  //   var text = 'React';
  //   const editItem = () => text = 'Redux';
  //   const component = renderIntoDocument(
  //     <TodoItem text={text} editItem={editItem}/>
  //   );
  //   const label = component.refs.text
  //   Simulate.doubleClick(label);

  //   expect(text).to.equal('Redux');
  // });