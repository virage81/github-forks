// Libs
import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/home";
import Search from "./pages/search";

// Components
import Header from "./components/header";

// Stylesheets
import "./scss/style.scss";

function App() {
	return (
		<div className="wrapper">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/search" element={<Search />} />
			</Routes>
		</div>
	);
}

export default App;
