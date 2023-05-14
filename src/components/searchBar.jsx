// Libs
import React, { useState } from "react";
import { Octokit } from "octokit";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Store components
import { init } from "../redux/resultSlice";

// Components
import ErrMessage from "../components/message";
import { changeLoading } from "../redux/loadingSlice";

function SearchBar() {
	const dispatch = useDispatch();

	// Хуки для рендера сообщения
	const [isErr, setIsErr] = useState(false);
	const [message, setMessage] = useState("");
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	// Сообщения с ошибками
	const noValid = "ERROR: enter a valid search.",
		noOwner = "ERROR: enter a user.",
		noRepo = "ERROR: repository doesn't exist.";

	function handleSearch(e) {
		setSearch(e.target.value);
	}

	// Валидация поиска
	const validateSearch = (e) => {
		switch (true) {
			case search.indexOf("/") === -1 || search.length === 0:
				setIsErr(true);
				setMessage(noValid);
				break;

			case search.indexOf("/") === 0:
				setIsErr(true);
				setMessage(noOwner);
				break;

			case search.indexOf("/") === search.length - 1 ||
				(search.indexOf("/") === search.length - 1 && search.substring(search.indexOf("/"), search.length) === ""):
				setIsErr(true);
				setMessage(noRepo);
				break;

			default:
				getRepo();
				dispatch(changeLoading(true));
				navigate("/search", { replace: false });
				break;
		}

		setTimeout(() => {
			setIsErr(false);
			setMessage("");
		}, 5000);
	};

	// Отправка запроса
	async function getRepo() {
		const GITHUB_TOKEN = "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";
		const octokit = new Octokit({
			auth: GITHUB_TOKEN,
		});

		let owner = search.substring(0, search.indexOf("/")),
			repo = search.substring(search.indexOf("/") + 1, search.length),
			storeResult = [],
			page = 1;

		try {
			do {
				if (page === 3) break;

				var request = await octokit.request("GET /repos/{owner}/{repo}/forks", {
					owner: owner,
					repo: repo,
					per_page: 100,
					page: page,
				});
				page++;

				request.data.map((item) => {
					return storeResult.push({ title: item.name, owner: item.owner.login, stars: item.stargazers_count, link: item.html_url });
				});
			} while (request.data.length === 100);

			dispatch(init(storeResult));
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			<form className="search">
				<input type="text" className="search__input" id="searchBar" placeholder="Найти репозиторий..." value={search} onChange={handleSearch} />
				<button type="button" onClick={validateSearch} className="search__button">
					<svg viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M16.9166 17.4167L22.75 23.25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						<path
							d="M18.8611 12.5556C18.8611 16.3142 15.8142 19.3611 12.0556 19.3611C8.29695 19.3611 5.25 16.3142 5.25 12.5556C5.25 8.79695 8.29695 5.75 12.0556 5.75C15.8142 5.75 18.8611 8.79695 18.8611 12.5556Z"
							strokeWidth="2"
						/>
					</svg>
				</button>
			</form>
			<ErrMessage show={isErr} errText={message} />
		</>
	);
}

export default SearchBar;
