import React, { useState } from "react";
import { Octokit } from "octokit";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { init } from "../redux/resultSlice";

import ErrMessage from "../components/message";

function SearchBar() {
	const dispatch = useDispatch();

	// Хуки для рендера сообщения
	// const [isErr, setIsErr] = useState(false);
	// const [message, setMessage] = useState("");
	const [search, setSearch] = useState("");

	// // Сообщения с ошибками
	// const noValid = "Error: enter a valid search.",
	// 	noOwner = "Error: enter a user.",
	// 	noRepo = "Error: repository doesn't exist.";

	// // Валидация поиска
	// const validateSearch = (e) => {
	// 	setSearch(e.target.value);

	// 	switch (true) {
	// 		case search.indexOf("/") === -1 || search.length === 0:
	// 			setIsErr(true);
	// 			setMessage(noValid);
	// 			break;

	// 		case search.indexOf("/") === 0:
	// 			setIsErr(true);
	// 			setMessage(noOwner);
	// 			break;

	// 		case search.indexOf("/") === search.length - 1 ||
	// 			(search.indexOf("/") === search.length - 1 && search.substring(search.indexOf("/"), search.length) === ""):
	// 			setIsErr(true);
	// 			setMessage(noRepo);
	// 			break;

	// 		default:
	// 			setIsErr(false);
	// 			setMessage("");
	// 			break;
	// 	}
	// };

	// Отправка запроса
	const GITHUB_TOKEN = "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";
	const octokit = new Octokit({
		auth: GITHUB_TOKEN,
	});

	async function getRepo(e) {
		let owner = search.substring(0, search.indexOf("/")),
			repo = search.substring(search.indexOf("/") + 1, search.length);

		try {
			const request = await octokit.request("GET /repos/{owner}/{repo}/forks", {
				owner: owner,
				repo: repo,
				per_page: 50,
				page: 1,
			});

			const storeResult = request.data.map((item) => {
				return { title: item.full_name, author: item.owner.login, stars: item.stargazers_count, link: item.html_url };
			});
			dispatch(init(storeResult));
		} catch (err) {
			console.log(err);
		}
	}

	const validateSearch = (e) => {
		setSearch(e.target.value);
	};

	return (
		<form className="search">
			<input
				type="text"
				className="search__input"
				id="searchBar"
				placeholder="Найти репозиторий..."
				value={search}
				onInput={validateSearch}
				onChange={validateSearch}
			/>
			<button type="submit" onClick={getRepo} className="search__button">
				<Link to="/search">
					<svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M16.9166 17.4167L22.75 23.25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						<path
							d="M18.8611 12.5556C18.8611 16.3142 15.8142 19.3611 12.0556 19.3611C8.29695 19.3611 5.25 16.3142 5.25 12.5556C5.25 8.79695 8.29695 5.75 12.0556 5.75C15.8142 5.75 18.8611 8.79695 18.8611 12.5556Z"
							strokeWidth="2"
						/>
					</svg>
				</Link>
			</button>
			{/* <ErrMessage show={isErr} errText={message} /> */}
		</form>
	);
}
export default SearchBar;
