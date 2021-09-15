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

let billAmount = "";
let cashGiven = "";

function App() {
  // const [billAmount, setBillAmount] = useState("");
  // const [cashGiven, setCashGiven] = useState("");
  const [noOfNotes, setNoOfNotes] = useState(noteBank);
  const [cashGivenDiv, setCashGivenDiv] = useState("none");
  const [errorDisplay, setErrorDisplay] = useState(["none", ""]);
  const [outputDisplay, setOutputDisplay] = useState("none");
  const [nextbtnDisplay, setNextbtnDisplay] = useState("block");

  const notesArray = Object.keys(noOfNotes).sort(function (a, b) {
    return b - a;
  });

  const billAmountInputHandler = (e) => {
    billAmount = Number(e.target.value);
  };

  const cashGivenInputHandler = (e) => {
    cashGiven = Number(e.target.value);
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
          <p style={{ textAlign: "center", padding: "0rem 1rem" }}>
            Enter the bill amount and cash given by the customer and know
            minimum number of notes to return.
          </p>
          <div style={{ display: `${errorDisplay[0]}` }} className="error">
            <span>{errorDisplay[1]}</span>
          </div>
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
            <button onClick={checkBtnHandler} type="submit">
              Check
            </button>
          </div>
          {/* Output */}
          <div style={{ display: `${outputDisplay}` }} className="output-div">
            <div className="summary">
              <span>Bill Amount: {billAmount}</span>
              <span style={{ marginLeft: "1rem" }}>
                Cash Given: {cashGiven}
              </span>
            </div>
            <p>Return Change: {cashGiven - billAmount}</p>
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
          <div className="footer">
            <p>
              Developed by{" "}
              <a
                href="https://abhishekkgautam.netlify.app"
                target="_blank"
                rel="noreferrer"
              >
                Abhishek Gautam
              </a>
            </p>
            <ul className="social-links list-non-bullet">
              <li className="list-item-inline">
                <a
                  target="_blank"
                  className="link"
                  href="https://github.com/AbhishekkGautam"
                  rel="noreferrer"
                >
                  <i class="fab fa-github fa-1x"></i>
                </a>
              </li>
              <li className="list-item-inline">
                <a
                  target="_blank"
                  className="link"
                  href="https://twitter.com/helloAbhishekk"
                  rel="noreferrer"
                >
                  <i class="fab fa-twitter fa-1x"></i>
                </a>
              </li>
              <li className="list-item-inline">
                <a
                  target="_blank"
                  className="link"
                  href="https://www.linkedin.com/in/abhishek-gautam-54684a167/"
                  rel="noreferrer"
                >
                  <i class="fab fa-linkedin-in fa-1x"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
