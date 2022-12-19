<template>
    <tr>
      <td-component v-for="(cellData, index) in rowData" :key="index" :row-data="rowData" :cell-data="cellData" :row-index="rowIndex" :cell-index="index"></td-component>
    </tr>
</template>



<script>

  import TdComponent from '@/components/TdComponent.vue';

  export default {
    components: {
      TdComponent,
    },
    props: {
      rowData: Array,
      rowIndex: Number,
    },
    data() {
      return{

      };
    },
    methods: {

    },
  }

</script>