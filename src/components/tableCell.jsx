function TableCell({ id, name, owner, stars, addToFavorites, checked, link }) {
	return (
		<tr className="table__row">
			<td className="table__cell">{id}</td>
			<td className="table__cell">{name}</td>
			<td className="table__cell">{owner}</td>
			<td className="table__cell">{stars}</td>
			<td className="table__cell">
				<input type="checkbox" onChange={addToFavorites} id={id} defaultChecked={checked} />
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
