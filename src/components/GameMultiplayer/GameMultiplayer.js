import React, { useState, useEffect } from "react";
import "../../styles/Game.scss";
import { checkGame, fillMatrix, fillMatrixToRemis } from "../../helpers/game";
import Points from "../PlayerPoints/Points";
import { v4 as uuidv4 } from "uuid";
// import { set, get, update } from "idb-keyval";
import { firebase } from "../../firebaseConfig";

function GameMultiplayer(props) {
  const [matrix, setMatrix] = useState(fillMatrix());
  const [currPlayer, setCurrPlayer] = useState(1);
  const [currWinner, setCurrWinner] = useState(0);

  // [fstPlayer, sndPlayer, tie]
  const [playerPoints, setPlayerPoints] = useState([0, 0, 0]);

  const [gameId] = useState(uuidv4());

  useEffect(() => {
    // const updateRanking = async () => {
    //   // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA");
    //   const best = await get("best");
    //
    //   if (playerPoints[0] > best[0]) {
    //     console.log("changing ranking");
    //     await update("best", (val) => playerPoints);
    //     const nowBest = await get("best");
    //     console.log("nowBest", nowBest);
    //   }
    // };
    // updateRanking().catch(console.error);
    // const addGame = async () => {
    //   await set(gameId.toString(), playerPoints);
    // };
    // addGame().catch(console.error);
  }, [playerPoints]);

  async function clickCell(val, row, col) {
    const playerId = "test";
    const playerRef = firebase.database().ref(`players/${playerId}`);
    console.log("wyw");
    console.log("currentUser", firebase.auth().currentUser);

    if (!!firebase.auth().currentUser) {
      console.log("currentUser2", firebase.auth().currentUser);
      playerRef.set({
        id: playerId,
        cos: "coooos",
      });
    }
    if (val === 0 && currWinner === 0) {
      let copy = [...matrix];
      copy[row][col] = currPlayer;
      await setMatrix(copy);
      console.log("changed player");
      if (currPlayer === 1) {
        setCurrPlayer(2);
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
        <Points title="Game type: Two players" points={playerPoints} />
        <div className="">
          <div className="matrix">{listItems}</div>
        </div>
      </div>
    </>
  );
}

export default GameMultiplayer;
