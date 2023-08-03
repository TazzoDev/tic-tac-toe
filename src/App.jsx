import { useState } from 'react'
import './App.css'

import { Square } from './components/Square.jsx'
import { TURNS, WINNER_COM } from './constants'
import { Winner } from './components/Winner'
import { checkGameOver, checkWinner } from './logic/board'


function App() {
    const [board, setBoard] = useState(() => {
        const boardFromLocalST = window.localStorage.getItem('board')
        return boardFromLocalST ? JSON.parse(boardFromLocalST) : Array(9).fill(null)
    })
    const [turn, setTurn] = useState(() => {
        const turnFromLocalST = window.localStorage.getItem('turn')
        return turnFromLocalST ?? TURNS.X
    })
    const [winner, setWinner] = useState(null)
    const [scoreX, setScoreX] = useState(() => {
        const scoreXFromLocalST = window.localStorage.getItem('scoreX')
        return scoreXFromLocalST ? parseInt(scoreXFromLocalST) : 0;
    })
    const [scoreO, setScoreO] = useState(() => {
        const scoreOFromLocalST = window.localStorage.getItem('scoreO')
        return scoreOFromLocalST ? parseInt(scoreOFromLocalST) : 0
    })

    const resetScore = () => {
        setScoreX(0)
        setScoreO(0)
        window.localStorage.removeItem('scoreX')
        window.localStorage.removeItem('scoreO')
    }

    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setTurn(TURNS.X)
        setWinner(null)
        window.localStorage.removeItem('board')
        window.localStorage.removeItem('turn')
    }


    const updateBoard = (index) => {
        //check if its null
        if (board[index] || winner) return
        //copy and set new board
        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)
        //change turn
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)
        //save
        window.localStorage.setItem('board', JSON.stringify(newBoard))
        window.localStorage.setItem('turn', newTurn)

        //check if there is a winner
        const newWinner = checkWinner(newBoard)
        if (newWinner) {
            setWinner(newWinner)
            if (newWinner === TURNS.X) {
                setScoreX(scoreX + 1)
                window.localStorage.setItem('scoreX', scoreX + 1)
                window.localStorage.setItem('scoreO', scoreO)
            }
            else {
                setScoreO(scoreO + 1)
                window.localStorage.setItem('scoreO', scoreO + 1)
                window.localStorage.setItem('scoreX', scoreX)
            }
        } else if (checkGameOver(newBoard)) {
            setWinner(false)
        }






    }



    return (
        <>
            <main className='board'>
                <h1 className="title">Tic Tac Toe</h1>
                <section className='game'>
                    {
                        board.map((_, index) => {
                            return (
                                <Square
                                    key={index}
                                    index={index}
                                    updateBoard={updateBoard}
                                >
                                    {board[index]}
                                </Square>
                            )
                        })
                    }
                </section>
                <section className='turn'>
                    <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
                    <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
                </section>
                <section className="score">
                    <Square>{scoreX}</Square>
                    <span>:</span>
                    <Square>{scoreO}</Square>
                </section>
                <section className='buttons'>
                    <button onClick={resetGame}>Reset game</button>
                    <button onClick={resetScore}>Reset score</button>
                </section>
                <Winner winner={winner} resetGame={resetGame} />

            </main>
            <footer className="footer">
                <div><a href='https://github.com/TazzoDev'>@TazzoDev</a></div>
            </footer>
        </>
    )
}

export default App