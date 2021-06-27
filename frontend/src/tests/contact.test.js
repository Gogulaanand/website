import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Contact from "../../components/index/contact";
/**
 * @jest-environment jsdom
 */
describe("check default elements", () => {
  test("<Contact/>", () => {
    const { getByText } = render(<Contact />);
    expect(getByText("Contact Us")).toBeInTheDocument();
  });
});
