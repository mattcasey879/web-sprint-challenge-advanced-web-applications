import React from "react";
import MutationObserver from "mutationobserver-shim";

import { render, screen, waitFor } from "@testing-library/react";
import BubblePage from "./BubblePage";
import { fetchColorService as mockFetchColors } from "../services/fetchColorService";
import { BrowserRouter } from "react-router-dom";
jest.mock("../services/fetchColorService.js");
let colors = [
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

test("Renders without errors", async () => {
  mockFetchColors.mockResolvedValueOnce({ data: [] });
  render(<BubblePage />);
  await waitFor(() => {
    const title = screen.getByText(/colors/i);
    expect(title).toBeInTheDocument();
  });
});

test("Renders appropriate number of colors passed in through mock", async () => {
  mockFetchColors.mockResolvedValueOnce({ data: colors });

  const { rerender } = render(
    <BrowserRouter>
      <BubblePage />
    </BrowserRouter>
  );
  await waitFor(() => {
    const colors = screen.queryAllByTestId("color");
    expect(colors).toHaveLength(2);
  });

  //Keep in mind that our service is called on mount for this component.
});
