import { render, screen } from "@testing-library/react";
import { TodoContainer } from "./container";

test("renders learn react link", () => {
  render(<TodoContainer />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
