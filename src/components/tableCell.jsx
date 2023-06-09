import { useEffect, useRef, useState } from "react";

function TableCell({ id, title, owner, stars, link, checked, addToFavorites }) {
	const ref = useRef(false);

	const [isChecked, setChecked] = useState(checked);

	useEffect(() => {
		ref.current.checked = checked;
	}, [checked]);

	const handleChecked = (e) => {
		addToFavorites(e);
		setChecked(!isChecked);
	};

	return (
		<tr className="table__row">
			<td className="table__cell">{id}</td>
			<td className="table__cell">{title}</td>
			<td className="table__cell">{owner}</td>
			<td className="table__cell">{stars}</td>
			<td className="table__cell">
				<input
					key={id}
					ref={ref}
					type="checkbox"
					data-title={title}
					data-owner={owner}
					data-link={link}
					onChange={handleChecked}
					checked={isChecked}
				/>
			</td>
			<td className="table__cell">
				<a href={link} target="_blank" rel="noreferrer">
					{link}
				</a>
			</td>
		</tr>
	);
}

export default TableCell;
