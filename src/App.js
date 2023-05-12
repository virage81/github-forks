// Libs
import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/home";
import Search from "./pages/search";

// Stylesheets
import "./scss/style.scss";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/search" element={<Search />} />
		</Routes>
	);
}

export default App;
