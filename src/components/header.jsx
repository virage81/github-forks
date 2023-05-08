import React from "react";
import { Link } from "react-router-dom";

function Header() {
	return (
		<header className="header">
			<div className="container">
				<div className="header__inner">
					<Link to="/" className="header__logo">
						GITHUB FORKS
					</Link>
					<nav className="header__nav">
						<ul className="header__nav__list">
							<li className="header__nav__item">
								<Link to="/" className="header__nav__link">
									Главная
								</Link>
							</li>
							<li className="header__nav__item">
								<Link to="/search" className="header__nav__link">
									Результаты
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
}

export default Header;
