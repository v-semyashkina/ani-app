import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className="header-container">
			<header>
				<h1>Anime Calendar</h1>
			</header>
			<nav>
				<ul className="nav-links">
					<li>
						<Link to="/">Schedule</Link>
					</li>
					<li>
						<Link to="/season">Season</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};
export default Header;
