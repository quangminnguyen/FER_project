import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/homepage/Home";
import Register from "./components/register/Register";
import Detail from "./components/detail/Detail";
import { useEffect, useState } from "react";
import dataRoot from "./data.json";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";
function App() {
	const [data, setData] = useState(dataRoot);
	const [searchValue, setSearchValue] = useState("");
	useEffect(() => {
		if (!localStorage.getItem("movies")) {
			localStorage.setItem("movies", JSON.stringify(data?.movies));
		}
		if (!localStorage.getItem("types")) {
			localStorage.setItem("types", JSON.stringify(data?.types));
		}
		if (!localStorage.getItem("accounts")) {
			localStorage.setItem("accounts", JSON.stringify(data?.accounts));
		}
		if (!localStorage.getItem("reviews")) {
			localStorage.setItem("reviews", JSON.stringify(data?.reviews));
		}
	}, []);

	const handleClearLocalStorage = () => {
		localStorage.clear();
	};
	return (
		<Router>
			<div className="App">
				<Header />
				<Routes>
					<Route
						path="/"
						element={<Home data={data} searchValue={searchValue} />}
					/>
					<Route path="/:slug" element={<Detail data={data} />} />
					<Route path="/register" element={<Register data={data} />} />
					<Route path="/login" element={<Login data={data} />} />
				</Routes>
				<Footer />
				<ToastContainer style={{ fontSize: "1.5rem" }} />
				<div onClick={handleClearLocalStorage} title="Clear" className="clear">
					Clear
				</div>
			</div>
		</Router>
	);
}

export default App;
