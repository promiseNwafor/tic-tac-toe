'use client'
import { useEffect, useState } from 'react'
import { Player, getMatches } from '../utils'
import Cell from './Cell'

const initialState = Array(9).fill(null)

const Game: React.FC = () => {
  const [cells, setCells] = useState<Player[]>(initialState)
  const [isPlayerOneMove, setIsPlayerOneMove] = useState(true)
  const [gameOver, setGameOver] = useState(false)

  const nextPlayer = isPlayerOneMove ? Player.ONE : Player.TWO
  const isGameInProgress = cells.some((cell) => !!cell)
  const winner = getMatches(cells)

  const handleGameOver = () => {
    if (winner) {
      setGameOver(true)
    }
  }

  const resetGame = () => {
    setCells(initialState)
    setGameOver(false)
    setIsPlayerOneMove(true)
  }

  const handleChange = (cell: number) => {
    if (cells[cell] || gameOver) return
    setIsPlayerOneMove((move) => !move)

    const newCells = [...cells]
    newCells[cell] = nextPlayer

    setCells(newCells)
  }

  useEffect(() => {
    handleGameOver()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cells])

  return (
    <div className='w-screen h-screen flex flex-col gap-10 items-center justify-center bg-gray-200'>
      <div className='flex gap-8'>
        <p className='text-3xl md:text-5xl'>
          {isGameInProgress && !gameOver ? (
            <span>Next player is {nextPlayer}</span>
          ) : (
            <>
              {gameOver ? (
                <span className='text-2xl text-white rounded-lg bg-cyan-600 px-8 py-4 animate-ping'>
                  Winner is {winner}
                </span>
              ) : (
                <span> Start a new Game </span>
              )}
            </>
          )}
        </p>
      </div>

      <div className='grid grid-cols-3 border-[1px] rounded-lg p-[20px] gap-[20px] bg-gray-200'>
        {cells.map((cell, index) => (
          <Cell
            handleChange={handleChange}
            cell={index}
            key={`box-${index + cell}`}
            value={cell}
            winner={winner}
          />
        ))}
      </div>

      <div className='flex gap-8'>
        {gameOver ? (
          <>
            <button
              onClick={resetGame}
              className='text-2xl text-white rounded-lg bg-indigo-600 px-6 py-3 outline-none border-none'
            >
              Play Again
            </button>
          </>
        ) : (
          <>
            {isGameInProgress && (
              <button
                onClick={resetGame}
                className='text-2xl text-white rounded-lg bg-rose-600 px-6 py-3 outline-none border-none'
              >
                Quit
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Game
