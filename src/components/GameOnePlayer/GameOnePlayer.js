import React, { useEffect, useState } from "react";
import "../../styles/Game.scss";
import {
  checkGame,
  fillMatrix,
  fillMatrixToRemis,
  randomMove,
} from "../../helpers/game";
import Points from "../PlayerPoints/Points";
// import { set, get } from "idb-keyval";
import { v4 as uuidv4 } from "uuid";
// import { update } from "idb-keyval/dist/index";

function GameOnePlayer(props) {
  const [matrix, setMatrix] = useState(fillMatrix());
  const [currPlayer, setCurrPlayer] = useState(1);
  const [currWinner, setCurrWinner] = useState(0); //TODO change to game status

  // [fstPlayer, sndPlayer, tie]
  const [playerPoints, setPlayerPoints] = useState([0, 0, 0]);
  const [gameId] = useState(uuidv4());

  // useEffect(() => {
  //   const updateRanking = async () => {
  //     const best = await get("best");
  //
  //     if (playerPoints[0] > best[0]) {
  //       console.log("changing ranking");
  //       await update("best", (val) => playerPoints);
  //       const nowBest = await get("best");
  //       console.log("nowBest", nowBest);
  //     }
  //   };
  //   updateRanking().catch(console.error);
  //   // set("best", Array.from(playerPoints));
  // }, [playerPoints]);
  async function makeRandomMove() {
    let result = await randomMove(matrix);

    if (result.isTie) {
      setWinnerAndUpdatePoints(3);
    } else {
      let copy = [...matrix];
      copy[result.row][result.col] = 2;
      await setMatrix(copy);
      console.log("changed player");
      setCurrPlayer(1);
    }
  }

  async function clickCell(val, row, col) {
    if (val === 0 && currWinner === 0) {
      let copy = [...matrix];
      copy[row][col] = currPlayer;
      await setMatrix(copy);
      console.log("changed player");
      if (currPlayer === 1) {
        setCurrPlayer(2);
        await makeRandomMove();
      } else {
        setCurrPlayer(1);
      }
      check();
      /*      new Promise(() => {
              let copy = [...matrix];
              copy[row][col] = currPlayer;
              setMatrix(copy);
              console.log("changed player");
              if (currPlayer === 1) {
                setCurrPlayer(2);
              } else {
                setCurrPlayer(1);
              }
            }).then(check());*/
    } else {
      console.log("Niemożliwy ruch");
    }
  }

  const setWinnerAndUpdatePoints = (player) => {
    if (player === 1) {
      setPlayerPoints((prevPoints) => [
        prevPoints[0] + 1,
        prevPoints[1],
        prevPoints[2],
      ]);
      setCurrWinner(1);
    } else if (player === 2) {
      setPlayerPoints((prevPoints) => [
        prevPoints[0],
        prevPoints[1] + 1,
        prevPoints[2],
      ]);
      setCurrWinner(2);
    } else if (player === 3) {
      setPlayerPoints((prevPoints) => [
        prevPoints[0],
        prevPoints[1],
        prevPoints[2] + 1,
      ]);
      setCurrWinner(2);
    }
    setCurrWinner(0);
    setMatrix(fillMatrix());
  };

  const check = () => {
    const result = checkGame(matrix);
    if (result.gameOver === true) {
      setWinnerAndUpdatePoints(result.winner);
    }
  };

  const listItems = matrix.map((items, index) => {
    return (
      <div className="row">
        {items.map((subItems, sIndex) => {
          return (
            <div
              className={
                subItems.valueOf(sIndex) === 0
                  ? "cell"
                  : subItems.valueOf(sIndex) === 1
                  ? "cell--x"
                  : "cell--o"
              }
              onClick={() => clickCell(subItems.valueOf(sIndex), index, sIndex)}
            ></div>
          );
        })}
      </div>
    );
  });

  return (
    <>
      <div className="main-container">
        <Points title="Game type: One player" points={playerPoints} />
        <div className="">
          <div className="matrix">{listItems}</div>
        </div>
      </div>
    </>
  );
}

export default GameOnePlayer;
