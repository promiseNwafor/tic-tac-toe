export enum Player {
 ONE = 'X',
 TWO = 'O',
}


const possibleMatches = [
 [0, 1, 2],
 [3, 4, 5],
 [6, 7, 8],
 [0, 3, 6],
 [1, 4, 7],
 [2, 5, 8],
 [0, 4, 8],
 [2, 4, 6],
]


export const getMatches = (cells: Player[]) => {
 for (const [a, b, c] of possibleMatches) {
   if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
     return cells[a]
   }
 }
 return null
}
