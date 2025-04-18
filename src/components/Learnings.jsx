import { useState } from "react";

import TabButton from "./TabButton.jsx";
import Section from "./Section.jsx";
import Tabs from "./Tabs.jsx";
import { REACT_LEARNING_TABS } from "../data";
import CoreConcept from "./CoreConcept.jsx";
import {
  DiApple,
  DiAndroid,
  DiAppcelerator,
  DiAsterisk,
  DiAws,
} from "react-icons/di";

export default function Learnings() {
  const [selectedLearning, setSelectedLearning] = useState();
  function generateIcon(contentId) {
    if (contentId === "basics") {
      return <DiApple />;
    } else if (contentId === "intermediate") {
      return <DiAndroid />;
    } else if (contentId === "advanced") {
      return <DiAsterisk />;
    } else if (contentId === "ecosystem") {
      return <DiAppcelerator />;
    }
  }

  function handleSelect(selectedButton) {
    // selectedButton => 'components', 'jsx', 'props', 'state'
    setSelectedLearning(selectedButton);
    // console.log(selectedTopic);
    console.log(selectedLearning);
  }

  let tabContent = <p>Please select a topic.</p>;

  if (selectedLearning) {
    const [matchObj] = REACT_LEARNING_TABS.filter(
      (content) => content.id === selectedLearning
    );
    console.log(matchObj);

    const learningTopics = matchObj.content.topics.map((el) => (
      <li key={el.id}>
        <h4>{el?.title}</h4>
        {/* {el?.icon} */}
      </li>
    ));
    tabContent = (
      <>
        <div key={matchObj.id} id="tab-content">
          {generateIcon(selectedLearning)}
          <h3>{matchObj?.content?.title}</h3>
          <p>{matchObj?.content?.description}</p>
        </div>
        <div key={`${matchObj.id}-topics`} id={`${matchObj.id}-topic`}>
          <ul>{learningTopics}</ul>
        </div>
      </>
    );
  }

  return (
    <Section title="Learnings Map and EcoSystem" id="examples">
      <Tabs
        buttons={
          <>
            <TabButton
              isSelected={selectedLearning === "basics"}
              onClick={() => handleSelect("basics")}
              key="basics"
            >
              Basics
            </TabButton>
            <TabButton
              isSelected={selectedLearning === "intermediate"}
              onClick={() => handleSelect("intermediate")}
              key="intermediate"
            >
              Intermediate
            </TabButton>
            <TabButton
              isSelected={selectedLearning === "advanced"}
              onClick={() => handleSelect("advanced")}
              key="advanced"
            >
              Advanced
            </TabButton>
            <TabButton
              isSelected={selectedLearning === "ecosystem"}
              onClick={() => handleSelect("ecosystem")}
              key="ecosystem"
            >
              Ecosystem
            </TabButton>
          </>
        }
      >
        {tabContent}
      </Tabs>
    </Section>
  );
}
