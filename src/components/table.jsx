import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import TableCell from "../components/tableCell";
import Pagination from "../components/pagination";

function Table() {
	const storeResult = useSelector((state) => state.result.result);

	const [forks, setForks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [forksPerPage] = useState(50);

	useEffect(() => {
		setLoading(true);
		setForks(storeResult);
		if (storeResult.length !== 0) setLoading(false);
	}, [storeResult]);

	const lastForkIndex = currentPage * forksPerPage;
	const firstForkIndex = lastForkIndex - forksPerPage;
	const currentFork = forks.slice(firstForkIndex, lastForkIndex);

	// Устанавливаю текущую страницу
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	// Уменьшаю текущую страницу
	const prevPage = () => {
		if (currentPage === 1) return;
		setCurrentPage((prev) => prev - 1);
	};

	// Увеличиваю текущую страницу
	const nextPage = () => {
		if (currentPage === Math.ceil(storeResult.length / forksPerPage)) return;
		setCurrentPage((prev) => prev + 1);
	};

	if (loading) {
		return <p className="table__error">...</p>;
	}

	return (
		<>
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
					{currentFork.map((item) => (
						<TableCell
							key={item.id}
							id={item.id}
							name={item.title}
							owner={item.owner}
							stars={item.stars}
							favorite="Да"
							link={item.link}
						/>
					))}
				</tbody>
			</table>
			<Pagination forksPerPage={forksPerPage} totalForks={storeResult.length} paginate={paginate} prevPage={prevPage} nextPage={nextPage} />
		</>
	);
}

export default Table;
