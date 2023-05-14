import React from "react";

import TableCell from "../components/tableCell";

function Table({ loading, currentFork }) {
	switch (true) {
		case loading:
			return <p className="table__error">Загрузка...</p>;

		case currentFork.length === 0:
			return <p className="table__error">К сожалению, у данного репозитория нету forks</p>;

		default:
			return (
				<table className="table">
					<caption className="table__title">RESULT</caption>
					<thead>
						<tr className="table__row">
							<th className="table__heading">#</th>
							<th className="table__heading">Название</th>
							<th className="table__heading">Владелец</th>
							<th className="table__heading">Звезды</th>
							<th className="table__heading">Избранное</th>
							<th className="table__heading">Ссылка</th>
						</tr>
					</thead>
					<tbody>
						{currentFork.map((item, index) => (
							<TableCell
								key={index + 1}
								id={index + 1}
								name={item.title}
								owner={item.owner}
								stars={item.stars}
								favorite="Да"
								link={item.link}
							/>
						))}
					</tbody>
				</table>
			);
	}
}

export default Table;
