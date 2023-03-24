import React, { useEffect, useRef, useState } from "react";
import "./style.css";
const Genre = () => {
	const [genres, setGenres] = useState([]);

	const genreRef = useRef();

	useEffect(() => {
		if (localStorage.getItem("types")) {
			setGenres(JSON.parse(localStorage.getItem("types")));
		}
	}, [localStorage.getItem("types")]);

	const handleDelete = (index) => {
		const check = window.confirm("Xóa cái này?");
		if (!check) {
			return;
		}
		const ar = genres;
		ar.splice(index, 1);
		localStorage.removeItem("types");
		localStorage.setItem("types", JSON.stringify(ar));
		setGenres([...ar]);
	};

	const handleAddGenre = () => {
		const gen = genreRef.current?.value;
		if (!gen) {
			return;
		}
		const ar = genres;
		const value = {
			id: ar[ar?.length - 1]?.id + 1,
			name: gen,
		};
		ar.push(value);
		localStorage.removeItem("types");
		localStorage.setItem("types", JSON.stringify(ar));
		setGenres([...ar]);
		genreRef.current.value = "";
	};
	return (
		<div className="table_contain">
			<div className="genre">
				<div className="genre_input">
					<input ref={genreRef} type="text" placeholder="Add genre..." />
					<button onClick={handleAddGenre}>Add</button>
				</div>
				{genres?.map((item, index) => (
					<div key={index + "Genre"} className="genre_items">
						{item?.name}
						<div className="genre_item_button">
							<button onClick={() => handleDelete(index)}>Delete</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Genre;
