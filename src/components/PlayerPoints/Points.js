import React from "react";
import "../../styles/Points.scss";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { Stack, Typography } from "@mui/material";
import { red, green } from "@mui/material/colors";

function Points(props) {
  let playerPoints = [0, 0, 0];
  playerPoints = props.points;
  let title = "";
  title = props.title;
  let currentPlayer = 0;
  currentPlayer = props.currentPlayer;
  let youArePlayer = 0;
  youArePlayer = props.youArePlayer;

  let gameStatus = 0;
  gameStatus = props.gameStatus;

  return (
    <>
      <div className="details-container">
        {/*<div className="title">{title}</div>*/}
        <div className="points-container">
          <div className="item">
            <Stack direction="row" alignItems="center" gap={1}>
              <CloseOutlinedIcon sx={{ color: red[900] }} />
              Player 1: {playerPoints[0]}
            </Stack>
          </div>
          <div className="item">
            <Stack direction="row" alignItems="center" gap={1}>
              <CircleOutlinedIcon sx={{ color: green[800] }} /> Player 2:{" "}
              {playerPoints[1]}
            </Stack>
          </div>

          <div className="item">
            <Stack direction="row" alignItems="center" gap={1}>
              Tie: {playerPoints[2]}
            </Stack>
          </div>
        </div>
        {gameStatus === 1 && (
          <div className="whosMove">
            <Stack direction="row" alignItems="center" gap={1}>
              Current move:
              {currentPlayer === 1 ? (
                <CloseOutlinedIcon sx={{ color: red[900] }} />
              ) : currentPlayer === 2 ? (
                <CircleOutlinedIcon sx={{ color: green[800] }} />
              ) : (
                ""
              )}
              {currentPlayer === youArePlayer
                ? " - it's your move!"
                : " - it's opponent move!"}
            </Stack>
          </div>
        )}
        {gameStatus === 2 && <div className="whosMove">Game over!</div>}
      </div>
    </>
  );
}

export default Points;
