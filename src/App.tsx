import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card/Card";
import CardContainer from "./components/card_containers/CardContainer";

function App() {
  const [count, setCount] = useState(window.innerWidth < 750 ? 3 : 5);
  useEffect(() => {
    if (window.innerWidth < 750) {
      console.log("yo");

      setCount(3);
    } else {
      setCount(5);
    }
  }, [window.innerWidth]);
  return (
    <div
      className="w-full h-screen bg-gray-900
    "
    >
      <CardContainer limit={count}>
        {"*"
          .repeat(10)
          .split("")
          .map(() => (
            <Card />
          ))}
      </CardContainer>
    </div>
  );
}

export default App;
