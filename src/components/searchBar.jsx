import "../scss/style.scss";

function SearchBar() {
	return (
		<div className="search-bar">
			<h1 className="title">GITHUB-FORKS</h1>
			<form action="#" className="search">
				<input type="text" className="search__input" placeholder="Найти репозиторий..." />
				<button type="submit" className="search__button">
					<svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M16.9166 17.4167L22.75 23.25"
							stroke="#AFAFAF"
							stroke-width="4.44444"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M18.8611 12.5556C18.8611 16.3142 15.8142 19.3611 12.0556 19.3611C8.29695 19.3611 5.25 16.3142 5.25 12.5556C5.25 8.79695 8.29695 5.75 12.0556 5.75C15.8142 5.75 18.8611 8.79695 18.8611 12.5556Z"
							stroke="#AFAFAF"
							stroke-width="4.44444"
						/>
					</svg>
				</button>
			</form>
		</div>
	);
}

export default SearchBar;
