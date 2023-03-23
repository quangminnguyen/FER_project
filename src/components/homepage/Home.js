import React, { useEffect, useState } from "react";
import Dashboard from "../admin/Dashboard";
import UserHomePage from "../user/UserHomePage";
import "./style.css";
const Home = ({ data }) => {
	const [user, setUser] = useState({});

	useEffect(() => {
		if (localStorage.getItem("user")) {
			setUser(JSON.parse(localStorage.getItem("user")));
		} else {
			setUser({});
		}
	}, [localStorage.getItem("user")]);
	return <div>{user?.role === "admin" ? <Dashboard /> : <UserHomePage />}</div>;
};

export default Home;
