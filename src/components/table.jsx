// import axios from "axios";

import TableCell from "../components/tableCell";

function Table() {
	let array = [
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
		39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,
		76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
	];

	return (
		<table className="table">
			<caption className="table__title">RESULT</caption>
			<thead>
				<tr className="table__row">
					<th className="table__heading">#</th>
					<th className="table__heading">Название</th>
					<th className="table__heading">Владелец</th>
					<th className="table__heading">Кол-во звезд</th>
					<th className="table__heading">Избранное</th>
					<th className="table__heading">Ссылка</th>
				</tr>
			</thead>
			<tbody>
				{array.map((item) => {
					return <TableCell id={item} name="Study" author="virage81" stars="4" favorite="Да" link="https://github.com/virage81/Study" />;
				})}
				{/* <TableCell id="1" name="Study" author="virage81" stars="4" favorite="Да" link="https://github.com/virage81/Study" />
				<TableCell id="2" name="Gold-Group" author="s0ret" stars="4.3" favorite="Да" link="https://github.com/s0ret/Gold-Group" />
				<TableCell id="3" name="Rezolut" author="virage82" stars="3.7" favorite="Нет" link="https://github.com/virage82/Rezolut" /> */}
			</tbody>
		</table>
	);
}

export default Table;
