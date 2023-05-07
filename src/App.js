// Libs
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/home";
import Result from "./pages/result";

// Stylesheets
import "./scss/style.scss";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/result" element={<Result />} />
			</Routes>
		</Router>
	);
}

export default App;
