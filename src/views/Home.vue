<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Board msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Board from '@/components/Board.vue'

export default {
  name: 'Home',
  components: {
    Board
  }
}
</script>
