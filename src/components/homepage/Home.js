import React, { useEffect, useState } from "react";
import Dashboard from "../admin/Dashboard";
import UserHomePage from "../user/UserHomePage";
import "./style.css";
const Home = ({ data, searchValue }) => {
	const [user, setUser] = useState({});
	useEffect(() => {
		if (localStorage.getItem("user")) {
			setUser(JSON.parse(localStorage.getItem("user")));
		} else {
			setUser({});
		}
	}, [localStorage.getItem("user")]);
	return (
		<div>
			{user?.role === "admin" ? (
				<Dashboard />
			) : (
				<UserHomePage data={data} searchValue={searchValue} />
			)}
		</div>
	);
};

export default Home;
