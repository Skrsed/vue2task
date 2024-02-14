<script>
export default {
    props: ['items', 'isLoading'],
    methods: {
        pretty(val) {
            if (Array.isArray(val)) {
                return val.join(', ')
            }

            return val
        }
    }
}
</script>
<template>
    <v-skeleton-loader v-for="index in 3" :key="index" type="card" v-show="isLoading" class="mt-8"></v-skeleton-loader>
    <v-card v-for="(item, index) in items" :key="index" class="mt-8">
        <template v-slot:text>
            <v-list lines="two">
                <template v-for="([key, val], index) in Object.entries(item)" :key="index">
                    <v-divider v-show="index !== 0"></v-divider>
                    <v-list-item class="d-flex justify-left text-left my-2">
                        <template v-slot:title>
                            {{ key }}
                        </template>
                        <template v-slot:subtitle>
                            {{ pretty(val) }}
                        </template>
                    </v-list-item>
                </template>
            </v-list>
        </template>
    </v-card>
</template>