import React, { useEffect, useState } from "react";
// import { keys, get, set } from "idb-keyval";
import Points from "../PlayerPoints/Points";

function Ranking(props) {
  // const [arr, setArr] = useState(null);
  // const [points, setPoints] = useState(null);
  // useEffect(() => {
  //   keys()
  //     .then(async (keys) => {
  //       await setArr(keys);
  //       let tempArrayPoints = [];
  //       Array.from(keys).map((key) => {
  //         get(key).then((value) => {
  //           tempArrayPoints.push(value);
  //         });
  //       });
  //       setPoints(tempArrayPoints);
  //     })
  //     .then((keys) => {});
  // }, []);

  const [value, setValue] = useState([0, 0, 0]);
  // const [arr, setArr] = useState(null);
  // const [points, setPoints] = useState(null);

  useEffect(() => {
    async function getBest() {
      // const best = await get("best");
      const best = 999;
      console.log("best", best);
      setValue(best);
    }
    getBest().catch(console.error);

    // async function getAll() {
    //   async function getKeys() {
    //     keys().then(async (keys) => {
    //       await setArr(keys);
    //     });
    //   }
    //   await getKeys();
    //
    //   async function getValues() {
    //     let tempArrayPoints = [];
    //     Array.from(arr).map((key) => {
    //       get(key).then((value) => {
    //         tempArrayPoints.push(value);
    //       });
    //     });
    //     // tempArrayPoints.sort(function (a, b) {
    //     //   return a[0] - b[0];
    //     // });
    //     setPoints(tempArrayPoints);
    //   }
    //   await getValues();
    // }
    // getAll().catch(console.error);
  }, []);

  return (
    <>
      <>
        <Points title="Ranking - best game:" points={Array.from(value)} />
        {console.log(value)}

        {/*<ul>*/}
        {/*  {points.map((element) => {*/}
        {/*    return <li>{element}</li>;*/}
        {/*  })}*/}
        {/*</ul>*/}

        {/*<ul>*/}
        {/*  /!*{arr.map((key) => {*!/*/}

        {/*  /!*  get(key).then((value) => {*!/*/}
        {/*  /!*    console.log(key, value);*!/*/}
        {/*  /!*    <li>{value}</li>;*!/*/}
        {/*  /!*  });*!/*/}
        {/*  /!*})}*!/*/}
        {/*  {console.log("points", points)}*/}
        {/*  {points.map((value) => {*/}
        {/*    return <li>{value}</li>;*/}
        {/*  })}*/}
        {/*</ul>*/}
      </>
    </>
  );
}

export default Ranking;
