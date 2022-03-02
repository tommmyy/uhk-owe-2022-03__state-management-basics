import { useState } from "react";
import "./styles.css";

export default function App() {
  const [text, setText] = useState("");
  const [cookiesEnabled, setCookiesEnabled] = useState(false);

  return (
    <div className="w-50 m-auto">
      <p>
        <label htmlFor="cookies-input">Povolit cookies? </label>
        <input
          id="cookies-input"
          type="checkbox"
          checked={cookiesEnabled}
          onChange={(event) => {
            setCookiesEnabled(!!event.target.checked);
          }}
        />
      </p>
      <p>
        <input
          className="w-100"
          placeholder="I am here just to show rerenders."
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
      </p>
    </div>
  );
}
