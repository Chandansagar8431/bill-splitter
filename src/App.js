import Landing from "./layouts/landing";
import Login from "./components/login";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Landing />}></Route>
    </Routes>
  );
}

export default App;
