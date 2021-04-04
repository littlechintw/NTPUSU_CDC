<template>
  <v-app style="background-color: #e9e8e7">
    <div class="inapp">
      <v-app-bar app dark color="#9B7575">
        <v-spacer></v-spacer>
        <h2>NTPUSU CDC</h2>
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-main>
        <div id="router" v-bind:style="{ minHeight: Height + 'px' }">
          <router-view />
        </div>
      </v-main>
    </div>

    <v-footer padless class="font-weight-medium" color="#D0D0D0">
      <v-col class="text-center" cols="12" style="font-size: 14px">
        &copy; 2021 Copyright NTPU SU 21th. All rights reserved.
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
export default {
  name: "App",
  components: {
    // HelloWorld,
  },
  data: () => ({
    Height: 0,
  }),
  mounted() {
    this.Height = document.documentElement.clientHeight - 100;
    window.onresize = () => {
      this.Height = document.documentElement.clientHeight - 100;
    };
  },
};
</script>

<style>
.inapp {
  width: 80%;
  margin-left: 10%;
}
#app {
  font-family: Noto Sans SC;
}
</style>