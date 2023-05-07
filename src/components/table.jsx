import TableCell from "../components/tableCell";

function Table() {
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
				<TableCell id="1" name="Study" author="virage81" stars="4" favorite="Да" link="https://github.com/virage81/Study" />
				<TableCell id="2" name="Gold-Group" author="s0ret" stars="4.3" favorite="Да" link="https://github.com/s0ret/Gold-Group" />
				<TableCell id="3" name="Rezolut" author="virage82" stars="3.7" favorite="Нет" link="https://github.com/virage82/Rezolut" />
			</tbody>
		</table>
	);
}

export default Table;
