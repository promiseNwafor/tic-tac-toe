import { Player } from '../utils'

interface ICell {
  cell: number
  value: Player
  winner: Player | null
  handleChange: (cell: number) => void
}

const Cell: React.FC<ICell> = ({ handleChange, cell: cell, value, winner }) => {
  const isPlayerOne = value === Player.ONE
  const cellId = `${cell}-id`

  return (
    <label
      className='h-20 w-20 md:h-[150px] md:w-[150px] shadow-lg rounded-lg place-center bg-white'
      id={cellId}
    >
      <input
        type='checkbox'
        name={cellId}
        id={cellId}
        className='opacity-0'
        onChange={() => {
          handleChange(cell)
        }}
      />
      {value && (
        <span
          className={`absolute text-4xl md:text-6xl shadow-lg shadow-slate-400 p-5 py-3
         ${
           isPlayerOne
             ? 'rounded-full text-indigo-600'
             : 'text-rose-600 rounded-lg'
         }
         ${value === winner ? 'text-cyan-500' : ''}
         `}
        >
          {value}
        </span>
      )}
    </label>
  )
}

export default Cell
