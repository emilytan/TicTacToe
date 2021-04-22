import { Component, OnInit } from '@angular/core';
import { players, playerColour } from './player.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Tic Tac Toe Game';
  // code for tic tac toe game goes here...
  playerColour = playerColour.green;
  playerGreen = [];
  playerBlue = [];
  cellColour = playerColour.white
  winner = "?";
  gameEnd = false;
  winningRules = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  ngOnInit() {
    this.resetGame();
  }

  userClick(cell) {
    if (!this.gameEnd && document.getElementById(cell).style.backgroundColor === playerColour.white) {
      if (this.playerColour === playerColour.green) {
        document.getElementById(cell).style.backgroundColor = playerColour.green;
        this.playerGreen.push(cell);
        // console.log('X', this.playerX);
      } else {
        document.getElementById(cell).style.backgroundColor = playerColour.blue;
        this.playerBlue.push(cell);
        // console.log('O', this.playerO);
      }
      this.playerColour = this.playerColour === playerColour.green ? playerColour.blue : playerColour.green;
      if (this.winner === "?") {
        this.results();
      }
    }
  }

  results() {
    console.log('here', this.playerGreen.length);
    if (this.playerGreen.length > 4 || this.playerBlue.length > 4) {
      this.gameEnd = true;
    }
    for (let i = 0; i <= this.winningRules.length; i++) {
      let green = this.winningRules[i].every(j => this.playerGreen.includes(j));
      let blue = this.winningRules[i].every(j => this.playerBlue.includes(j));
      if (green) {
        this.winner = playerColour.green;
        this.gameEnd = true;
      }
      if (blue) {
        this.winner = playerColour.blue;
        this.gameEnd = true;
      }
      // console.log('winner', this.winner);
    }
  }

  resetGame() {
    this.playerGreen = [];
    this.playerBlue = [];
    this.playerColour = playerColour.green;
    this.winner = "?";
    this.gameEnd = false;
    for (let i = 0; i < 9; i++) {
      document.getElementById('' + i).style.backgroundColor = playerColour.white;
    }
  }
}
