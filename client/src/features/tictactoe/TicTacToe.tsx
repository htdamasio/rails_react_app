import React, { useState, useContext, useEffect, Component  } from 'react';
import actionCable from 'actioncable';
import { CableApp, CableContext } from '../../contexts/cable';
import './TicTacToe.css'

interface StateInterface {
  channel     : null | actionCable.Channel,
  symbol      : string,
  board       : string[],
  myTurn      : boolean,
  gameStarted : boolean,
  gameEnded   : boolean,
  winner      : null | string 
}

class TicTacToe extends Component {
  static contextType = CableContext;
  
  state : StateInterface = {
    channel     : null,
    symbol      : 'X',
    board       : Array(9).fill(""),
    myTurn      : true,
    gameStarted : false,
    gameEnded   : false,
    winner      : null 
  }
  
  // const [channel, setChannel] = useState<null | actionCable.Channel>(null);
  // const [symbol, setSymbol] = useState<string>('X');
  // const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  // const [myTurn, setMyTurn] = useState<boolean>(true);
  // const [gameStarted, setGameStarted] = useState<boolean>(false);
  // const [gameEnded, setGameEnded] = useState<boolean>(false);
  // const [winner, setWinner] = useState<string | null>(null);
  
  componentDidMount() {
    const cableApp = this.context as CableApp;
    
    if (this.state.channel !== null) this.state.channel.unsubscribe();

    this.setState({
      channel: cableApp.cable.subscriptions.create({
        channel: "GameChannel",
        game_id: 1,
        game_room: 1
      },
      {
        received    : (data) => console.log(data),
        initialized : () => console.log('Initialized'),
        connected   : () => console.log('Connected'),
        disconnected: () => console.log('Disconnected'),
      })
    })
  }

  componentWillUnmount() {
    // const cableApp = this.context as CableApp;
    if (this.state.channel !== null) this.state.channel.unsubscribe();
    console.log('Unsubscribing')
  }

  // useEffect(() => {
  //   if (channel !== null) channel.unsubscribe();

  //   setChannel(cableContext?.cable.subscriptions.create({
  //     channel: "GameChannel",
  //     game_id: 1,
  //     game_room: 1
  //   },
  //   {
  //     received: (data) => console.log(data),
  //     initialized: () => console.log('Initialized'),
  //     connected: () => console.log('Connected'),
  //     disconnected: () => console.log('Disconnected'),
  //   }))
  // }, []);
  
  SendData(){
    console.log('Send shit')
    this.state.channel?.send({  sent_by: "Testing", body: "This is a cool chat app." })
  }

  IsPositionAllowed(nIndex : number) : boolean {
    return this.state.board[nIndex] == '';
  }

  checkGameEnd = (board: string[]): { gameEnded: boolean; winner: string | null } => {
    // All possible winning combinations (rows, columns, diagonals)
    const winningCombinations = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal (top-left to bottom-right)
      [2, 4, 6], // Diagonal (top-right to bottom-left)
    ];
  
    // Check for a winner
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { gameEnded: true, winner: board[a] }; // Return the winner (X or O)
      }
    }
  
    // Check for a draw (all positions filled and no winner)
    if (board.every((cell) => cell !== "")) {
      return { gameEnded: true, winner: null }; // No winner, game is a draw
    }
  
    // Game is not over
    return { gameEnded: false, winner: null };
  };

  TryPlayPosition(nIndex : number) {
    if (this.state.myTurn && !this.state.gameEnded && this.IsPositionAllowed(nIndex)) {
      const newBoard : string[] = [...this.state.board]
      newBoard[nIndex] = this.state.symbol
      this.setState({
        board: newBoard
      })

      const { gameEnded: isGameEnded, winner: gameWinner } = this.checkGameEnd(newBoard);
      if (isGameEnded) {
        this.setState({
          gameEnded: true,
          winner   : gameWinner
        })
      }
    }

  }

  GetPosition(nIndex : number) : string {
    return this.state.board[nIndex]
  }

  render() {
    return (
      <>
      <div>
        <h1>Tic-Tac-Toe</h1>
        <div className="board">
          {this.state.board.map((value, index) => (
            <div
              key={index}
              onClick={() => this.TryPlayPosition(index)}
              className="board-item"
            >
              {value}
            </div>
          ))}
        </div>
        {this.state.gameEnded && (
          <div>
            {this.state.winner ? <h2>Winner: {this.state.winner}</h2> : <h2>It's a Draw!</h2>}
            <button onClick={() => window.location.reload()}>Play Again</button>
          </div>
        )}
      </div>
      </>
    )
  }
}

export default TicTacToe;