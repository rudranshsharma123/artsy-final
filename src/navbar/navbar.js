import React, { useEffect } from "react";
import "./styles.css";
import { connect } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Navbar({ isHome }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const deso = useSelector((state) => state.deso);
	console.log(deso);
	useEffect(() => {
		if (deso.publicKey === "" || deso.publicKey === null) {
			dispatch(connect());
		}
	}, []);
	const handlePageChange = () => {
		if (isHome) {
			navigate("/");
			return;
		}
		navigate("/user");
	};

	const handleLogout = () => {
		navigate("/gen");
	};
	const handleChange = () => {
		navigate("/discover");
	};
	return (
		<nav id="nav">
			<div id="nav-links">AppName</div>
			<div id="nav-links-deso">{deso.publicKey}</div>
			<div>
				<button id="buttons" onClick={handlePageChange}>
					{isHome ? "Home" : "Profile"}
				</button>
				<button id="buttons" onClick={handleLogout}>
					ArtGen
				</button>
				<button id="buttons" onClick={handleChange}>
					Discover
				</button>
			</div>
		</nav>
	);
}

export default Navbar;
