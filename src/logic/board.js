import { WINNER_COM } from "../constants"


export const checkGameOver = (ac_board) => {
    return ac_board.every((square) => square !== null)
}

export const checkWinner = (ac_board) => {
    for (const combo of WINNER_COM){
        const [a,b,c] = combo
        if( 
            ac_board[a] &&
            ac_board[a] === ac_board[b] &&
            ac_board[a] === ac_board[c]
        ) 
        {
            return ac_board[a];
        }
    }
    return null;
}