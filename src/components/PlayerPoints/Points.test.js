import { render, screen } from "@testing-library/react";

import Points from "./Points";

// test("fake", () => {
//   expect(true).toBeTruthy();
// });
describe("Points", () => {
  const playerPoints = [1, 3, 2];
  it("Should show points after render", () => {
    render(<Points title="" points={playerPoints} />);

    const pointsElement = screen.getByText(/Player 1: 1/i);
    expect(pointsElement).toBeInTheDocument();
  });
});
