<template>
  <v-app>
    <v-toolbar app flat dark color="primary">
      <v-toolbar-side-icon v-if="isAuthorized" @click="toggleMenu">
        <v-icon>menu</v-icon>
      </v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-btn v-if="isAuthorized" @click="logout">Выйти</v-btn>
    </v-toolbar>
    <v-navigation-drawer app stateless hide-overlay :value="isAuthorized && menuShown">
      <v-toolbar flat>
        <h2>Меню</h2>
      </v-toolbar>
      <v-treeview
        class="mt-4"
        :items="menu"
        open-all
        open-on-click
        expand-icon="expand_more"
      >
        <template #prepend="{ item }">
          <v-icon v-if="item.icon" @click="redirect(item.url)">
            {{item.icon}}
          </v-icon>
        </template>
        <template #label="{ item }">
          <span @click="redirect(item.url)">
            {{item.name}}
          </span>
        </template>
      </v-treeview>
    </v-navigation-drawer>
    <v-content class="mt-5">
      <router-view></router-view>
      <v-snackbar
        v-model="snackbar.isActive"
        :timeout="snackbar.timeout"
        :top="true"
        :color="snackbar.color"
      >
        {{snackbar.message}}
        <v-btn
          flat
          @click="closeSnackbar"
        >Закрыть</v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import { REMOVE_SNACKBAR, REMOVE_TOKEN } from './store';

export default {
  name: 'App',
  data() {
    return {
      menuShown: false,
      menu: [
        {
          id: 1,
          name: 'Home',
          icon: 'home',
          url: '/',
        },
      ],
    };
  },
  methods: {
    redirect(to) {
      if (to) {
        this.menuShown = false;
        this.$router.push(to);
      }
    },
    toggleMenu() {
      this.menuShown = !this.menuShown;
    },
    logout() {
      this.menuShown = false;
      this.$store.commit({
        type: REMOVE_TOKEN,
      });
      this.$router.push('/login');
    },

    closeSnackbar() {
      this.$store.commit({
        type: REMOVE_SNACKBAR,
      });
    },
  },
  computed: {
    isAuthorized() {
      return !!this.$store.state.token;
    },
    snackbar() {
      return this.$store.state.snackbar;
    },
  },
};
</script>
