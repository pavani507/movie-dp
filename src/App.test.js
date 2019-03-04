import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Demo from "./demo";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Demo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
