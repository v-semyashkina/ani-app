import { useContext, useEffect } from "react";
import { AnimeContext } from "../AnimeContext";
const currentDay = new Date().toLocaleString("en-us", { weekday: "long" });

const DayCard = ({ day }) => {
	const { animes, watchList, schedule } = useContext(AnimeContext);
	const days = day + "s";

	const aniInfo = schedule
		.filter((anime) => anime.time)
		.sort(
			(a, b) =>
				parseFloat(a.time.slice(0, 2) + a.time.slice(3)) -
				parseFloat(b.time.slice(0, 2) + b.time.slice(3))
		);
	return (
		<div>
			<h4 className={day === currentDay ? "current-weekday" : "weekday"}>
				{day}
			</h4>
			{aniInfo.map((anime) => {
				if (anime.day === days) {
					return (
						<div
							className="day-card"
							key={anime.id}
						>
							<p className="airing-title">{anime.title}</p>
							<p
								className={
									day === currentDay ? "current-airing-time" : "airing-time"
								}
							>
								{anime.time}
							</p>
						</div>
					);
				}
			})}
		</div>
	);
};
export default DayCard;
