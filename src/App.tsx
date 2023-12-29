import { Outlet, Route, Routes } from "react-router-dom";
import { GOLF_URL } from "./constant";
import { HomePage } from "./home-page/HomePage";
import HomeRanking from "./ranking/home/HomeRanking";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path={GOLF_URL.RANKING} element={<Outlet />}>
          <Route index element={<HomeRanking />} />
          <Route path={GOLF_URL.RANKING_NEWS} element={<div>news</div>} />
          <Route
            path={GOLF_URL.RANKING_TOURNAMENT}
            element={<div>tournament</div>}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
