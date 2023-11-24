import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <div className="App font-mont min-h-screen max-w-[1800px] mx-auto">
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
