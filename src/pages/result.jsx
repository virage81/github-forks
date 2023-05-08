// Components
import Header from "../components/header";
import SearchBar from "../components/searchBar";
import Table from "../components/table";

function Result() {
	return (
		<div className="wrapper">
			<Header />
			<main className="main">
				<div className="container">к
					<SearchBar />
					<Table />
				</div>
			</main>
		</div>
	);
}

export default Result;
