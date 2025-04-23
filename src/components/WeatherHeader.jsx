import TabButton from "./TabButton";
import Section from "./Section";
import Tabs from "./Tabs";
import "./WeatherHeader.css";
export default function WeatherHeader({
  weekClick,
  dailyClick,
  resetClick,
  viewMode,
  key,
}) {
  return (
    <Section title="お天気チェック" id="examples">
      <Tabs
        buttons={
          <>
            <TabButton
              key="1"
              isSelected={viewMode === "weekmode"}
              onClick={() => weekClick("weekmode")}
            >
              weekmode
            </TabButton>
            <TabButton
              key="2"
              isSelected={viewMode === "dailymode"}
              onClick={() => dailyClick("dailymode")}
            >
              dailymode
            </TabButton>
            <TabButton
              key="0"
              isSelected={viewMode === "resetMode"}
              onClick={() => resetClick("resetMode")}
            >
              reset
            </TabButton>
            {console.log(viewMode)}
          </>
        }
      ></Tabs>
    </Section>
  );
}
