import { useState } from "react";
import "./ScreenshotForm.css";

function ScreenshotForm() {
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setError("");
    setImage(null);

    try {
      // Call backend API
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/screenshot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to capture screenshot");
      }

      const data = await response.json();
      setImage(`data:image/png;base64,${data.image}`);
      setUrl("");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screenshot-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter any website URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Capturing..." : "Capture Screenshot"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {image && (
        <div className="result">
          <h3>Captured Screenshot:</h3>
          <img src={image} alt="Website Screenshot" />
          <a href={image} download="screenshot.png">
            Download
          </a>
        </div>
      )}
    </div>
  );
}

export default ScreenshotForm;
