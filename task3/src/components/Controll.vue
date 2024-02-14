<script>
import { mapActions } from 'vuex'
import { allModes } from '../store/whatcmsStore'

export default {
    data() {
        return {
            allModes,
            searchText: '',
            cacheIsActive: false,
            selectedMode: allModes[0]
        }
    },
    methods: {
        ...mapActions([
            'getTechnologies',
            'getHost',
            'setSearchText',
            'setSelectedMode',
            'setCacheIActive'
        ]),
        onSearch() {
            this.setSearchText(this.searchText)
            this.setSelectedMode(this.selectedMode)
            this.setCacheIActive(this.cacheIsActive)

            if (this.selectedMode === 'Tech') this.getTechnologies()
            if (this.selectedMode === 'Host') this.getHost()
        }
    }
}
</script>
<template>
    <v-card class="mx-auto">
        <v-card-text>
            <v-switch v-model="this.cacheIsActive" color="primary" hide-details inset label="Использовать кэш"></v-switch>
            <v-row class="row" no-gutters>
                <v-col cols="2"><v-combobox variant="solo" label="Метод" :items="this.allModes" single-line hide-details
                        v-model="this.selectedMode"></v-combobox></v-col>
                <v-col>
                    <v-text-field variant="solo" label="Искать по url" append-inner-icon="mdi-magnify"
                        v-model="this.searchText" single-line hide-details @click:append-inner="this.onSearch"
                        @keyup.enter="this.onSearch">
                    </v-text-field>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<style scoped>
.row {
    gap: 16px;
}
</style>