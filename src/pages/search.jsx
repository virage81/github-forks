// Libs
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchContent } from "../redux/resultSlice";

// Components
import SearchBar from "../components/searchBar";
import Table from "../components/table";

function Result() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchContent({ url: document.location.search, page: document.location.search.split("?")[1].split("&")[2] }));
	});

	return (
		<main className="main">
			<div className="container">
				<SearchBar />
				<Table />
			</div>
		</main>
	);
}

export default Result;
