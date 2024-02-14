import { createStore } from 'vuex'
import { Api } from '../api/v1/whatcms'
import { v4 as uuidv4 } from 'uuid'


const makeMutationTypes = (types = []) => types.reduce((acc, type) => ({ ...acc, [type]: type }), {})

const mutetionsTypes = makeMutationTypes([
    'setSeatchText',
    'setMode',
    'setTechnologies',
    'setHosts',
    'setAlerts',
    'setCache',
    'setCacheIsActive',
    'setIsLoading',
])

export const allModes = [
    'Host',
    'Tech'
]

export const store = createStore({
    state() {
        return {
            cache: new Map(),
            cacheIsActive: false,
            searchText: '',
            mode: allModes[0],
            isLoading: false,
            hosts: [],
            technologies: [],
            alerts: []
        }
    },
    mutations: {
        [mutetionsTypes.setSeatchText](state, text) {
            state.searchText = text
        },
        [mutetionsTypes.setHosts](state, hosts) {
            state.hosts = hosts
        },
        [mutetionsTypes.setTechnologies](state, technologies) {
            state.technologies = technologies
        },
        [mutetionsTypes.setMode](state, mode) {
            state.mode = mode
        },
        [mutetionsTypes.setIsLoading](state, isLoading) {
            state.isLoading = isLoading
        },
        [mutetionsTypes.setAlerts](state, alerts) {
            state.alerts = alerts
        },
        [mutetionsTypes.setCache](state, cache) {
            state.cache = cache
        },
        [mutetionsTypes.setCacheIsActive](state, cacheIsActive) {
            state.cacheIsActive = cacheIsActive
        }
    },
    actions: {
        /**
         * fires popup alert with some message
         * 
         * @typedef {Object} Alert
         * @property {string} type
         * @property {string} title
         * 
         * @param {ActionContext} [vuexContext]
         * @param {Alert} alert
         * @return {void}
         */
        fireAlert({ commit, state, dispatch }, alert) {
            const newKey = uuidv4()
            commit(mutetionsTypes.setAlerts, [...state.alerts, {
                key: newKey,
                ...alert
            }])

            setTimeout(() => dispatch('unfireAlert', newKey), 1200)
        },
        /**
         * removes alert by id
         * 
         * @param {ActionContext} [vuexContext]
         * @param {string} unfireKey
         * @return {void}
         */
        unfireAlert({ commit, state }, unfireKey) {
            const unfired = state.alerts.filter(({ key }) => key !== unfireKey)

            commit(mutetionsTypes.setAlerts, [...unfired])
        },
        /**
         * set request mode, e.g. Tech, Host 
         * 
         * @param {ActionContext} [vuexContext]
         * @param {string} unfireKey
         * @return {void}
         */
        setSelectedMode({ commit }, mode) {
            commit(mutetionsTypes.setMode, mode)
        },
        /**
         * set search text
         * 
         * @param {ActionContext} [vuexContext]
         * @param {string} searchText
         * @return {void}
         */
        setSearchText({ commit }, searchText) {
            commit(mutetionsTypes.setSeatchText, searchText)
        },
        /**
         * set cache is active
         * @param {string} searchText
         * @return {void}
         */
        setCacheIActive({ commit }, cacheIsActive) {
            commit(mutetionsTypes.setCacheIsActive, cacheIsActive)
        },
        /**
        * push new record into cache map
        * @param {object} data
        * @param {string} cacheKey
        * @return {void}
        */
        cacheAdd({ state }, { data, cacheKey }) {
            state.cache.set(cacheKey, data)
        },
        /**
         * get host data from api
         * 
         * @param {ActionContext} [vuexContext]
         * @return {void}
         */
        async getHost({ commit, state, dispatch }) {
            commit(mutetionsTypes.setIsLoading, true)
            const cacheKey = `getHost:${state.searchText}`

            if (state.cacheIsActive && state.cache.has(cacheKey)) {
                const hostdata = state.cache.get(cacheKey)

                commit(mutetionsTypes.setIsLoading, false)
                commit(mutetionsTypes.setHosts, hostdata)

                return
            }

            const { hostdata, error } = await Api.getHostDetection({ url: state.searchText })

            if (error) {
                // TODO: process error codes for complex messages
                dispatch('fireAlert', {
                    type: 'error',
                    title: 'Ошибка при получении данных данных о хостах'
                })
            } else {
                dispatch('cacheAdd', { data: hostdata, cacheKey })
            }

            commit(mutetionsTypes.setIsLoading, false)
            commit(mutetionsTypes.setHosts, hostdata)
        },
        /**
         * get technologies data from api
         * 
         * @param {ActionContext} [vuexContext]
         * @return {void}
         */
        async getTechnologies({ commit, state, dispatch }) {
            commit(mutetionsTypes.setIsLoading, true)

            const cacheKey = `getTechnologies:${state.searchText}`

            if (state.cacheIsActive && state.cache.has(cacheKey)) {
                const technologies = state.cache.get(cacheKey)

                commit(mutetionsTypes.setIsLoading, false)
                commit(mutetionsTypes.setTechnologies, technologies)

                return
            }

            const { technologies, error } = await Api.getTechnologies({ url: state.searchText })

            if (error) {
                dispatch('fireAlert', {
                    type: 'error',
                    title: 'Ошибка при получении данных о технологиях'
                })
            } else {
                dispatch('cacheAdd', { data: technologies, cacheKey })
            }

            commit(mutetionsTypes.setIsLoading, false)
            commit(mutetionsTypes.setTechnologies, technologies)
        }
    }
})