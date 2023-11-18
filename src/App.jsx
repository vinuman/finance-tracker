import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App font-mont">
        <Routes>
          <Route path="/" element={<Signup />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
