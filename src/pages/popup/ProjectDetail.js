import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import EmojiButton from './EmojiButton.js'
import LinkList from './LinkList.js'

export default class ProjectDetail extends Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	getLinks( project, detailEmoji ){
		if(detailEmoji === ""){
			//for condition two if there is no emoji in project
			return [];
		}
		return project.links[detailEmoji] || [];   //Three -- did not save any this here
	}
	render() {
		const {
			project,
			detailEmoji,
			backProjectList,
			chooseEmoji,
			deleteLink
		} = this.props;
		
		if(detailEmoji === ""){
			if( project.emojis.length !== 0 ) {
				chooseEmoji(project.emojis[0]);
			}
		}

		return (
			<div>
				<button className='backProjectList' onClick={() => backProjectList()}>back</button>
				<section className='project-info'> { project.projectName } </section>
				<section className='emoji-list'>
					{ project.emojis.map(emoji => 
						<EmojiButton emoji={emoji}
									selected={emoji === detailEmoji}
									chooseEmoji={chooseEmoji}
						/>
					)}
				</section>
				<LinkList links={this.getLinks( project, detailEmoji )}  
						deleteLink={deleteLink}
						projectId={project.id}
				/>
			</div>
		)
	}
}

ProjectDetail.propTypes = {
	project: PropTypes.object.isRequired,
	detailEmoji: PropTypes.string.isRequired,
	backProjectList: PropTypes.func.isRequired,
	chooseEmoji: PropTypes.func.isRequired,
	deleteLink: PropTypes.func.isRequired
};