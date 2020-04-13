<template>
  <v-container>
    <h1>Dashboard</h1>
    <p>Realtime Machine Events</p>
    <br />
    <v-text-field
      v-model="search"
      append-icon="mdi-file-search"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="events"
      :items-per-page="5"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:item.ts="{ item }">
        {{
          $moment(new Date(item.ts.seconds * 1000)).format('DD MMM YYYY HH:mm')
        }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="detailItem(item)">mdi-eye</v-icon>
      </template>
    </v-data-table>
    <br />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async fetch({ store }) {
    try {
      await store.dispatch('bindEventsCollection')
    } catch (e) {
      console.error(e)
    }
  },
  data() {
    return {
      search: '',
      headers: [
        { text: 'Equipment', value: 'machine' },
        { text: 'Date Time', value: 'ts' },
        { text: 'Fault', value: 'fault' },
        { text: 'Category', value: 'category' },
        { text: 'Level', value: 'level' },
        { text: 'Actions', value: 'actions', sortable: false }
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
  computed: {
    ...mapGetters(['events'])
  },
  async mounted() {
    try {
      await this.$store.dispatch('bindEventsCollection')
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    detailItem(item) {
      console.log(item)
      this.$router.push('/dashboard/' + item.equipment)
    }
  }
}
</script>

<style></style>
