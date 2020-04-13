<template>
  <v-container>
    <v-img
      src="https://focused-swirles-1663f8.netlify.com/images/hdsm.png"
      width="300"
    ></v-img>
    <h1>Tentang PDU Monitor</h1>
    <p>
      Power Distribution Unit adalah sebuah device yang sangat essensial bagi
      setiap alat berat maupun haul truck di area mining. Seiring dengan
      kemajuan teknologi, kini perangkat PDU tidak bekerja secara stand alone
      melainkan telah terkoneksi dengan server dan pusat data sehingga anda
      dapat memonitor kondisi sistem kelistrikan pada unit alat berat secara
      real-time.
    </p>
    <v-btn color="#E7D39F" nuxt-link to="/dashboard">Ke Dashboard</v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      problemTitle: 'Type your Problem here',
      problemText: 'Describe your Problem'
    }
  }
}
</script>
