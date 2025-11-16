export default function Home() {

  const showEnthusiasm = () => {
    document.getElementById("homeMsg").innerText ="Hello from React! I love this page!";
    document.getElementById("homeHeading").style.background = "lightblue";
  };

  return (
    <div className="card p-4 mb-4">
      <h3 id="homeHeading" className="p-2">This is the Home Page</h3>

      <p id="homeMsg">Click the button to see my enthusiasm!</p>

      <button onClick={showEnthusiasm} className="btn btn-primary">
        Show Enthusiasm
      </button>
    </div>
  );
}
