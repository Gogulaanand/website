import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Nav from "@/components/index/nav";
import AppContext from "@/context/AppContext";

describe("check default elements", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test("<Nav/>", () => {
    let totalQuantity = 5;
    render(
      <AppContext.Provider value={{ totalQuantity }}>
        <Nav />
      </AppContext.Provider>
    );
    expect(screen.getByTitle("Home")).toBeInTheDocument();
    expect(screen.getByTitle("Contact us")).toBeInTheDocument();
    expect(screen.getByTitle("Our products")).toBeInTheDocument();
  });
});
