<template>
  <v-layout class="mt-5" justify-center>
    <v-flex xs12 sm8 md4>
      <v-card>
        <v-toolbar dark flat color="primary">
          <v-toolbar-title>{{$t('login.title')}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              prepend-icon="person"
              name="login"
              label="Имя"
              type="text"
              v-model="username"
              :error-messages="usernameErrors"
              @keyup.enter="$refs.password.focus()"
            ></v-text-field>
            <v-text-field
              prepend-icon="lock"
              name="password"
              label="Пароль"
              type="password"
              v-model="password"
              ref="password"
              @keyup.enter="login"
              :error-messages="passwordErrors"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="login-button"
            color="primary"
            :loading="isLoading"
            ref="loginButton"
            @click="login"
            @keyup.enter="login"
          >Отправить</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex';
import api from '../shared/api/api';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      usernameErrors: [],
      passwordErrors: [],
      isLoading: false,
    };
  },
  methods: {
    formValid() {
      // reset
      this.usernameErrors = [];
      this.passwordErrors = [];

      // validation
      if (!this.username) {
        this.usernameErrors = [this.$t('common.required')];
      }
      if (!this.password) {
        this.passwordErrors = [this.$t('common.required')];
      }
      return this.usernameErrors.length === 0 && this.passwordErrors.length === 0;
    },
    login() {
      if (!this.formValid()) {
        this.showSnackbar({
          message: this.$t('login.messages.failure'),
          color: 'error',
        });
      } else {
        this.isLoading = true;
        api.auth.post({
          username: this.username,
          password: this.password,
        }).then((response) => {
          this.setToken(response.data.token);
          this.$router.push('/');
        }).catch(() => {
          this.showSnackbar({
            message: this.$t('login.messages.failure'),
            color: 'error',
          });
        }).finally(() => {
          this.isLoading = false;
        });
      }
    },

    ...mapActions([
      'setToken',
      'showSnackbar',
    ]),
  },
  mounted() {
    if (this.$store.state.token) {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>

</style>
