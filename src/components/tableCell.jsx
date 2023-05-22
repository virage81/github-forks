import { useEffect, useRef } from "react";

function TableCell({ id, title, owner, stars, addToFavorites, checked, link, fork }) {
	const ref = useRef(false);

	// const storeResult = useSelector((state) => state.result.result);

	useEffect(() => {
		ref.current.checked = checked;
	}, [fork, checked]);

	return (
		<tr className="table__row">
			<td className="table__cell">{id}</td>
			<td className="table__cell">{title}</td>
			<td className="table__cell">{owner}</td>
			<td className="table__cell">{stars}</td>
			<td className="table__cell">
				<input key={id} ref={ref} type="checkbox" data-title={title} data-owner={owner} data-link={link} onChange={addToFavorites} />
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
