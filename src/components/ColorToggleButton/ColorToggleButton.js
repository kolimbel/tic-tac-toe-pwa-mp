import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export const ColorToggleButton = ({ handleStartTypeChange }) => {
  const [alignment, setAlignment] = React.useState("newGame");
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    handleStartTypeChange(newAlignment);
  };
  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="newGame">New Game</ToggleButton>
      <ToggleButton value="joinGame">Join Game</ToggleButton>
    </ToggleButtonGroup>
  );
};
