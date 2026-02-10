import Header from "./components/Header/Header.jsx";
import Examples from "./components/Examples.jsx";
import WeatherChecker from "./components/WeatherChecker.jsx";

function App() {
  return (
    <>
      <Header />
      <main>
        <Examples />
        <WeatherChecker />
      </main>
    </>
  );
}

export default App;
