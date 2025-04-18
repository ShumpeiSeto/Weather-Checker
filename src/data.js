import componentsImg from "./assets/components.png";
import propsImg from "./assets/config.png";
import jsxImg from "./assets/jsx-ui.png";
import stateImg from "./assets/state-mgmt.png";
import {
  DiApple,
  DiAndroid,
  DiAppcelerator,
  DiAsterisk,
  DiAws,
} from "react-icons/di";

export const CORE_CONCEPTS = [
  {
    image: componentsImg,
    title: "Components",
    description:
      "The core UI building block - compose the user interface by combining multiple components.",
  },
  {
    image: jsxImg,
    title: "JSX",
    description:
      "Return (potentially dynamic) HTML(ish) code to define the actual markup that will be rendered.",
  },
  {
    image: propsImg,
    title: "Props",
    description:
      "Make components configurable (and therefore reusable) by passing input data to them.",
  },
  {
    image: stateImg,
    title: "State",
    description:
      "React-managed data which, when changed, causes the component to re-render & the UI to update.",
  },
];

export const EXAMPLES = {
  components: {
    title: "Components",
    description:
      "Components are the building blocks of React applications. A component is a self-contained module (HTML + optional CSS + JS) that renders some output.",
    code: `
function Welcome() {
  return <h1>Hello, World!</h1>;
}`,
  },
  jsx: {
    title: "JSX",
    description:
      "JSX is a syntax extension to JavaScript. It is similar to a template language, but it has full power of JavaScript (e.g., it may output dynamic content).",
    code: `
<div>
  <h1>Welcome {userName}</h1>
  <p>Time to learn React!</p>
</div>`,
  },
  props: {
    title: "Props",
    description:
      "Components accept arbitrary inputs called props. They are like function arguments.",
    code: `
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}`,
  },
  state: {
    title: "State",
    description:
      "State allows React components to change their output over time in response to user actions, network responses, and anything else.",
    code: `
function Counter() {
  const [isVisible, setIsVisible] = useState(false);

  function handleClick() {
    setIsVisible(true);
  }

  return (
    <div>
      <button onClick={handleClick}>Show Details</button>
      {isVisible && <p>Amazing details!</p>}
    </div>
  );
}`,
  },
};

export const REACT_LEARNING_TABS = [
  {
    id: "basics",
    label: "基本",
    content: {
      title: "React基礎",
      description: "Reactを始めるために必要な基本的な概念です。",
      topics: [
        { id: "setup", title: "環境構築", icon: "<DiApple />" },
        {
          id: "components-intro",
          title: "コンポーネント入門",
          icon: "<DiAndroid />",
        },
        { id: "jsx-basics", title: "JSXの基本", icon: "<DiAppceleraator />" },
        {
          id: "props-basics",
          title: "Propsの基本",
          icon: "<DiAsterisk />",
        },
        {
          id: "state-intro",
          title: "Stateの導入",
          icon: "<DiAws />",
        },
      ],
    },
  },
  {
    id: "intermediate",
    label: "中級",
    content: {
      title: "React中級テクニック",
      description: "アプリケーション開発に必要なより高度な概念です。",
      topics: [
        {
          id: "hooks-advanced",
          title: "フックの応用",
          icon: "hooks-advanced-icon.svg",
        },
        { id: "context", title: "Context API", icon: "context-icon.svg" },
        { id: "forms", title: "フォーム処理", icon: "forms-icon.svg" },
        { id: "routing", title: "ルーティング", icon: "routing-icon.svg" },
        { id: "api-integration", title: "APIとの連携", icon: "api-icon.svg" },
      ],
    },
  },
  {
    id: "advanced",
    label: "応用",
    content: {
      title: "React応用テクニック",
      description: "より複雑なアプリケーションを構築するための高度な概念です。",
      topics: [
        {
          id: "performance",
          title: "パフォーマンス最適化",
          icon: "performance-icon.svg",
        },
        {
          id: "custom-hooks",
          title: "カスタムフック",
          icon: "custom-hooks-icon.svg",
        },
        {
          id: "code-splitting",
          title: "コード分割",
          icon: "code-splitting-icon.svg",
        },
        { id: "suspense", title: "Suspense", icon: "suspense-icon.svg" },
        {
          id: "error-boundaries",
          title: "エラーバウンダリー",
          icon: "error-boundaries-icon.svg",
        },
      ],
    },
  },
  {
    id: "ecosystem",
    label: "エコシステム",
    content: {
      title: "Reactエコシステム",
      description: "Reactと組み合わせて使う主要なライブラリやツールです。",
      topics: [
        { id: "redux", title: "Redux", icon: "redux-icon.svg" },
        { id: "next-js", title: "Next.js", icon: "nextjs-icon.svg" },
        {
          id: "styled-components",
          title: "Styled Components",
          icon: "styled-components-icon.svg",
        },
        { id: "testing", title: "テスト手法", icon: "testing-icon.svg" },
        {
          id: "typescript",
          title: "TypeScript連携",
          icon: "typescript-icon.svg",
        },
      ],
    },
  },
];
