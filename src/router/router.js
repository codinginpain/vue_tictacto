import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Tictacto from '@/components/Tictacto'
import MineSweeper from '@/components/MineSweeper'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/tictactoe',
      name: 'Tictactoe',
      component: Tictacto
    },
    {
      path: '/minesweeper',
      name: 'minesweeper',
      component: MineSweeper
    },
  ]
})
