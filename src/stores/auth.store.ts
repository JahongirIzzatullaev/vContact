import {UserModel} from '../models/auth.model'
import {defineStore} from 'pinia'
import {reactive} from 'vue'

export type AuthState = {
  user: UserModel;
}
export const useAuthStore = defineStore('auth', () => {
  const state = reactive<AuthState>({
    user: new UserModel('test@test.ru', '123123'),
  }) as AuthState

  const login = async (login, password): boolean => {
    if (login.value === state.user.login && password.value === state.user.password) {
      state.user.login = login;
      state.user.password = password;
      localStorage.setItem('token', Date.now())
      return true
    }
    console.log('123');
    return false
  }

  const logout = (): void => {
    localStorage.removeItem('token')
  }
  return {
    login,
    logout
  }
})
