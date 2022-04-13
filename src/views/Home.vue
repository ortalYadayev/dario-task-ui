<template>
    <div class="min-h-screen bg-gray">
      <Form
        :dateFrom="payload.dateFrom"
        :dateTo="payload.dateTo"
        :countryId="payload.countryId"
        :userId="payload.userId"
        :errors="errors"
        @update:dateFrom="dateFrom => payload.dateFrom = dateFrom"
        @update:dateTo="dateTo => payload.dateTo = dateTo"
        @update:countryId="countryId => payload.countryId = countryId"
        @update:userId="userId => payload.userId = userId"
        @onSubmit="onSubmit"
      />
      <TableLogs :logs="logs" />
    </div>
</template>

<script setup>
import Form from '../components/Form.vue';
import TableLogs from "../components/TableLogs.vue";
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const errors = ref({})
const payload = ref({
    dateFrom: null,
    dateTo: null,
    countryId: '',
    userId: '',
})

const logs = ref([])

async function onSubmit() {
  try {
    const response = await store.dispatch('getLogs', payload.value);

    logs.value = response.data;
  } catch (error) {
    if (error.response.status === 422) {
     errors.value = {
        message: 'Dates are required'
      }
    }
  }
}

</script>