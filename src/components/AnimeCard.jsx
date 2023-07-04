import { FcMinus, FcPlus } from "react-icons/fc";
import { useContext } from "react";
import { AnimeContext } from "../AnimeContext";

const AnimeCard = ({ anime }) => {
	const { addToWatchList, removeFromWatchList, watchList } =
		useContext(AnimeContext);
	const renderButton = (id, type) => {
		if (type !== "TV") {
			return;
		}
		const fave = watchList.find((anime) => anime.id === id);
		if (fave) {
			return (
				<button
					className="btn-fave"
					onClick={() => removeFromWatchList(anime.id)}
				>
					<FcMinus />
				</button>
			);
		} else {
			return (
				<button
					className="btn-fave"
					onClick={() => addToWatchList(anime.id)}
				>
					<FcPlus />
				</button>
			);
		}
	};

	return (
		<div
			key={anime.id}
			className="anime-card"
		>
			{renderButton(anime.id, anime.type)}
			<div className="card-title">
				<h4>{anime.title}</h4>
			</div>
			<div className="card-body">
				<img
					className="card-image"
					src={anime.img}
					alt={anime.title}
				/>
				<div className="card-text">
					<p className="studio">{anime.studio}</p>
					<hr />
					<p className="description">{anime.synopsis}</p>
				</div>
			</div>
			{anime.type === "TV" && anime.day ? (
				<div className="card-time">
					{anime.day} at {anime.time} (MSK)
				</div>
			) : (
				<div className="card-time">
					{anime.type} ({anime.aired})
				</div>
			)}
		</div>
	);
};
export default AnimeCard;
