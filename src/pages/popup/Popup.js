import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as actions from './actions.js';
import ProjectsList from './ProjectsList.js';
import ProjectDetail from './ProjectDetail.js';

class Popup extends Component {
	constructor(props) {
		super(props);
	};
	static propTypes = {
        projects: PropTypes.array.isRequired,
        choosedProjectId: PropTypes.number.isRequired,
        detailProjectId: PropTypes.number.isRequired,
        detailEmoji: PropTypes.string.isRequired,
        chooseProject: PropTypes.func.isRequired,
        archiveProject: PropTypes.func.isRequired,
        showProject: PropTypes.func.isRequired,
        backProjectList: PropTypes.func.isRequired,
        chooseEmoji: PropTypes.func.isRequired,
        deleteLink: PropTypes.func.isRequired
    };

	restructProject(projects, detailProjectId){
		const project = projects.find(
			(item) => item.id === detailProjectId 
		);
		const structuredProject = _.update(project, 'links', value => {
			return _.groupBy(value, 'emoji')
		})
		console.dir(structuredProject);
		// project.update('links', value => {
		// 	return value.groupBy(x => x.get('emoji'));
		// }); //不管进去什么东西出来都会是 Object
		return structuredProject; //the link is different, before links is List, now links is Map
	}
	render() {
		const {
            projects,
            choosedProjectId,
            detailProjectId,
            detailEmoji,
            chooseProject,
            archiveProject,
            showProject,
            backProjectList,
            chooseEmoji,
            deleteLink
        } = this.props;

        console.log('update');
		return (
			<div>
				<section className='popupPage'>
					<ProjectsList projects={projects}
						choosedProjectId={choosedProjectId}
						chooseProject={chooseProject}
						archiveProject={archiveProject}
						showProject={showProject}
					/>
				</section>
				<section className='project-detail'>
					{
						detailProjectId !== 0 ?
						( <ProjectDetail project={this.restructProject(projects, detailProjectId)}
								detailEmoji={detailEmoji}
								backProjectList={backProjectList}
								chooseEmoji={chooseEmoji}
								deleteLink={deleteLink}
						/> ) : 
						( <p>nothing here</p> )
					}
				</section>
			</div>
		)
	}
}

export default connect(state => state, actions)(Popup);