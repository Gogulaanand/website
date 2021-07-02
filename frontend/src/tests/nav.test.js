import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Nav from "../../components/index/nav";
import AppContext from "../../context/AppContext";

describe("check default elements", () => {
  test("<Nav/>", () => {
    const cart = jest.fn();
    cart.totalQuantity = 5;
    const { container } = render(
      <AppContext.Provider value={{ cart }}>
        <Nav />
      </AppContext.Provider>
    );
    expect(screen.getByTitle("Home")).toBeInTheDocument();
    expect(screen.getByTitle("Contact us")).toBeInTheDocument();
    expect(screen.getByTitle("Our products")).toBeInTheDocument();
  });
});
