import { Route, Routes } from "react-router";
import "./App.css";
import { useTheme } from "./theme/useTheme";
import { MainPageAsync } from "./pages/MainPage/MainPageAsync";
import { AboutPageAsync } from "./pages/AboutPage/AboutPageAsync";
import { Suspense } from "react";

function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <div className={`app ${theme}`}>
        <button onClick={toggleTheme}>Toggle theme</button>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={"/"} element={<MainPageAsync />} />
            <Route path={"/about"} element={<AboutPageAsync />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
