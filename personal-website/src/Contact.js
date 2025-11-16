export default function Contact() {

  const showEnthusiasm = () => {
    document.getElementById("contactMsg").innerText ="Hello from React! I love this page!";
    document.getElementById("contactHeading").style.background = "lightblue";
  };

  return (
    <div className="card p-4 mb-4">
      <h3 id="contactHeading" className="p-2">This is the Contact Page</h3>

      <p id="contactMsg">Click the button to see my enthusiasm!</p>

      <button onClick={showEnthusiasm} className="btn btn-primary">
        Show Enthusiasm
      </button>
    </div>
  );
}
