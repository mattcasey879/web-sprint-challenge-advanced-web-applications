import React from "react";
import MutationObserver from "mutationobserver-shim";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from "./Color";
import { BrowserRouter } from "react-router-dom";
const blankColor = {
  color: "",
  code: {
    hex: "",
  },
};

const color = {
  color: "blue",
  code: {
    hex: "#6093ca",
  },
};

test("Renders without errors with blank color passed into component", () => {
  render(
    <BrowserRouter>
      <Color color={blankColor} />
    </BrowserRouter>
  );
});

test("Renders the color passed into component", async () => {
  render(
    <BrowserRouter>
      <Color color={color} />
    </BrowserRouter>
  );
  await waitFor(() => {
    const color = screen.getByTestId("color");
    expect(color).toBeInTheDocument();
  });
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
  const funCall = jest.fn(() => {
    return "This is fake data";
  });
  render(
    <BrowserRouter>
      <Color
        deleteColor={() => funCall("fake")}
        setEditColor={() => jest.fn()}
        toggleEdit={() => funCall("mock")}
        color={color}
      />
    </BrowserRouter>
  );
  const x = screen.getByTestId("delete");
  userEvent.click(x);
  expect(funCall).toHaveBeenCalledTimes(3);
});

test("Executes setEditColor and toggleEdit property when color div is clicked", async () => {
  const funCall = jest.fn(() => {
    return "This is fake data";
  });
  render(
    <BrowserRouter>
      <Color
        setEditColor={() => jest.fn()}
        toggleEdit={() => funCall("mock")}
        color={color}
      />
    </BrowserRouter>
  );
  await waitFor(() => {
    const color = screen.getByTestId("color");
    userEvent.click(color);
    expect(funCall).toHaveBeenCalledTimes(3);
  });
});
