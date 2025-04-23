import Header from "./components/Header/Header.jsx";
import CoreConcepts from "./components/CoreConcepts.jsx";
import Examples from "./components/Examples.jsx";
import Learnings from "./components/Learnings.jsx";
import WeatherChecker from "./components/WeatherChecker.jsx";

function App() {
  return (
    <>
      <Header />
      <main>
        {/* <CoreConcepts /> */}
        {/* <Examples /> */}
        {/* <Learnings /> */}
        <WeatherChecker />
      </main>
    </>
  );
}

export default App;
