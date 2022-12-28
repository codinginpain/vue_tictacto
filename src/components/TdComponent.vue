<template>
  <td @click="tdClick">{{ cellData }}</td>
</template>

<script>
  let count = 0;
  export default {
    props: {
      cellData: String,
      rowIndex: Number,
      cellIndex: Number,
    },
    data() {
      return {
        // count: 0,
      }
    },
    methods: {
      tdClick() {
        const tictacto = this.$root.$children[0].$children[0];
        if(tictacto.result === true) {
          return;
        }
        if(this.cellData === '') {
          count ++;
          this.$set(tictacto.tableData[this.rowIndex], this.cellIndex, tictacto.turn);
          tictacto.systemMsg = "";
          if(this.winner(tictacto.tableData, tictacto.turn)) {
            tictacto.systemMsg = tictacto.turn + "님이 승리 하였습니다!";
            tictacto.result = true;
            count = 0;
          }else {
            // tictacto.turn = tictacto.turn === "O" ? "X" : "O";
            if(count === 9) {
              tictacto.systemMsg = "무승부 입니다.";
              tictacto.result = true;
              count = 0;
            }
          }
          tictacto.turn = tictacto.turn === "O" ? "X" : "O";
        }else if(this.cellData !== '') {
          //이미 값이 있습니다.
          tictacto.systemMsg = "이미 선택되었습니다, 다른 곳을 선택해 주세요";
        }
      },
      winner(tableData, turn) {
        let win = false;
        if(tableData[this.rowIndex][0] === turn && tableData[this.rowIndex][1] === turn && tableData[this.rowIndex][2] === turn) {
          win = true;
        }else if(tableData[0][this.cellIndex] === turn && tableData[1][this.cellIndex] === turn && tableData[2][this.cellIndex] === turn) {
          win = true;
        }else if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
          win = true;
        }else if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
          win = true;
        }
        return win;
      }
    }
  }
</script>