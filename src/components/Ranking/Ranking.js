import React, { useEffect, useState } from "react";
// import { keys, get, set } from "idb-keyval";
import Points from "../PlayerPoints/Points";
import { firebase } from "../../firebaseConfig";

function Ranking(props) {
  const [players, setPlayers] = useState([]);
  const snapshotToArray = (snapshot) => {
    const ret = [];
    snapshot.forEach((childSnapshot) => {
      ret.push(childSnapshot);
    });
    return ret;
  };

  useEffect(() => {
    const statsRef = firebase.database().ref(`stats`);
    statsRef
      .orderByChild("points_x")
      .once("value")
      .then((list) => {
        snapshotToArray(list)
          .reverse()
          .forEach((record) => {
            console.log(record);
            // console.log(record.child("player_x").val());
            setPlayers((players) => [
              ...players,
              {
                player_x: record.child("player_x").val(),
                points_x: record.child("points_x").val(),
              },
            ]);
          });
      });

    //   , (snapshot) => {
    // if (snapshot.exists()) {
    //   const statsData = snapshot.val();
    //   console.log("statsData", statsData);
    // }
    // });
  }, []);

  return (
    <>
      <div className="detailsContainer">
        <div className="title">Ranking</div>
        {console.log("players", players)}
        {players.map((item, index) => {
          return (
            <li>
              {item.player_x} - {item.points_x}
            </li>
          );
        })}
      </div>
    </>
  );
}

export default Ranking;
