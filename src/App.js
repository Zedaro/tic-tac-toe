import { useState } from "react";
import { useEffect } from "react";

function Square({ symbol, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {symbol}
    </button>
  );
}

export default function Board() {
  const [symbols, setSymbols] = useState(Array(9).fill(null));
  useEffect(() => console.log({ symbols }), [symbols]);
  const [history, setHistory] = useState([symbols]);
  useEffect(() => console.log({ history }), [history]);
  const [isXCurrentPlayer, setIsXCurrentPlayer] = useState(true);
  useEffect(() => console.log({ isXCurrentPlayer }), [isXCurrentPlayer]);

  let currentSymbol = isXCurrentPlayer ? "X" : "O";
  // Whose turn is it? Is there a winner?
  let status;
  updateStatus();

  let moves;
  updateMoves();

  console.log({ history });

  function handleClick(symbol, i) {
    if (symbols[i] || calculateWinner(symbols)) return;
    let updatedSymbols = symbols.slice();
    updatedSymbols[i] = symbol;
    // Immutability / Unveränderlichkeit
    setSymbols(updatedSymbols);
    setHistory([...history, updatedSymbols]);
    setIsXCurrentPlayer(!isXCurrentPlayer);
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function handleReset() {
    jumpTo(0);
  }

  function updateStatus() {
    const winner = calculateWinner(symbols);
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Current: " + (isXCurrentPlayer ? "X" : "O");
    }
  }

  function updateMoves() {
    moves = history.map((symbols, move) => {
      let description;
      if (move > 0) {
        description = "Go to move #" + move;
      } else {
        description = "Go to game start";
      }
      return (
        <li>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    });
  }

  function jumpTo(move) {
    setIsXCurrentPlayer(move % 2 === 0);
    setHistory([...history.slice(0, move + 1)]);
    setSymbols(history[move]);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          symbol={symbols[0]}
          onSquareClick={() => handleClick(currentSymbol, 0)}
        />
        <Square
          symbol={symbols[1]}
          onSquareClick={() => handleClick(currentSymbol, 1)}
        />
        <Square
          symbol={symbols[2]}
          onSquareClick={() => handleClick(currentSymbol, 2)}
        />
      </div>
      <div className="board-row">
        <Square
          symbol={symbols[3]}
          onSquareClick={() => handleClick(currentSymbol, 3)}
        />
        <Square
          symbol={symbols[4]}
          onSquareClick={() => handleClick(currentSymbol, 4)}
        />
        <Square
          symbol={symbols[5]}
          onSquareClick={() => handleClick(currentSymbol, 5)}
        />
      </div>
      <div className="board-row">
        <Square
          symbol={symbols[6]}
          onSquareClick={() => handleClick(currentSymbol, 6)}
        />
        <Square
          symbol={symbols[7]}
          onSquareClick={() => handleClick(currentSymbol, 7)}
        />
        <Square
          symbol={symbols[8]}
          onSquareClick={() => handleClick(currentSymbol, 8)}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
      <button onClick={handleReset}>Reset</button>
    </>
  );
}
