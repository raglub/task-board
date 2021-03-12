<template>
  <div>
    <div id="nav">
      <b-navbar toggleable="sm" type="dark" variant="dark">
        <b-navbar-brand href="#">Task Board</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <router-link class="nav-link" to="/">Board</router-link>
            <router-link class="nav-link" to="/calendar">Calendar</router-link>
            <router-link class="nav-link" to="/about">About</router-link>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'

@Component({
  components: {

  }
})
export default class Board extends Vue {
  @Watch('$route', { immediate: true, deep: true })
  onUrlChange (newVal: Route) {
    console.log(newVal)
  }
}
</script>

<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';
body,
#app,
.modal-content {
  background-color: #f6f8f9;
}
</style>
