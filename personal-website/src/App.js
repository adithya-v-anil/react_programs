import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <Outlet />
      </div>
    </div>
  );
}

export default App;