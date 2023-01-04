<template>
  <div id="helloWorld" class="hello">
    <h1>Welcome to Kee's Vue pratice</h1>
    <ul>
      <li>
        <!-- <div> -->
          <a href="#/tictactoe">Tic-Tac-Toe!</a>
        <!-- </div> -->
      </li>
      <li>
        <!-- <div> -->
          <a href="#/minesweeper">Mine Sweeper</a>
        <!-- </div> -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: red;
  cursor: pointer;
}
ul {
  list-style: none;
}
</style>

