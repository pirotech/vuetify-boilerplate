import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import Vuetify from 'vuetify';
import { shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import Login from '../Login';
import api from '../../shared/api/api';
import ru from '../../i18n-ru.json';

jest.mock('../../shared/api/api');
api.auth.post.mockResolvedValue({
  data: { token: '12345' },
});

describe('login', () => {
  let wrapper;
  let store;
  let i18n;
  let pushFn;
  let setTokenFn;
  let showSnackbarFn;

  beforeEach(() => {
    // router
    pushFn = jest.fn();
    // vuex
    Vue.use(Vuex);
    setTokenFn = jest.fn();
    showSnackbarFn = jest.fn();
    store = new Vuex.Store({
      actions: {
        setToken: setTokenFn,
        showSnackbar: showSnackbarFn,
      },
    });
    // i18n
    Vue.use(VueI18n);
    i18n = new VueI18n({
      locale: 'ru',
      messages: { ru },
    });
    // vuetify
    Vue.use(Vuetify);

    wrapper = shallowMount(Login, {
      mocks: {
        $router: {
          push: pushFn,
        },
      },
      store,
      i18n,
      Vue,
    });
  });

  test('NOT might be login with empty username and password', async () => {
    // arrange
    wrapper.setData({
      username: '',
      password: '',
    });

    // act
    wrapper.find('.login-button').vm.$emit('click');
    await flushPromises();

    // assert
    expect(showSnackbarFn).toHaveBeenCalled();
    const snackbar = showSnackbarFn.mock.calls[0][1];
    expect(snackbar).toMatchObject({
      message: i18n.t('login.messages.failure'),
    });

    expect(wrapper.vm.usernameErrors).toContain(i18n.t('common.required'));
    expect(wrapper.vm.passwordErrors).toContain(i18n.t('common.required'));
  });

  test('might be login with username and password', async () => {
    // arrange
    wrapper.setData({
      username: 'admin@brains.xxx',
      password: 'admin72',
    });

    // act
    wrapper.find('.login-button').vm.$emit('click');
    await flushPromises();

    // assert
    expect(pushFn).toHaveBeenCalled();
    const routePath = pushFn.mock.calls[0][0];
    expect(routePath).toBe('/');

    expect(wrapper.vm.usernameErrors).toHaveLength(0);
    expect(wrapper.vm.passwordErrors).toHaveLength(0);
  });
});
