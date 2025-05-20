import { useState } from "react";

import TabButton from "./TabButton.jsx";
import Section from "./Section.jsx";
import Tabs from "./Tabs.jsx";
import { EXAMPLES } from "../data.jsx";
import { WEATHER_KNOWLEDGE } from "../data.jsx";

export default function Examples() {
  const [selectedTopic, setSelectedTopic] = useState();

  function handleSelect(selectedButton) {
    // selectedButton => 'components', 'jsx', 'props', 'state'
    setSelectedTopic(selectedButton);
    // console.log(selectedTopic);
  }

  let tabContent = <p>Please select a topic.</p>;

  if (selectedTopic) {
    tabContent = (
      <div id="tab-content">
        <h3>{WEATHER_KNOWLEDGE[selectedTopic].title}</h3>
        <p>{WEATHER_KNOWLEDGE[selectedTopic].description}</p>
        {WEATHER_KNOWLEDGE[selectedTopic].content}
      </div>
    );
  }

  return (
    <Section title="天気予報について" id="examples">
      <Tabs
        buttons={
          <>
            <TabButton
              isSelected={selectedTopic === "forecasting"}
              onClick={() => handleSelect("forecasting")}
            >
              天気予報のしくみ
            </TabButton>
            <TabButton
              isSelected={selectedTopic === "symbols"}
              onClick={() => handleSelect("symbols")}
            >
              天気記号の見方
            </TabButton>
            <TabButton
              isSelected={selectedTopic === "seasons"}
              onClick={() => handleSelect("seasons")}
            >
              季節と天気
            </TabButton>
            <TabButton
              isSelected={selectedTopic === "tips"}
              onClick={() => handleSelect("tips")}
            >
              おすすめの天気対策
            </TabButton>
          </>
        }
      >
        {tabContent}
      </Tabs>
    </Section>
  );
}
