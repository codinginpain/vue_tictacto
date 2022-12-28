<template>
  <div >
    <div id="tictacto">
      <table-component :table-data = "tableData"></table-component>
    </div>
    <div>
      <p v-show="result === false">{{ turn }}의 턴 입니다.</p>
      <p>{{ systemMsg }}</p>
      <button v-show="result === true" @click="reply">재시작</button>
    </div>
</div>
</template>


<script>
import TableComponent from "@/components/TableComponent.vue"
export default {
  components: {
    TableComponent,
  },
  data() {
    return{
      tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      turn: "O",
      turnMsg: '',
      systemMsg: '',
      result: false,
    }
  },
  methods: {
    reply() {
      console.log("재시작");
      this.tableData = [['','',''],['','',''],['','','']];
      this.turn = "O";
      this.result = false;
      this.systemMsg = "";
    },
  }
}

</script>
<style>
  #tictacto{
    display: inline-block;
    align-content: center;
  }
  table{
    border-collapse: collapse;
  }
  td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
  }
</style>