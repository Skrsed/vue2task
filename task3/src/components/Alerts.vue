<script>
export default {
    props: ['alerts']
}
</script>
<template>
    <div class="notificationContainer">
        <v-slide-y-transition group>
            <v-alert v-for="({ type, title, text }, index) in alerts" density="compact" :key="index" :type="type"
                :title="title" :text="text" transition="slide-y-transition">
            </v-alert>
        </v-slide-y-transition>
    </div>
</template>
<style scoped>
.notificationContainer {
    position: fixed;
    top: 10px;
    right: 10px;
    display: grid;
    grid-gap: .5em;
    z-index: 99;
}
</style>