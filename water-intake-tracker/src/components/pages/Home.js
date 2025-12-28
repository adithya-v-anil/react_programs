import Navbar from "../Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <div className="container mt-5 pt-5 text-center">

        <h1 className="mb-4">Welcome to Water Intake Tracker</h1>

        <p className="lead mb-4">
          Track your daily water intake, view history, and compare your
          consumption across different days.
        </p>

        <img
          src="https://www.robinage.com/wp-content/uploads/2024/05/water.jpg"
          alt="Water Tracker"
          className="img-fluid rounded shadow mb-4"
        />
      </div>
    </>
  );
}

export default Home;
