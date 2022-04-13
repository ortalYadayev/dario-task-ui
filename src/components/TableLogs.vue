<template>
  <div class="flex justify-center mt-10 mx-4 pb-10">
    <table class="w-1/2 table-auto w-full bg-white shadow-lg text-center rounded-lg">
      <thead class="text-white">
        <tr class="bg-primary-color table-row sm:rounded-none">
          <th class="rounded-tl-lg p-3 sm:w-10">
            Date
          </th>
          <th class="p-3 sm:w-40">
            Successfully Sent
          </th>
          <th class="rounded-tr-lg p-3 sm:w-40">
            Failed
          </th>
        </tr>
      </thead>

      <tbody class="flex-1 sm:flex-none">
        <tr>
          <td class="border-gray border-t border-l hover:bg-gray p-3">
          1
          </td>
          <td class="border-gray border-t border-l hover:bg-gray p-3">
           2
          </td>
          <td class="border-gray border-t border-l hover:bg-gray p-3">
            3
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TableLogs"
}
</script>

<style scoped>

</style>