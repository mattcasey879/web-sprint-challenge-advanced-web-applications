import React from "react";
import MutationObserver from "mutationobserver-shim";

import { render, screen } from "@testing-library/react";
import ColorList from "./ColorList";
import { BrowserRouter } from "react-router-dom";

const colors = [
  {
    color: "blue",
    code: {
      hex: "#ffff",
    },
  },
  {
    color: "red",
    code: {
      hex: "#gggg",
    },
  },
];

test("Renders an empty list of colors without errors", () => {
  render(<ColorList colors={[]} />);
});

test("Renders a list of colors without errors", () => {
  render(
    <BrowserRouter>
      <ColorList colors={colors} />
    </BrowserRouter>
  );
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", () => {
  const { rerender } = render(
    <BrowserRouter>
      <ColorList colors={colors} editing={true} />
    </BrowserRouter>
  );
  const edit = screen.getByText(/edit color/i);
  expect(edit).toBeInTheDocument();
  rerender(
    <BrowserRouter>
      <ColorList colors={colors} editing={false} />
    </BrowserRouter>
  );
  expect(edit).not.toBeInTheDocument();
});
