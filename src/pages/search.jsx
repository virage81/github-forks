// Libs
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Components
import SearchBar from "../components/searchBar";
import Table from "../components/table";

function Result() {
	const storeResult = useSelector((state) => state.result.result);
	const storeLoading = useSelector((state) => state.loading.loading);

	const [forks, setForks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [forksPerPage, setForksPerPage] = useState(30);

	const lastForkIndex = currentPage * forksPerPage;
	const firstForkIndex = lastForkIndex - forksPerPage;
	const currentFork = forks.slice(firstForkIndex, lastForkIndex);

	const loadingTable = () => {
		if (storeResult.length > 0) {
			setLoading(true);
		}
	};

	useEffect(() => {
		setLoading(true);
		setForks(storeResult);
		console.log("useEffect", loading);
		setLoading(false);
	}, [storeResult, loading]);

	return (
		<main className="main">
			<div className="container">
				<SearchBar />
				<Table loading={loading} currentFork={currentFork} />
			</div>
		</main>
	);
}

export default Result;
