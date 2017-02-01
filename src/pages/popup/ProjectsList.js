import React, { Component, PropTypes } from 'react';

import ProjectItem from './ProjectItem.js'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { PROJECT_CURRENT, PROJECT_ARCHIVE } from '../constants.js';

export default class ProjectList extends Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	getItems(projects) {
		if (projects) {
			return projects.filter(
				(item) => item.status === PROJECT_CURRENT
			)
		}
		return [];
	}
	render() {
		const {
            projects,
            choosedProjectId,
            chooseProject,
            archiveProject,
            showProject
        } = this.props;

		return (
			<section className='main'>
				<ul className='projects-list'>
					{this.getItems(projects).map( item =>
						<ProjectItem
							projectName={item.projectName}
							id={item.id}
							ifChoosen={choosedProjectId === item.id}
							isEditing={item.editing}
							emojis={item.emojis}
							links={item.links}
							chooseProject={chooseProject}
							archiveProject={archiveProject}
							showProject={showProject}
						/>
					)}
				</ul>
			</section>
		)
	}
}

ProjectList.propTypes = {
	projects: PropTypes.array.isRequired,
	choosedProjectId: PropTypes.number.isRequired,
	chooseProject: PropTypes.func.isRequired,
	archiveProject: PropTypes.func.isRequired,
	showProject: PropTypes.func.isRequired
};