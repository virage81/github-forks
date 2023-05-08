function ErrMessage({ show, errText }) {
	if (show)
		return (
			<div className="message">
				<div className="message__inner">
					<p className="message__text">{errText}</p>
				</div>
			</div>
		);
}

export default ErrMessage;
