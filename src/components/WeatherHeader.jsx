import TabButton from "./TabButton";
import Section from "./Section";
import Tabs from "./Tabs";
import "./WeatherHeader.css";
export default function WeatherHeader({
  weekClick,
  dailyClick,
  viewMode,
  key,
}) {
  return (
    <Section title="お天気チェック" className="weather-header">
      <Tabs
        buttons={
          <>
            <TabButton
              key="1"
              isSelected={viewMode === "weekmode"}
              onClick={() => weekClick("weekmode")}
            >
              ウィークモード
            </TabButton>
            <TabButton
              key="2"
              isSelected={viewMode === "dailymode"}
              onClick={() => dailyClick("dailymode")}
            >
              デイリーモード
            </TabButton>
            {/* <TabButton
              key="0"
              isSelected={viewMode === "resetMode"}
              onClick={() => resetClick("resetMode")}
            >
              reset
            </TabButton> */}
            {/* {console.log(viewMode)} */}
          </>
        }
      ></Tabs>
    </Section>
  );
}
