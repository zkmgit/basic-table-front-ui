import { methodActions, formatOptionsData } from './optionsDataSetting'
import { isArray } from 'lodash'

const state = {
  userOptions: []
}

const getters = {
  userOptions: state => state.userOptions
}

const mutations = {
  setUserOptions: (state, data) => {
    state.userOptions = data
  }
}

const actions = {
  async getOptionsData({ commit, state }, { key }) {
    if (Reflect.has(state, key) && isArray(state[key]) && state[key].length === 0) {
      const apiAction = methodActions[key]
      if (apiAction) {
        const actionResult = await apiAction()

        if (actionResult.code === '1') {
          let options = []
          switch (key) {
            case 'userOptions':
              options = formatOptionsData(actionResult.result, 'default', 'name', 'id')
              break
          }

          commit(`set${key[0].toUpperCase() + key.slice(1)}`, options)
        }
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
