import React, { useState } from "react";
import "./App.css";

let noteBank = {
  1: "",
  5: "",
  10: "",
  20: "",
  100: "",
  500: "",
  2000: "",
};

function App() {
  const [billAmount, setBillAmount] = useState(0);
  const [cashGiven, setCashGiven] = useState(0);
  const [noOfNotes, setNoOfNotes] = useState(noteBank);
  const [cashGivenDiv, setCashGivenDiv] = useState("none");
  const [errorDisplay, setErrorDisplay] = useState(["none", ""]);
  const [outputDisplay, setOutputDisplay] = useState("none");
  const [nextbtnDisplay, setNextbtnDisplay] = useState("block");

  const notesArray = Object.keys(noOfNotes).sort(function (a, b) {
    return b - a;
  });

  const billAmountInputHandler = (e) => {
    setBillAmount(Number(e.target.value));
  };

  const cashGivenInputHandler = (e) => {
    setCashGiven(Number(e.target.value));
  };

  const nextBtnHandler = () => {
    if (billAmount > 0) {
      setNextbtnDisplay("none");
      setErrorDisplay(["none", ""]);
      setCashGivenDiv("block");
    } else {
      setOutputDisplay("none");
      setErrorDisplay(["block", "Enter valid bill amount to continue"]);
    }
  };

  const checkBtnHandler = () => {
    if (cashGiven > 0 && billAmount > 0) {
      if (Number.isInteger(cashGiven)) {
        if (cashGiven >= billAmount) {
          if (cashGiven === billAmount) {
            setOutputDisplay("none");
            setErrorDisplay(["block", "No amount should be returned"]);
            return;
          }
          setErrorDisplay(["none", ""]);
          setOutputDisplay("block");
          calculateNotes(cashGiven, billAmount);
          return;
        } else {
          setOutputDisplay("none");
          setErrorDisplay([
            "block",
            "Cash is less than bill, please enter right amount",
          ]);
          return;
        }
      }
    } else {
      setOutputDisplay("none");
      setErrorDisplay([
        "block",
        "Enter valid bill amount and cash given to continue",
      ]);
    }
  };

  //function to find no.of notes
  function calculateNotes(cash, bill) {
    let diff = cash - bill;
    notesArray.forEach((note) => {
      let noteNo = Number(note);
      if (diff >= noteNo) {
        let count = Math.floor(diff / noteNo);
        diff = diff - noteNo * count;
        noteBank[noteNo] = count;
      } else {
        noteBank[noteNo] = "";
      }
    });
    setNoOfNotes(noteBank);
  }

  return (
    <div className="App">
      <header className="hero">
        <h1 className="hero-heading">Cash Register Manager</h1>
      </header>
      <section className="section">
        <div className="container container-center section-center">
          <p>
            Enter the bill amount and cash given by the customer and know
            minimum number of notes to return.
          </p>
          <p style={{ display: `${errorDisplay[0]}` }} className="error">
            {errorDisplay[1]}
          </p>
          <div className="bill-amount">
            <input
              type="number"
              onChange={billAmountInputHandler}
              placeholder="Enter bill amount"
            />
            <button
              style={{ display: `${nextbtnDisplay}` }}
              onClick={nextBtnHandler}
            >
              Next
            </button>
          </div>
          <div style={{ display: `${cashGivenDiv}` }} className="cash-given">
            <input
              type="number"
              onChange={cashGivenInputHandler}
              placeholder="Enter cash given"
            />
            <button onClick={checkBtnHandler}>Check</button>
          </div>
          {/* Output */}
          <div style={{ display: `${outputDisplay}` }} className="output-div">
            <p className="label">Return Change: {cashGiven - billAmount}</p>
            <div id="output">
              <table>
                <tbody>
                  <tr>
                    <th>No.of Notes</th>
                    {notesArray.map((note) => {
                      return (
                        <td className="noOfNotes" key={note}>
                          {noOfNotes[note]}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <th>Note</th>
                    {notesArray.map((note) => {
                      return <td key={note}>{note}</td>;
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
