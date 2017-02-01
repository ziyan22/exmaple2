import React, { Component, PropTypes } from 'react';
import classNames from 'classNames';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class EmojiButton extends Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render() {
		const {
			emoji,
			selected,
			chooseEmoji
		} = this.props;

		var itemClass = classNames({
			'emoji-button': true,
			'selected': selected
		});
		return (
			<div className={itemClass}>
				<button onClick={() => chooseEmoji(emoji)}> {emoji} </button>
			</div>
		)
	}
}

EmojiButton.propTypes = {
	emoji: PropTypes.string.isRequired,
	selected: PropTypes.bool.isRequired,
	chooseEmoji: PropTypes.func.isRequired
};