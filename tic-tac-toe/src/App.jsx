import { useState } from 'react'

function Square({ value, onSquareClick }) {
  return (
    <button 
      className="w-16 h-16 border border-gray-400 bg-white text-2xl font-bold flex items-center justify-center" 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ squares, xIsNext, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every(square => square)) {
    status = 'Game ended in a draw!';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl font-bold mb-4">{status}</div>
      <div className="grid grid-cols-3 gap-1">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const description = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move} className="my-1">
        <button 
          onClick={() => jumpTo(move)}
          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4 gap-8">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Tic Tac Toe</h1>
        <Board squares={currentSquares} xIsNext={xIsNext} onPlay={handlePlay} />
      </div>
      <div className="mt-4 md:mt-0">
        <h2 className="text-xl font-bold mb-2">Game History</h2>
        <ol className="list-decimal pl-6">{moves}</ol>
      </div>
    </div>
  );
}

// Helper function to determine the winner
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
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App
