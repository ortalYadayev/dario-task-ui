<template>
  <div class="flex justify-center items-center flex-col md:flex-row px-5 md:px-0 pt-10">
    <form
        class="w-full xl:w-1/3 md:w-1/2 rounded-xl shadow-md bg-white py-6 sm:py-8 px-5 sm:px-12"
        @submit.prevent="onSubmit"
    >
      <div class="text-center text-4xl sm:text-5xl">
        Logs
      </div>

      <div class="flex flex-col pb-4">
        <label
            class="mb-1 text-primary-color text-xs sm:text-sm tracking-wide font-medium"
            for="country"
        >
          Country
        </label>
        <select
            id="country"
            class="duration-200 shadow rounded-md py-2 border-2 border-primary-color px-4 focus:outline-none"
            value="Country"
            v-model="payload.countryId"
        >
          <option value="" selected>choose country</option>
          <option
              v-for="(country) in countries"
              :key="country.id"
              :value="country.id"
          >
            {{ country.country_title }}
          </option>
        </select>
      </div>
      <div class="flex flex-col pb-4">
        <label
            for="user"
            class="mb-1 text-primary-color text-xs sm:text-sm tracking-wide font-medium"
        >
          User Name
        </label>
        <select
            id="user"
            class="duration-200 shadow rounded-md py-2 border-2 border-primary-color px-4 focus:outline-none"
            value="User"
            v-model="payload.userId"
        >
          <option value="" selected>choose user</option>
          <option
              v-for="user in users"
              :key="user.id"
              :value="user.id"
          >
            {{ user.user_name }}
          </option>
        </select>
      </div>

      <div class="pb-4">
        <input
            type="date"
            class="duration-200 border-b-2 borderprimary-color bg-transparent  px-3 pb-1.5"
            :class="errors.message ? 'border-red-500' : 'border-primary-color hover:border-primary-color focus:border-primary-color'"
            placeholder="Start Date"
            v-model="payload.dateFrom"
            @input="resetError('message')"
        >
        <input
            type="date"
            class="duration-200 border-b-2 border-primary-color bg-transparent px-3 pb-1.5"
            :class="payload.dateFrom === null ? 'cursor-not-allowed': '', errors.message ? 'border-red-500' : 'border-primary-color hover:border-primary-color focus:border-primary-color'"
            placeholder="Start Date"
            v-model="payload.dateTo"
            @input="resetError('message')"
            :disabled="payload.dateFrom === null"
            :min="payload.dateFrom"
        >

        <transition name="slide-fade">
          <div
              v-if="errors.message"
              class="italic text-xs text-red-500 mt-2"
          >
            {{ errors.message }}
          </div>
        </transition>
      </div>

      <div class="flex items-center justify-center">
        <button
            class="duration-200 shadow-md rounded-xl text-xl tracking-wide w-full bg-primary-color hover:bg-gray text-gray hover:text-primary-color font-medium py-2"
            type="submit"
            value="Submit"
        >
          send
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, reactive } from "vue";

const store = useStore();

const errors = ref({});
const logs = ref({});
const users = ref({});
const countries = ref({});
const payload = reactive({
  countryId: '',
  userId: '',
  dateFrom: null,
  dateTo: null,
});

getUsersAndCountries();

async function getUsersAndCountries() {
  const responseUsers = await store.dispatch('getUsers', payload);
  const responseCountries = await store.dispatch('getCountries', payload);

  users.value = responseUsers.data
  countries.value = responseCountries.data
}

async function onSubmit() {
  console.log(payload)
  try {
    const response = await store.dispatch('getLogs', payload);

    logs.value = response.data
  } catch (error) {
    if (error.response.status === 422) {
      errors.value = {
        message: 'Dates are required'
      }
    }
  }
}

function resetError(key) {
  delete errors.value[key];
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>