import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import TableCell from "../components/tableCell";
import Pagination from "../components/pagination";

function Table() {
	const storeResult = useSelector((state) => state.result.result);

	const [forks, setForks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [forksPerPage] = useState(50);

	const lastForkIndex = currentPage * forksPerPage;
	const firstForkIndex = lastForkIndex - forksPerPage;
	const currentFork = forks.slice(firstForkIndex, lastForkIndex);

	useEffect(() => {
		setForks(storeResult);
		if (storeResult.length !== 0) setLoading(false);
	}, [storeResult]);

	const addToFavorites = (e) => {
		const { target } = e;
		// Получаю id репозитория
		let title = target.getAttribute("data-title"),
			owner = target.getAttribute("data-owner"),
			link = target.getAttribute("data-link");

		// Получаю данные из локального хранилища
		let storedItems = JSON.parse(localStorage.getItem("favoriteForks")) || [];

		// Если избранное - добавляем в массив
		if (target.checked) {
			storedItems.push({ title: title, owner: owner, link: link });
		} else {
			// Удалить избранное из массива
			const storedItemIndex = storedItems.findIndex((item) => item.title === title && item.owner === owner && item.link === link);
			storedItems.splice(storedItemIndex, 1);
		}

		// Добавляем массив в локальное хранилище
		localStorage.setItem("favoriteForks", JSON.stringify(storedItems));
	};

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

	if (loading) return <p className="table__error">...</p>;

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
							title={item.title}
							owner={item.owner}
							stars={item.stars}
							addToFavorites={addToFavorites}
							checked={item.favorite}
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
