export default function About() {

  const showEnthusiasm = () => {
    document.getElementById("aboutMsg").innerText = "Hello from React! I love this page!";
    document.getElementById("aboutHeading").style.background = "lightblue";
  };

  return (
    <div className="card p-4 mb-4">
      <h3 id="aboutHeading" className="p-2">This is the About Page</h3>

      <p id="aboutMsg">Click the button to see my enthusiasm!</p>

      <button onClick={showEnthusiasm} className="btn btn-primary">
        Show Enthusiasm
      </button>
    </div>
  );
}
