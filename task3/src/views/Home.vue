<script setup>
import Controll from '../components/Controll.vue'
import Show from '../components/Show.vue'
import Alerts from '../components/Alerts.vue'
</script>
<script>
import { mapState } from 'vuex'

export default {
    computed: mapState(['hosts', 'technologies', 'mode', 'alerts', 'isLoading']),
}

</script>
<template>
    <v-app>
        <Alerts :alerts="alerts" />
        <v-container>
            <Controll />
            <Show :items="mode === 'Host' ? hosts : technologies" :isLoading="isLoading" />
        </v-container>
    </v-app>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
