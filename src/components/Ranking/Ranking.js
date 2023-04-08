import React, { useEffect, useState } from "react";
import Points from "../PlayerPoints/Points";
import { firebase } from "../../firebaseConfig";
import { Box } from "@mui/material";

function snapshotToArray(snapshot) {
  const ret = [];
  snapshot.forEach((childSnapshot) => {
    ret.push({
      player_x: childSnapshot.child("player_x").val(),
      points_x: childSnapshot.child("points_x").val(),
    });
  });
  return ret.reverse();
}

function Ranking(props) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const statsRef = firebase.database().ref(`stats`);
    statsRef
      .orderByChild("points_x")
      .once("value")
      .then((list) => {
        setPlayers(snapshotToArray(list));
      });
  }, []);

  return (
    <>
      <div className="detailsContainer">
        <div className="title">Ranking</div>
        {players.map((item, index) => {
          return (
            <div key={index}>
              <Box
                component="span"
                sx={{
                  display: "block",
                  p: 1,
                  m: 1,
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#101010" : "#fff",
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "grey.300" : "grey.800",
                  border: "1px solid",
                  borderColor: (theme) =>
                    theme.palette.mode === "dark" ? "grey.800" : "grey.300",
                  borderRadius: 2,
                  fontSize: "0.875rem",
                  fontWeight: "700",
                }}
              >
                {item.player_x} - {item.points_x}
              </Box>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Ranking;
