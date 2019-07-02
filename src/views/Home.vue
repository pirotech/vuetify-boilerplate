<template>
  <v-layout justify-center>
    <v-flex md10 sm10>
      <v-container fluid grid-list-md>
        <h1>Hello, {username}!</h1>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Home',
  mounted() {
    if (!this.$store.state.token) {
      this.$router.push('/login');
    }
  },
};
</script>

<style scoped>

</style>
