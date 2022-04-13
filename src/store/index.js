import { createStore } from 'vuex'
import axiosInstance from "../_helpers/axios";

const store = createStore({
    state: {

    },
    getters: {},
    mutations: {},
    actions: {
      getLogs({ commit }, queryObj = { dateFrom: '', dateTo: '', countryId: '', userId: '' }) {
          const query = Object.entries(queryObj)
          .reduce((queryArr, [key, value]) => [...queryArr, `${key}=${value}`], [])
          .join('&')

        return axiosInstance.get(`/logs?${query}`);
      },

      getUsers() {
          return axiosInstance.get(`/users`);
      },

      getCountries() {
          return axiosInstance.get(`/countries`);
      }
    }
})

export default store
