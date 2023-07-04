import { createContext, useState, useEffect } from "react";
import mal from "./apis/mal";

export const AnimeContext = createContext();

const getWatchListFromStorage = () => {
	let watchList = localStorage.getItem("watchList");
	if (watchList) {
		watchList = JSON.parse(localStorage.getItem("watchList"));
	} else {
		watchList = [];
	}
	return watchList;
};

export const AnimeContextProvider = (props) => {
	const [animes, setAnimes] = useState();
	const [watchList, setWatchList] = useState(getWatchListFromStorage());
	const [schedule, setSchedule] = useState();

	const getRightTime = (time) => {
		if (time) {
			const hour = time.slice(0, 2);
			let newTime = parseInt(hour) - 6;
			if (newTime >= 24) {
				newTime = newTime - 24;
			}
			if (newTime < 0) {
				newTime = 24 + newTime;
			}
			if (newTime < 10) {
				newTime = "0" + newTime.toString();
			}
			newTime = newTime + time.slice(2);
			return newTime;
		}
		return time;
	};

	const getRightDay = (time, day) => {
		if (time) {
			const hour = time.slice(0, 2);
			let newDay = day;
			if (hour < 6) {
				switch (day) {
					case "Mondays":
						newDay = "Sundays";
						break;
					case "Tuedays":
						newDay = "Mondays";
						break;
					case "Wednesdays":
						newDay = "Tuesdays";
						break;
					case "Thursdays":
						newDay = "Wednesdays";
						break;
					case "Fridays":
						newDay = "Thursdays";
						break;
					case "Saturdays":
						newDay = "Fridays";
						break;
					case "Sundays":
						newDay = "Saturdays";
						break;
					default:
						newDay = day;
				}
			}
			return newDay;
		}
		return day;
	};

	const addToWatchList = (id) => {
		const alreadyInWatchList = watchList.find((anime) => anime.id === id);
		if (alreadyInWatchList) return;
		const anime = animes.find((anime) => anime.id === id);
		const updatedWatchList = [...watchList, anime];
		setWatchList(updatedWatchList);
		localStorage.setItem("watchList", JSON.stringify(updatedWatchList));
	};

	const removeFromWatchList = (id) => {
		const updatedWatchList = watchList.filter((anime) => anime.id !== id);
		setWatchList(updatedWatchList);
		localStorage.setItem("watchList", JSON.stringify(updatedWatchList));
	};

	useEffect(() => {
		if (watchList.length > 0) {
			setSchedule(watchList);
		} else {
			setSchedule(animes);
		}
	}, [watchList]);

	useEffect(() => {
		let isMounted = true;
		const fetchData = async () => {
			try {
				const response = await mal.get("seasons/now");
				const aniInfo = response.data.data.map((anime) => {
					return {
						id: anime.mal_id,
						title: anime.title,
						img: anime.images.jpg.image_url,
						studio: anime.studios[0].name,
						synopsis: anime.synopsis,
						type: anime.type,
						day: getRightDay(anime.broadcast.time, anime.broadcast.day),
						time: getRightTime(anime.broadcast.time),
						aired: anime.aired.string,
					};
				});
				if (isMounted) {
					setAnimes(aniInfo);
					watchList.length > 0 ? setSchedule(watchList) : setSchedule(aniInfo);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
		return () => (isMounted = false);
	}, []);

	return (
		<AnimeContext.Provider
			value={{
				animes,
				addToWatchList,
				removeFromWatchList,
				schedule,
				watchList,
			}}
		>
			{props.children}
		</AnimeContext.Provider>
	);
};
