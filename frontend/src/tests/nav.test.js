import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Nav from "components/index/nav";
import AppContext from "context/AppContext";
import { AuthProvider } from "context/AuthContext";

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
    const cart = jest.fn();
    cart.totalQuantity = 5;
    render(
      <AuthProvider>
        <AppContext.Provider value={{ cart }}>
          <Nav />
        </AppContext.Provider>
      </AuthProvider>
    );
    expect(screen.getByTitle("Home")).toBeInTheDocument();
    expect(screen.getByTitle("Contact us")).toBeInTheDocument();
    expect(screen.getByTitle("Our products")).toBeInTheDocument();
  });
});
