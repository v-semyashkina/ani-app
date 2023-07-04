import DayCard from "./DayCard";
import { useContext } from "react";
import { AnimeContext } from "../AnimeContext";

const weekDays = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

const WeekTable = () => {
	const { animes } = useContext(AnimeContext);
	return (
		<div className="week-table">
			{animes &&
				weekDays.map((day) => (
					<DayCard
						day={day}
						key={day}
					/>
				))}
		</div>
	);
};
export default WeekTable;
