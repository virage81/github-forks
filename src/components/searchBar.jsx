import React, { useState } from "react";

import ErrMessage from "../components/message";

function SearchBar() {
	// Хуки для рендера сообщения
	const [isErr, setIsErr] = useState(false);
	const [message, setMessage] = useState("");
	const [search, setSearch] = useState("");

	// Сообщения с ошибками
	const noValid = "Error: enter a valid search.",
		noOwner = "Error: enter a user.",
		noRepo = "Error: repository doesn't exist.";

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	// Валидация поиска
	function validate(e) {
		e.preventDefault();

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
				setIsErr(false);
				setMessage("");
				break;
		}
	}

	// Валидация поиска
	// Если нету "/", вывод ошибки
	// Если перед "/", нету слова (владельца репозитория), вывод ошибки
	// Если последний символ "/", нету репозитория, вывод ошибки

	return (
		<form action="" className="search">
			<input type="text" className="search__input" id="searchBar" placeholder="Найти репозиторий..." value={search} onChange={handleChange} />
			<button type="submit" onClick={validate} className="search__button">
				<svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M16.9166 17.4167L22.75 23.25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					<path
						d="M18.8611 12.5556C18.8611 16.3142 15.8142 19.3611 12.0556 19.3611C8.29695 19.3611 5.25 16.3142 5.25 12.5556C5.25 8.79695 8.29695 5.75 12.0556 5.75C15.8142 5.75 18.8611 8.79695 18.8611 12.5556Z"
						strokeWidth="2"
					/>
				</svg>
			</button>
			<ErrMessage show={isErr} errText={message} />
		</form>
	);
}

export default SearchBar;
