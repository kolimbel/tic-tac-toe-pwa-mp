import React, { useState, useEffect } from "react";
import "../../styles/Game.scss";
import { v4 } from "uuid";
import {
  checkGame,
  fillMatrix,
  fillMatrixToRemis,
  getRandomName,
} from "../../helpers/game";
import Points from "../PlayerPoints/Points";

import { firebase } from "../../firebaseConfig";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { ColorToggleButton } from "../ColorToggleButton/ColorToggleButton";

function GameMultiplayer(props) {
  const [gameId, setGameId] = useState(getRandomName());
  const [matrix, setMatrix] = useState(fillMatrix());
  const [currPlayer, setCurrPlayer] = useState(1);
  const [currWinner, setCurrWinner] = useState(0);
  const [gameStatus, setGameStatus] = useState(0);
  const [startType, setStartType] = useState("newGame");

  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [isJoinTheGame, setJoinTheGame] = useState(false);
  const [youArePlayer, setYouArePlayer] = useState(1);

  const [playerPoints, setPlayerPoints] = useState([0, 0, 0]);

  const onStartTypeChange = (type) => {
    if (type === "newGame" || "joinGame") {
      setStartType(type);
    }
  };

  useEffect(() => {
    const gameRef = firebase.database().ref(`games/${gameId}`);
    let player_x = null;
    let player_o = null;
    gameRef.child("player_x").on("value", (snapshot) => {
      player_x = snapshot.val();
    });
    gameRef.child("player_o").on("value", (snapshot) => {
      player_o = snapshot.val();
    });
  }, []);

  useEffect(() => {
    console.log("useEffect - get from firebase");
    const gameRef = firebase.database().ref(`games/${gameId}`);
    gameRef.child("currentMatrix").on("value", (snapshot) => {
      console.log("snapshot", snapshot.val());
      if (snapshot.exists() && !!snapshot.val()) setMatrix(snapshot.val());
    });

    gameRef.child("gameStatus").on("value", (snapshot) => {
      if (snapshot.exists()) {
        console.log("exist gameStatus");
        setGameStatus(snapshot.val());
      } else console.log("not exist gameStatus");
    });

    gameRef.child("currentPlayer").on("value", (snapshot) => {
      if (snapshot.exists()) {
        console.log("setCurrPlayer(snapshot.val());", snapshot.val());
        setCurrPlayer(snapshot.val());
      } else {
        console.log("not exist currentPlayer");
      }
    });

    gameRef.child("playerPoints").on("value", (snapshot) => {
      if (snapshot.exists()) {
        setPlayerPoints(snapshot.val());
      }
    });
  }, [gameId, currPlayer]);

  useEffect(() => {
    updateDb(true);
  }, [playerPoints]);

  useEffect(() => {
    const updateDbCurrPlayer = () => {
      const gameRef = firebase.database().ref(`games/${gameId}`);

      if (!!firebase.auth().currentUser) {
        gameRef.update({
          currentPlayer: currPlayer,
        });
      }
    };
    updateDbCurrPlayer();
  }, [currPlayer]);

  const updateDb = (clearMatrix) => {
    console.log("updateDb");
    // console.log("gameId", gameId);
    const gameRef = firebase.database().ref(`games/${gameId}`);

    if (!!firebase.auth().currentUser) {
      const playerId = firebase.auth().currentUser.uid;
      console.log("currentUser2", firebase.auth().currentUser);

      if (clearMatrix) {
        gameRef.update({
          currentMatrix: matrix,
          playerPoints: playerPoints,
        });
      } else {
        gameRef.update({
          playerPoints: playerPoints,
          currentMatrix: matrix,
        });
      }
    }
    return true;
  };

  async function clickCell(val, row, col) {
    if (
      val === 0 &&
      currWinner === 0 &&
      currPlayer === youArePlayer &&
      gameStatus === 1
    ) {
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
    } else {
      console.log("Niemożliwy ruch");
    }
  }

  const setWinnerAndUpdatePoints = async (player) => {
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
    } else {
      updateDb(false);
    }
  };

  const startGame = () => {
    console.log("start game", name, pin, isJoinTheGame);
    if (!!name) {
      if (isJoinTheGame) {
        if (!!pin && pin.length === 4) {
          const gamesRef = firebase.database().ref(`games/`);
          gamesRef
            .orderByChild("pin")
            .equalTo(pin.toString())
            .once("value", (snapshot) => {
              if (snapshot.exists()) {
                const gameData = snapshot.val();
                console.log("exists!", Object.keys(snapshot.val())[0]);
                const gameRef = firebase
                  .database()
                  .ref(`games/${Object.keys(snapshot.val())[0]}`);

                gameRef.update({
                  player_o: name.toString(),
                  pin: "",
                  gameStatus: 1,
                });
                setYouArePlayer(2);
                setGameId(Object.keys(snapshot.val())[0]);
              } else {
                console.log("not exist");
              }
            });
        } else console.log("incorrect pin");
      } else {
        const gameIdNumber = gameId.replace(/\D/g, "");

        setPin(
          gameIdNumber.slice(gameIdNumber.length - 4, gameIdNumber.length)
        );
        const gameRef = firebase.database().ref(`games/${gameId}`);

        if (!!firebase.auth().currentUser) {
          gameRef.set({
            player_x: name.toString(),
            player_o: "",
            gameStatus: 0,
            pin: gameIdNumber
              .slice(gameIdNumber.length - 4, gameIdNumber.length)
              .toString(),
            currentPlayer: currPlayer,
            currentMatrix: matrix,
          });
        }
      }
    } else {
      console.log("empty name");
    }
  };

  const finishGame = () => {
    if (gameStatus === 1) {
      setGameStatus(2);
      const gameRef = firebase.database().ref(`games/${gameId}`);
      const statsRef = firebase.database().ref(`stats/${gameId}`);

      if (!!firebase.auth().currentUser) {
        gameRef.update({
          playerPoints: playerPoints,
          currentPlayer: currPlayer,
          gameStatus: 2,
        });
        let player_x = "";
        let player_o = "";
        gameRef.child("player_x").once("value", (snapshot) => {
          if (snapshot.exists()) {
            player_x = snapshot.val();
          }
        });
        gameRef.child("player_o").once("value", (snapshot) => {
          if (snapshot.exists()) {
            player_o = snapshot.val();
          }
        });

        statsRef.set({
          player_x: player_x.toString(),
          points_x: playerPoints[0],
          player_o: player_o.toString(),
          points_o: playerPoints[1],
          tie: playerPoints[2],
        });
      }
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
        <div className="userName">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <ColorToggleButton handleStartTypeChange={onStartTypeChange} />

        {startType === "joinGame" && (
          <div className="pinCode">
            <TextField
              id="outlined-basic"
              label="PIN"
              variant="outlined"
              type="number"
              value={pin}
              onChange={(e) => {
                if (e.target.value < 1000 && e.target.value > 9999) {
                  setPin("");
                  console.log("incorrect pin");
                } else {
                  setPin(e.target.value);
                }
              }}
            />
          </div>
        )}
        <div>
          <Button
            variant="outlined"
            onClick={() => startGame()}
            color="primary"
          >
            Start
          </Button>
        </div>
        <Points
          title="Game type: multiplayer"
          points={playerPoints}
          currentPlayer={currPlayer}
        />
        {youArePlayer}
        <h2>gameStatus: {gameStatus.toString()}</h2>
        <div className="">
          <div className="matrix">{listItems}</div>
        </div>
        <Button variant="outlined" onClick={() => finishGame()} color="error">
          End game
        </Button>
      </div>
    </>
  );
}

export default GameMultiplayer;
