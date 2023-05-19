// Libs
import React, { useState /*useEffect, useRef */ } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Store components
import { fetchContent } from "../redux/resultSlice";

// Components
import ErrMessage from "../components/message";

function SearchBar() {
	const dispatch = useDispatch();
	// const ref = useRef();

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
	const validateSearch = () => {
		switch (true) {
			case search.indexOf("/") === -1 || search.length === 0: {
				console.log(search);
				setIsErr(true);
				setMessage(noValid);
				break;
			}

			case search.indexOf("/") === 0: {
				setIsErr(true);
				setMessage(noOwner);
				break;
			}

			case search.indexOf("/") === search.length - 1 ||
				(search.indexOf("/") === search.length - 1 && search.substring(search.indexOf("/"), search.length) === ""): {
				setIsErr(true);
				setMessage(noRepo);
				break;
			}

			default: {
				dispatch(fetchContent({ url: search }));
				navigate("/search", { replace: false });
				break;
			}
		}

		setTimeout(() => {
			setIsErr(false);
			setMessage("");
		}, 5000);
	};

	// useEffect(() => {
	// 	document.addEventListener("keydown", (e) => {
	// 		let val = ref;
	// 		if (e.key === "Enter") {
	// 			validateSearch(val.current.value);
	// 		}
	// 	});

	// 	return () => {
	// 		document.removeEventListener("keydown", () => {});
	// 	};
	// }, []);

	return (
		<>
			<div className="search">
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
			</div>
			<ErrMessage show={isErr} errText={message} />
		</>
	);
}

export default SearchBar;
