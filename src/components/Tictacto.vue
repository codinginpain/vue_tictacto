<template>
  <div>
    <table-component :table-data = "tableData"></table-component>
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
      turn: "O"
    }
  },
}

</script>
<style>
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