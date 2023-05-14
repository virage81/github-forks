// Libs
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContent } from "../redux/resultSlice";

// Components
import SearchBar from "../components/searchBar";
import Table from "../components/table";

function Result() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchContent({ url: document.location.search }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
