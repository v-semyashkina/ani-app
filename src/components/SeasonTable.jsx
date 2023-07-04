import { useState, useEffect, useContext } from "react";
import AnimeCard from "./AnimeCard";
import { AnimeContext } from "../AnimeContext";

const date = new Date();

const getYear = () => {
	return date.getFullYear();
};

const getSeason = () => {
	const month = date.getMonth();
	switch (month) {
		case 0:
		case 1:
		case 2:
			return "winter";
		case 3:
		case 4:
		case 5:
			return "spring";
		case 6:
		case 7:
		case 8:
			return "summer";
		case 9:
		case 10:
		case 11:
			return "fall";
		default:
			return "winter";
	}
};

const season = getSeason();
const year = getYear();

const SeasonTable = () => {
	const { animes } = useContext(AnimeContext);

	return (
		<div>
			<h2 className="season-title">
				{season} {year}
			</h2>
			<div className="anime-table">
				{animes && animes.map((anime) => <AnimeCard anime={anime} />)}
			</div>
		</div>
	);
};
export default SeasonTable;
