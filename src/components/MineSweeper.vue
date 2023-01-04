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
          <td v-for="(col, colIndex) in row" :key="colIndex" @mousedown.left="tdLeftClick(rowIndex, colIndex)" @mousedown.right="tdRightClick(rowIndex, colIndex)" @contextmenu.prevent>
            {{ col }}
          </td>
        </tr>
      </table>
    </div>
  </div>

</template>

<script>
//import
export default{
  // component: {},
  data() {
    return {
      rowsCount: '',
      colsCount: '',
      mineCount: '',
      field: false,
      tableData: [],
    }
  },
  methods: {
    startBtn() {
      this.init(); //gamin init 게임 초기화
      this.field = true; 
      // console.log('this.rows :>> ', this.rowsCount);
      // console.log('this.cols :>> ', this.colsCount);
      // console.log('this.mindeCount :>> ', this.mineCount);

      //create matrix 2차원 배열 생성
      for(let i=0; i<this.rowsCount; i++) {
        let colData = [];
        for(let j=0; j<this.colsCount; j++) {
          colData.push(0);
        }
        this.tableData.push(colData);
      }
      // console.log('this.tableData :>> ', this.tableData);

      //mine deploy 지뢰배분
      let x = 0;
      let y = 0;
      for(let i=0; i<this.mineCount; i++) {
        x = Math.floor(Math.random() * this.rowsCount);
        y = Math.floor(Math.random() * this.colsCount);
        // y = Math.floor(Math.random() * this.rowsCount);
        // x = Math.floor(Math.random() * this.colsCount);
        console.log('x :>> ', x);
        console.log('y :>> ', y);
        console.log('this.rowsCount :>> ', this.rowsCount);
        console.log('this.colsCount :>> ', this.colsCount);
        // console.log('this.tableData :>> ', this.tableData);
        if(this.tableData[x][y] === '*') {
          i --; //이미 지뢰
          continue;
        }else {
          this.tableData[x][y] = "*"; //지뢰

          //지뢰 주변 값 상승
          if(x === 0 && y === 0) {
            console.log(1);
            this.tableData[x+1][y] += this.tableData[x+1][y] === "*" ? '' : 1;
            this.tableData[x+1][y+1] += this.tableData[x+1][y+1] === "*" ? '' : 1;
            this.tableData[x][y+1] += this.tableData[x][y+1] === "*" ? '' : 1;
          }else if(x === 0 && y === this.colsCount-1) {
            console.log(2);
            this.tableData[x][y-1] += this.tableData[x][y-1] === "*" ? '' : 1;
            this.tableData[x+1][y-1] += this.tableData[x+1][y-1] === "*" ? '' : 1;
            this.tableData[x+1][y] += this.tableData[x+1][y] === "*" ? '' : 1;
          }else if(x === this.rowsCount-1 && y === 0) {
            console.log(3);
            this.tableData[x-1][y] += this.tableData[x-1][y] === "*" ? '' : 1;
            this.tableData[x-1][y+1] += this.tableData[x-1][y+1] === "*" ? '' : 1;
            this.tableData[x][y+1] += this.tableData[x][y+1] === "*" ? '' : 1;
          }else if(x === this.rowsCount-1 && y === this.colsCount-1) {
            console.log(4);
            this.tableData[x-1][y-1] += this.tableData[x-1][y-1] === "*" ? '' : 1;
            this.tableData[x-1][y] += this.tableData[x-1][y] === "*" ? '' : 1;
            this.tableData[x][y-1] += this.tableData[x][y-1] === "*" ? '' : 1;
          }else if(x === 0) {
            console.log(5);
            this.tableData[x][y-1] += this.tableData[x][y-1] === "*" ? '' : 1;
            this.tableData[x][y+1] += this.tableData[x][y+1] === "*" ? '' : 1;
            this.tableData[x+1][y-1] += this.tableData[x+1][y-1] === "*" ? '' : 1;
            this.tableData[x+1][y] += this.tableData[x+1][y] === "*" ? '' : 1;
            this.tableData[x+1][y+1] += this.tableData[x+1][y+1] === "*" ? '' : 1;
          }else if(y === 0) {
            console.log(6);
            this.tableData[x-1][y] += this.tableData[x-1][y] === "*" ? '' : 1;
            this.tableData[x-1][y+1] += this.tableData[x-1][y+1] === "*" ? '' : 1;
            this.tableData[x][y+1] += this.tableData[x][y+1] === "*"? '' : 1;
            this.tableData[x+1][y] += this.tableData[x+1][y] === "*" ? '' : 1;
            this.tableData[x+1][y+1] += this.tableData[x+1][y+1] === "*" ? '' : 1;
          }else if(x === this.rowsCount-1) {
            console.log(7);
            this.tableData[x][y-1] += this.tableData[x][y-1] === "*" ? '' : 1;
            this.tableData[x-1][y-1] += this.tableData[x-1][y-1] === "*" ? '' : 1;
            this.tableData[x-1][y] += this.tableData[x-1][y] === "*" ? '' : 1;
            this.tableData[x-1][y+1] += this.tableData[x-1][y+1] === "*" ? '' : 1;
            this.tableData[x][y+1] += this.tableData[x][y+1] === "*" ? '' : 1;
          }else if(y === this.colsCount-1) {
            console.log(8);
            this.tableData[x-1][y-1] += this.tableData[x-1][y-1] === "*" ? '' : 1;
            this.tableData[x-1][y] += this.tableData[x-1][y] === "*" ? '' : 1;
            this.tableData[x][y-1] += this.tableData[x][y-1] === "*" ? '' : 1;
            this.tableData[x+1][y-1] += this.tableData[x+1][y-1] === "*" ? '' : 1;
            this.tableData[x+1][y] += this.tableData[x+1][y] === "*" ? '' : 1;
          }else {
            console.log(9);
            this.tableData[x-1][y-1] += this.tableData[x-1][y-1] === "*" ? '' : 1;
            this.tableData[x-1][y] += this.tableData[x-1][y] === "*" ? '' : 1;
            this.tableData[x-1][y+1] += this.tableData[x-1][y+1] === "*" ? '' : 1;
            this.tableData[x][y-1] += this.tableData[x][y-1] === "*" ? '' : 1;
            this.tableData[x][y+1] += this.tableData[x][y+1] === "*" ? '' : 1;
            this.tableData[x+1][y-1] += this.tableData[x+1][y-1] === "*" ? '' : 1;
            this.tableData[x+1][y] += this.tableData[x+1][y] === "*" ? '' : 1;
            this.tableData[x+1][y+1] += this.tableData[x+1][y+1] === "*" ? '' : 1;
          }
        }
        

        
        
      }
    },
    tdLeftClick(rowIndex, colIndex) {
      console.log('rowIndex :>> ', rowIndex);
      console.log('colIndex :>> ', colIndex);
      console.log('this.tableData[rowIndex][colIndex] :>> ', this.tableData[rowIndex][colIndex]);
      // this.tableData[rowIndex][colIndex].style.color = 'black'
    },
    tdRightClick(rowIndex, colIndex) {
      console.log('rowIndex :>> ', rowIndex);
      console.log('colIndex :>> ', colIndex);
    },
    init() {
      this.tableData = [];
    }
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
    color: white;
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
  }
</style>