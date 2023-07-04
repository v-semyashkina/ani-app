import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Schedule from "./pages/Schedule";
import Season from "./pages/Season";
import Header from "./components/Header";
import { AnimeContextProvider } from "./AnimeContext";

function App() {
	return (
		<main>
			<AnimeContextProvider>
				<BrowserRouter>
					<Header />
					<Routes>
						<Route
							path="/"
							element={<Schedule />}
						/>
						<Route
							path="/season"
							element={<Season />}
						/>
					</Routes>
				</BrowserRouter>
			</AnimeContextProvider>
		</main>
	);
}

export default App;
