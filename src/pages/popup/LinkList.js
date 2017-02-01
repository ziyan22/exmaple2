import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class LinkList extends Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	openPage(pageLink){
		return 1;
	}
	getLinks(links){
		return links || [];
	}
	render() {
		const {
			links,
			deleteLink,
			projectId,
		} = this.props;

		return (
			<div>
				{this.getLinks(links).map(link => (
					<div className='link-div'>
							<span className='fav-icon'>{link.iconUrl}</span>
							<span className='link-title' onClick={() => this.openPage(link.linkUrl)}>{link.linkTitle}</span>
							<button className='delete-button' onClick={() => deleteLink(link.id, projectId)}>delete</button>
					</div>)
				)}
			</div>
		)
	}
}

LinkList.propTypes = {
	links: PropTypes.array.isRequired,
	deleteLink: PropTypes.func.isRequired,
	projectId: PropTypes.number.isRequired,
};