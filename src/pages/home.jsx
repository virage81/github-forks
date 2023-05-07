// Components
import Header from "../components/header";
import SearchBar from "../components/searchBar";

function Home() {
	return (
		<div className="wrapper">
			<Header />
			<main className="main">
				<div className="container">
					<h1 className="title">GITHUB FORKS</h1>
					<SearchBar />
				</div>
			</main>
		</div>
	);
}

export default Home;
