<template>
  <v-container>
    <h1>Dashboard - {{ this.$route.params.equipment }}</h1>
    <p>Realtime Machine Events</p>
    <br />
    <v-data-table
      :headers="headers"
      :items="faults"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="detailItem(item)"
          >mdi-eye</v-icon
        > </template
      >s
    </v-data-table>
    <br />
    <v-btn nuxt-link outlined to="/dashboard">Back to All Machines</v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'Equipment', value: 'equipment' },
        { text: 'Date', value: 'date' },
        { text: 'Time', value: 'time' },
        { text: 'Fault', value: 'fault' },
        { text: 'Category', value: 'category' },
        { text: 'Level', value: 'level' }
        // { text: "Actions", value: "actions", sortable: false }
      ],
      faults: [
        {
          equipment: 'T234',
          date: '23-05-2020',
          time: '15:20',
          fault: 'Radio Error',
          category: 'Auxiliary',
          level: 'Warning'
        },
        {
          equipment: 'T345',
          date: '23-05-2020',
          time: '15:25',
          fault: 'Strobe Error',
          category: 'Safety',
          level: 'Danger'
        },
        {
          equipment: 'T734',
          date: '26-05-2020',
          time: '01:13',
          fault: '12V Supply Error',
          category: 'Power',
          level: 'Danger'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style></style>
