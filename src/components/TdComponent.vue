<template>
  <td @click="tdClick">{{ cellData }}</td>
</template>

<script>

  export default {
    props: {
      cellData: String,
      rowIndex: Number,
      cellIndex: Number,
    },
    data() {
      return {

      }
    },
    methods: {
      tdClick() {
        console.log("clicked", this.rowIndex);
      },
    }
  }
</script>