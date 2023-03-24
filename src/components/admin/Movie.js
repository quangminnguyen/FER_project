import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movie = () => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("movies")) || [];
		const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
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
				evaluate: Number.parseFloat(some / to || 0).toFixed(2),
			};
		});
		setMovies([...newAr]);
	}, []);

	const handleDelete = (index) => {
		const check = window.confirm("Xóa thật à?");
		if (!check) {
			return;
		}
		const ar = movies;
		ar.splice(index, 1);
		setMovies([...ar]);
		localStorage.removeItem("movies");
		localStorage.setItem("movies", JSON.stringify(ar));
	};
	return (
		<div className="table_contain">
			{movies?.map((product, index) => (
				<article key={index} className="menu-item">
					<Link to="/?type=movie">
						<img src={product.image} alt={product.name} className="photo" />
					</Link>
					<div className="item-info">
						<header>
							<h4 className="item-h4">
								{product.name}
								<div>
									<button onClick={() => handleDelete(index)}>Delete</button>
								</div>
							</h4>

							<h4 className="price">{product.year}</h4>
						</header>
						<p className="item-text">Điểm đánh giá: {product.evaluate}</p>
						<p className="item-text">{product.description}</p>
					</div>
				</article>
			))}
		</div>
	);
};

export default Movie;
