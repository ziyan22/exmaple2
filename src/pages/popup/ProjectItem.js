import React, { Component, PropTypes } from 'react';

import classNames from 'classNames';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class ProjectItem extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		const {
            projectName,
			id,
			ifChoosen,
			isEditing,
			emojis,
			links,
			chooseProject,
			archiveProject,
			showProject
        } = this.props;

		var itemClass = classNames({
			'current': ifChoosen,
			'editing': isEditing,
			'project-item': true
		});
		return (
			<li className={itemClass}>
				<div className="view">
					<button className="choose" onClick={() => chooseProject(id)}>{projectName}</button>
					<button className="archive" onClick={() => archiveProject(id)}> archive </button>
					<button className="detail" onClick={() => showProject(id)}> detail </button>
				</div>
			</li>
		)
	}
}

ProjectItem.propTypes = {
	projectName:PropTypes.string.isRequired,
	id: 		PropTypes.number,
	ifChoosen: 	PropTypes.bool,
	isEditing: 	PropTypes.bool,
	emojis: 	PropTypes.array.isRequired,
	links: 		PropTypes.array.isRequired,
	chooseProject: PropTypes.func.isRequired,
	archiveProject: PropTypes.func.isRequired,
	showProject: PropTypes.func.isRequired,
};