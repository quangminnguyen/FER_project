import React, { useEffect, useState } from "react";
import "./style.css";
const User = () => {
	const [user, setUser] = useState([]);

	const [cuUser, setCuUser] = useState({});

	useEffect(() => {
		const users = localStorage.getItem("accounts");
		if (users) {
			setUser(JSON.parse(users));
		}
	}, []);
	useEffect(() => {
		if (localStorage.getItem("user")) {
			setCuUser(JSON.parse(localStorage.getItem("user")));
		} else {
			setCuUser({});
		}
	}, [localStorage.getItem("user")]);

	const handleBan = (index, item) => {
		const ar = user;
		const some = item?.id?.toString() === cuUser?.id?.toString();
		if (some) {
			return window.alert("Bạn không thể block chính bạn.");
		}
		ar[index].block = true;
		localStorage.removeItem("accounts");
		localStorage.setItem("accounts", JSON.stringify(ar));
		setUser([...ar]);
	};

	const handleUnban = (index, item) => {
		const ar = user;
		const some = item?.id?.toString() === cuUser?.id?.toString();
		if (some) {
			return window.alert("Bạn không thể unBlock chính bạn.");
		}
		ar[index].block = false;
		localStorage.removeItem("accounts");
		localStorage.setItem("accounts", JSON.stringify(ar));
		setUser([...ar]);
	};

	const handleChangeRole = (index, item) => {
		const ar = user;
		const some = item?.id?.toString() === cuUser?.id?.toString();
		if (some) {
			return window.alert("Bạn không thể change role chính bạn.");
		}
		ar[index].role = ar[index].role === "user" ? "admin" : "user";
		localStorage.removeItem("accounts");
		localStorage.setItem("accounts", JSON.stringify(ar));
		setUser([...ar]);
	};
	return (
		<div className="table_contain">
			<table className="table">
				<thead>
					<tr className="t_row">
						<th className="t_stt">STT</th>
						<th className="t_id">ID</th>
						<th className="t_email">Email</th>
						<th className="t_username">Username</th>
						<th className="t_role">Role</th>
						<th className="t_block">isBlock</th>
						<th className="t_bars"></th>
					</tr>
				</thead>
				<tbody>
					{user?.map((item, index) => (
						<tr key={index + "tbale"} className="t_row_2">
							<th className="t_stt font_400">{index + 1}</th>
							<th className="t_id font_400">{item?.id}</th>
							<th className="t_email font_400">{item?.email}</th>
							<th className="t_username font_400">{item?.username}</th>
							<th className="t_role">
								{item?.role}{" "}
								<button
									onClick={() => handleChangeRole(index, item)}
									className="button"
								>
									Change Role
								</button>
							</th>
							<th
								style={!item?.block ? { color: "green" } : { color: "red" }}
								className="t_block font_400"
							>
								{!item?.block ? "No block" : "Block"}
							</th>
							<th className="t_bars">
								{!item?.block ? (
									<i
										onClick={() => handleBan(index, item)}
										style={{ cursor: "pointer", color: "red" }}
										className="fa-solid fa-ban"
									></i>
								) : (
									<i
										onClick={() => handleUnban(index, item)}
										style={{ cursor: "pointer", color: "green" }}
										className="fa-solid fa-check"
									></i>
								)}
							</th>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default User;
