import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

const UserHomePage = ({ data }) => {
	const [newData, setNewData] = useState([]);
	const [menuType, setMenuType] = useState([]);
	const [searchType, setSearchType] = useState("");
	const [searchData, setSearchData] = useState([]);

	useEffect(() => {
		const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
		const types = JSON.parse(localStorage.getItem("types")) || [];
		setMenuType(types);
		const data = JSON.parse(localStorage.getItem("movies")) || [];
		const newAr = data?.map((item) => {
			let to = 0;
			const some = reviews
				?.filter(
					(infor) => infor?.movie_id?.toString() === item?.id?.toString()
				)
				.reduce((total, current) => {
					to++;
					return total + current?.rateStar;
				}, 0);
			return {
				...item,
				evaluate: some / to || 0,
			};
		});
		setNewData([...newAr]);
	}, []);

	const { search } = useLocation();

	useEffect(() => {
		let searchValue = new URLSearchParams(search).get("search") || "";
		if (searchValue) {
			const ar = newData?.filter((item) =>
				item?.name?.toLowerCase()?.includes(searchValue?.toLowerCase())
			);
			console.log(ar);
			setSearchData([...ar]);
		} else {
			setSearchData("");
		}
	}, [search]);

	useEffect(() => {
		if (searchType == "") {
			setSearchData("");
		} else {
			setSearchData(newData.filter((item) => item.type == searchType));
		}
	}, [searchType]);

	const typeMenu = () => {
		return (
			<div className="btn-container">
				<button
					type="button"
					className="filter-btn"
					onClick={() => {
						setSearchData("");
					}}
				>
					All
				</button>
				{menuType.map((type, index) => {
					return (
						<button
							type="button"
							className="filter-btn"
							key={index}
							onClick={() => {
								setSearchType(type.id);
							}}
						>
							{type.name}
						</button>
					);
				})}
			</div>
		);
	};

	const render = () => {
		return (
			<div className="section-center">
				{searchData
					? searchData.map((product, index) => {
							return (
								<article key={index + "s"} className="menu-item">
									<Link to={`/${product?.id}`}>
										<img
											src={product.image}
											alt={product.name}
											className="photo"
										/>
									</Link>
									<div className="item-info">
										<header>
											<Link to={`/${product?.id}`}>
												<h4>{product.name}</h4>
											</Link>
											<h4 className="price">{product.year}</h4>
										</header>
										<p className="item-text">
											Điểm đánh giá: {product.evaluate}
										</p>
										<p className="item-text">{product.description}</p>
									</div>
								</article>
							);
					  })
					: newData.map((product, index) => {
							return (
								<article key={index} className="menu-item">
									<Link to={`/${product?.id}`}>
										<img
											src={product.image}
											alt={product.name}
											className="photo"
										/>
									</Link>
									<div className="item-info">
										<header>
											<Link to={`/${product?.id}`}>
												<h4>{product.name}</h4>
											</Link>
											<h4 className="price">{product.year}</h4>
										</header>
										<p className="item-text">
											Điểm đánh giá: {product.evaluate}
										</p>
										<p className="item-text">{product.description}</p>
									</div>
								</article>
							);
					  })}
			</div>
		);
	};

	return (
		<main>
			<section className="menu section">
				<div className="title">
					<h2>Phim Hay</h2>
					<div className="underline"></div>
				</div>
				{typeMenu()}
				{render()}
			</section>
		</main>
	);
};

export default UserHomePage;
