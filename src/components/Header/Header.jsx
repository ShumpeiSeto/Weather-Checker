// import reactImg from "../../assets/react-core-concepts.png";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <link rel="icon" href="data:," />
      {/* <img src={reactImg} alt="Stylized atom" /> */}
      <h1>
        PEIPEIの
        <br />
        お天気占い❤
      </h1>
      <p className="subtitle">あなたの一日を彩る、心地よい天気情報</p>
    </header>
  );
}
