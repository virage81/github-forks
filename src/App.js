import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import SearchBar from "./components/searchBar";

import "./scss/style.scss";

export const App = () => (
	<div className="wrapper">
		<SearchBar />
	</div>
);

export default App;
