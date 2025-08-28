import ScreenshotForm from "../src/components/ScreenshotForm";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>Website Screenshot Tool 📸</h1>
      <p>Enter a website URL and capture its screenshot instantly!</p>
      <ScreenshotForm />
    </div>
  );
}

export default App;
