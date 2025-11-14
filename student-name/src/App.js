import { Link, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Student List</h2>

      <Link to="/student/Alexai">Alexai</Link><br />
      <Link to="/student/Meera">Meera</Link><br />
      <Link to="/student/John">John</Link><br />

      <br />

      <button onClick={() => navigate("/student/Riya")}>
        Go to Default Student
      </button>
    </div>
  );
}

export default App;

