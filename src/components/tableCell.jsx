import React from "react";

function TableCell(props) {
	const { id, name, author, stars, favorite, link } = props;
	return (
		<tr className="table__row">
			<td className="table__cell">{id}</td>
			<td className="table__cell">{name}</td>
			<td className="table__cell">{author}</td>
			<td className="table__cell">{stars}</td>
			<td className="table__cell">{favorite}</td>
			<td className="table__cell">
				<a href="{link}">{link}</a>
			</td>
		</tr>
	);
}

export default TableCell;
