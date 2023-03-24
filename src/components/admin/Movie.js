import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movie = () => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const movie = JSON.parse(localStorage.getItem("movies"));
		setMovies([...movie]);
	}, []);
	return (
		<div className="table_contain">
			{movies?.map((product, index) => (
				<article key={index} className="menu-item">
					<Link to={`/${product?.id}`}>
						<img src={product.image} alt={product.name} className="photo" />
					</Link>
					<div className="item-info">
						<header>
							<Link to={`/${product?.id}`}>
								<h4>{product.name}</h4>
							</Link>
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
