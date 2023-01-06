<template>
  <div id="minesweeper">
    <input type="number" placeholder="rows" v-model="rowsCount">
    X
    <input type="number" placeholder="columns" v-model="colsCount">
    <div>
      <input type="number" placeholder="mines" v-model="mineCount">
    </div>
    <div>
      <button @click="startBtn">start</button>
    </div>
    <div v-show="field">
      <table>
        <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
          <td v-for="(col, colIndex) in row" :key="colIndex" 
          :style="colStyle(col, rowIndex, colIndex)" 
          @mousedown.left="tdLeftClick(rowIndex, colIndex, col)" 
          @mousedown.right="tdRightClick(rowIndex, colIndex, col)" 
          @contextmenu.prevent>
          {{ col.displayData }}
          </td>
        </tr>
      </table>
    
      <div id="timer">
        {{ timerObj.elapsedTime }} seconds
      </div>
    </div>
  </div>

</template>

<script>
import { registerRuntimeCompiler } from '@vue/runtime-core';

const value = {
  none: "",
  flag: '!',
  mine: "*",
  question: "?",
  ak: "앜!",
  // mine_question: "mine_question",/
};
const state = {
  open: 1,
  close: 0,
};

//import
export default{
  // component: {},
  data() {
    return {
      rowsCount: '',
      colsCount: '',
      mineCount: '',
      field: false,
      playing: false,
      openCount: 0,
      tableData: [],
      timerObj: {
        startTime: null,
        endTime: null,
        elapsedTime: null,
        timer: null,
      }
    }
  },
  computed: {
    colStyle() {
      return (col, rowIndex, colIndex) => {
        let displayData = this.tableData[rowIndex][colIndex].displayData;
        let displayState = this.tableData[rowIndex][colIndex].state;        
        if(displayState === state.close) {
          return {background: "lightgrey"};
        }

        switch(displayData) {
          case value.none: if(displayState === state.close) {return {background: "lightgrey"}} else{ return {background: "none"}};
          case value.flag: return {background: "dodgerblue"};
          case value.question: return {background: "yellow"};
          case value.ak: return {background: "red"};
        }
      }
    },
  },
  methods: {
    //-------------  chatGPT 형님이 짠 코드 ------------------
    startBtn() {
      this.openCount = 0;
      this.playing = true;
      this.startTimer();
      if (Number(this.mineCount) > Number(this.rowsCount) * Number(this.colsCount)) {
        alert("mine count can not be over amount of field cells 지뢰 갯수가 필드의 갯수를 초과 할 수 없습니다.");
        return;
      }
      this.init();
      this.field = true; 

      this.createMatrix();
      this.deployMines();
    },

    createMatrix() {
      for (let i = 0; i < this.rowsCount; i++) {
        let colData = [];
        for (let j = 0; j < this.colsCount; j++) {
          colData.push({displayData: value.none, realData: 0, state: state.close});
        }
        this.tableData.push(colData);
      }
    },

    deployMines() {
      for (let i = 0; i < this.mineCount; i++) {
        let x = Math.floor(Math.random() * this.rowsCount);
        let y = Math.floor(Math.random() * this.colsCount);
        if (this.tableData[x][y].realData === value.mine) {
          i--;
          continue;
        } else {
          this.tableData[x][y].realData =  value.mine;
          this.tableData[x][y].displayData =  value.none;
          this.tableData[x][y].state =  state.close;
          this.incrementAdjacentCells(x, y);
        }
      }
    },

    incrementAdjacentCells(x, y) {
      for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
          if (i >= 0 && i < this.rowsCount && j >= 0 && j < this.colsCount && !(i === x && j === y) && this.tableData[i][j].realData !== value.mine) {
            this.tableData[i][j].displayData = value.none;
            this.tableData[i][j].realData++;
          }
        }
      }
    },
    tdLeftClick(rowIndex, colIndex, colData) {
      if(this.playing === false) {
        return;
      }
      if(colData.realData === "*") {
        this.tableData[rowIndex][colIndex].displayData = "앜!";
        this.tableData[rowIndex][colIndex].state = state.open;
        this.endTimer();
      }
      // else if(this.tableData[rowIndex][colIndex].realData === 0) {
      else {
        this.openBlankTiles(rowIndex, colIndex);
      }
      // else {
      //   this.tableData[rowIndex][colIndex].displayData = colData.realData;
      // }
      // this.tableData[rowIndex][colIndex].state = state.open;
    },
    tdRightClick(rowIndex, colIndex) {
      if(this.playing === false) {
        return;
      }
      if(this.tableData[rowIndex][colIndex].displayData === this.tableData[rowIndex][colIndex].realData) {
        return;
      }
      let displayData = this.tableData[rowIndex][colIndex].displayData;
      switch(displayData) {
        case value.none: this.tableData[rowIndex][colIndex].displayData = value.flag; this.tableData[rowIndex][colIndex].state = state.open; break;
        case value.flag: this.tableData[rowIndex][colIndex].displayData = value.question; this.tableData[rowIndex][colIndex].state = state.open; break;
        case value.question:  this.tableData[rowIndex][colIndex].displayData = value.none; this.tableData[rowIndex][colIndex].state = state.close; break;
      }
    },
    openBlankTiles(row, col) {
      if (row < 0 || row >= this.rowsCount || col < 0 || col >= this.colsCount || (this.tableData[row][col].state === state.open && this.tableData[row][col].realData === this.tableData[row][col].displayData) || this.tableData[row][col].realData === value.mine) {
        return;
      }
      
      if (this.tableData[row][col].realData >= 0) {
        if(this.tableData[row][col].realData > 0) {
          this.tableData[row][col].displayData = this.tableData[row][col].realData;
          this.tableData[row][col].state = state.open;
        }else {
          this.tableData[row][col].realData = value.none;
          this.tableData[row][col].displayData = this.tableData[row][col].realData;
          this.tableData[row][col].state = state.open;
          this.openBlankTiles(row - 1, col);
          this.openBlankTiles(row + 1, col);
          this.openBlankTiles(row, col - 1);
          this.openBlankTiles(row, col + 1);
        }
        this.openCount ++;
        if(this.openCount === this.rowsCount * this.colsCount - this.mineCount) {
          this.endTimer();
          return;
        }
      }
    },
    startTimer() {
      this.timerObj.startTime = new Date();
      this.timerObj.timer = setInterval(() => {
        this.timerObj.elapsedTime = (new Date() - this.timerObj.startTime) / 1000; // elapsed time in seconds
      }, 100); // update elapsed time every second
    },
    endTimer() {
      this.playing = false;
      clearInterval(this.timerObj.timer);
      this.timerObj.endTime = new Date();
    },
    init() {
      this.tableData = [];
    },
    // -----------------------------------------------
    //내가 짠 코드
    // startBtn() {
    //   if(Number(this.mineCount) > Number(this.rowsCount) * Number(this.colsCount)) {
    //     alert("mine count can not be over amount of field cells 지뢰 갯수가 필드의 갯수를 초과 할 수 없습니다.");
    //     return;
    //   }
    //   this.init(); //gamin init 게임 초기화
    //   this.field = true; 

    //   //create matrix 2차원 배열 생성
    //   for(let i=0; i<this.rowsCount; i++) {
    //     let colData = [];
    //     for(let j=0; j<this.colsCount; j++) {
    //       colData.push({data: 0, state:'none'});
    //     }
    //     this.tableData.push(colData);
    //   }

    //   //mine deploy 지뢰배분
    //   let x = 0;
    //   let y = 0;
    //   for(let i=0; i<this.mineCount; i++) {
    //     console.log('this.mineCount :>> ', this.mineCount);
    //     console.log('i :>> ', i);
    //     x = Math.floor(Math.random() * this.rowsCount);
    //     y = Math.floor(Math.random() * this.colsCount);
    //     if(this.tableData[x][y].data === '*') {
    //       console.log("이미 지뢰")
    //       i --; //이미 지뢰
    //       continue;
    //     }else {
    //       this.tableData[x][y].data =  "*"; //지뢰
    //       this.tableData[x][y].state =  "none"; //지뢰

    //       //지뢰 주변 값 상승
    //       if(x === 0 && y === 0) {
    //         console.log(1);
    //         this.tableData[x+1][y].data += this.tableData[x+1][y].data === "*" ? '' : 1;
    //         this.tableData[x+1][y+1].data += this.tableData[x+1][y+1].data === "*" ? '' : 1;
    //         this.tableData[x][y+1].data += this.tableData[x][y+1].data === "*" ? '' : 1;
    //       }else if(x === 0 && y === this.colsCount-1) {
    //         console.log(2);
    //         this.tableData[x][y-1].data += this.tableData[x][y-1].data === "*" ? '' : 1;
    //         this.tableData[x+1][y-1].data += this.tableData[x+1][y-1].data === "*" ? '' : 1;
    //         this.tableData[x+1][y].data += this.tableData[x+1][y].data === "*" ? '' : 1;
    //       }else if(x === this.rowsCount-1 && y === 0) {
    //         console.log(3);
    //         this.tableData[x-1][y].data += this.tableData[x-1][y].data === "*" ? '' : 1;
    //         this.tableData[x-1][y+1].data += this.tableData[x-1][y+1].data === "*" ? '' : 1;
    //         this.tableData[x][y+1].data += this.tableData[x][y+1].data === "*" ? '' : 1;
    //       }else if(x === this.rowsCount-1 && y === this.colsCount-1) {
    //         console.log(4);
    //         this.tableData[x-1][y-1].data += this.tableData[x-1][y-1].data === "*" ? '' : 1;
    //         this.tableData[x-1][y].data += this.tableData[x-1][y].data === "*" ? '' : 1;
    //         this.tableData[x][y-1].data += this.tableData[x][y-1].data === "*" ? '' : 1;
    //       }else if(x === 0) {
    //         console.log(5);
    //         this.tableData[x][y-1].data += this.tableData[x][y-1].data === "*" ? '' : 1;
    //         this.tableData[x][y+1].data += this.tableData[x][y+1].data === "*" ? '' : 1;
    //         this.tableData[x+1][y-1].data += this.tableData[x+1][y-1].data === "*" ? '' : 1;
    //         this.tableData[x+1][y].data += this.tableData[x+1][y].data === "*" ? '' : 1;
    //         this.tableData[x+1][y+1].data += this.tableData[x+1][y+1].data === "*" ? '' : 1;
    //       }else if(y === 0) {
    //         console.log(6);
    //         this.tableData[x-1][y].data += this.tableData[x-1][y].data === "*" ? '' : 1;
    //         this.tableData[x-1][y+1].data += this.tableData[x-1][y+1].data === "*" ? '' : 1;
    //         this.tableData[x][y+1].data += this.tableData[x][y+1].data === "*"? '' : 1;
    //         this.tableData[x+1][y].data += this.tableData[x+1][y].data === "*" ? '' : 1;
    //         this.tableData[x+1][y+1].data += this.tableData[x+1][y+1].data === "*" ? '' : 1;
    //       }else if(x === this.rowsCount-1) {
    //         console.log(7);
    //         this.tableData[x][y-1].data += this.tableData[x][y-1].data === "*" ? '' : 1;
    //         this.tableData[x-1][y-1].data += this.tableData[x-1][y-1].data === "*" ? '' : 1;
    //         this.tableData[x-1][y].data += this.tableData[x-1][y].data === "*" ? '' : 1;
    //         this.tableData[x-1][y+1].data += this.tableData[x-1][y+1].data === "*" ? '' : 1;
    //         this.tableData[x][y+1].data += this.tableData[x][y+1].data === "*" ? '' : 1;
    //       }else if(y === this.colsCount-1) {
    //         console.log(8);
    //         this.tableData[x-1][y-1].data += this.tableData[x-1][y-1].data === "*" ? '' : 1;
    //         this.tableData[x-1][y].data += this.tableData[x-1][y].data === "*" ? '' : 1;
    //         this.tableData[x][y-1].data += this.tableData[x][y-1].data === "*" ? '' : 1;
    //         this.tableData[x+1][y-1].data += this.tableData[x+1][y-1].data === "*" ? '' : 1;
    //         this.tableData[x+1][y].data += this.tableData[x+1][y].data === "*" ? '' : 1;
    //       }else {
    //         console.log(9);
    //         this.tableData[x-1][y-1].data += this.tableData[x-1][y-1].data === "*" ? '' : 1;
    //         this.tableData[x-1][y].data += this.tableData[x-1][y].data === "*" ? '' : 1;
    //         this.tableData[x-1][y+1].data += this.tableData[x-1][y+1].data === "*" ? '' : 1;
    //         this.tableData[x][y-1].data += this.tableData[x][y-1].data === "*" ? '' : 1;
    //         this.tableData[x][y+1].data += this.tableData[x][y+1].data === "*" ? '' : 1;
    //         this.tableData[x+1][y-1].data += this.tableData[x+1][y-1].data === "*" ? '' : 1;
    //         this.tableData[x+1][y].data += this.tableData[x+1][y].data === "*" ? '' : 1;
    //         this.tableData[x+1][y+1].data += this.tableData[x+1][y+1].data === "*" ? '' : 1;
    //       }
    //     }
    //   }
    // },
  }
}


</script>
<style>
#minesweeper{
    display: inline-block;
    align-content: center;
  }
table{
    border-collapse: collapse;
  }
  td {
    /* color: white; */
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
  }
  #timer {
    margin-top: 50px;
  }
</style>