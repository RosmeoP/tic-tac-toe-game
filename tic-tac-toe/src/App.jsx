import { useState } from 'react'

function Square({ value, onSquareClick }) {
  const getSquareClass = () => {
    if (!value) return "w-20 h-20 rounded-lg bg-gradient-to-r from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 text-3xl font-bold shadow-md transition-all duration-200 transform hover:scale-105";
    return `w-20 h-20 rounded-lg ${value === 'X' ? 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white' : 'bg-gradient-to-r from-pink-400 to-rose-500 text-white'} text-3xl font-bold shadow-md`;
  };

  return (
    <button 
      className={getSquareClass()}
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
  let statusClass = "text-2xl font-bold mb-6 py-3 px-6 rounded-full";
  
  if (winner) {
    status = `${winner} Wins!`;
    statusClass += winner === 'X' ? " bg-blue-500 text-white" : " bg-rose-500 text-white";
  } else if (squares.every(square => square)) {
    status = 'Draw!';
    statusClass += " bg-amber-500 text-white";
  } else {
    status = `${xIsNext ? 'X' : 'O'}'s Turn`;
    statusClass += xIsNext 
      ? " bg-gradient-to-r from-blue-400 to-indigo-500 text-white"
      : " bg-gradient-to-r from-pink-400 to-rose-500 text-white";
  }

  return (
    <div className="flex flex-col items-center">
      <div className={statusClass}>{status}</div>
      <div className="grid grid-cols-3 gap-3 p-4">
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
    const description = move ? `Move #${move}` : 'Start';
    const isCurrent = move === currentMove;
    return (
      <li key={move} className="my-2">
        <button 
          onClick={() => jumpTo(move)}
          className={`py-2 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
            isCurrent 
            ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg ring-2 ring-purple-300' 
            : 'bg-gradient-to-r from-slate-200 to-slate-300 text-slate-700 hover:from-slate-300 hover:to-slate-400'
          }`}
          disabled={isCurrent}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-slate-50 to-slate-100">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8 tracking-tight">
        Tic Tac Toe
      </h1>
      
      <div className="flex flex-col lg:flex-row items-start justify-center gap-10">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-indigo-100">
          <Board squares={currentSquares} xIsNext={xIsNext} onPlay={handlePlay} />
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-indigo-100 w-full lg:w-auto">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700">Game History</h2>
          <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            <ol className="space-y-2">{moves}</ol>
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-200">
            <button
              onClick={() => setHistory([Array(9).fill(null)]) || setCurrentMove(0)}
              className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
            >
              New Game
            </button>
          </div>
        </div>
      </div>
      
      <footer className="mt-8 text-slate-500 text-sm">
        Created with React • {new Date().getFullYear()}
      </footer>
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
