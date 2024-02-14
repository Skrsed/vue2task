/**
 * @typedef {Object} WatchCMSAnswer
 * @property {object} data - request result
 * @property {object} error - error (nullable)
 */

/**
 * @typedef {Object} HostDetectionData
 * @property {string} ip
 * @property {string} type
 * @property {number} isp_id
 * @property {string} isp_name
 * @property {string} isp_url
 */

/**
 * @typedef {Object} TechnologiesData
 * @property {string} name
 * @property {string} id
 * @property {number} version
 * @property {string} categories
 * @property {string} url
 */

/**
 * This is a request template function.
 *
 * @param {string} args.method - request method, ex. 'POST' | ... 
 * @param {string} args.edpoint - request endpoint, ex. Tech -> /Tech/
 * @param {string} args.body - request body params
 * @param {string} args.query - request query params, ex. url -> &url=reddit.com
 * 
 * @return {WatchCMSAnswer} 
 *
 * @example
 *     request({
 *         endpoint: 'Tech',
 *         query: {
 *              url: 'https://reddit.com'
 *          },
 *          
 *     })
 */
const request = async ({ method, endpoint, body, query, cache }) => {
    const bodyString = JSON.stringify(body)

    const queryString = new URLSearchParams(query)

    const key = '6252cf7b9f5534edd8d5e40b4660fe03bcadfb2336018f21986567633b9adb776df7d8'

    const url = `https://whatcms.org/API/${endpoint}?key=${key}&${queryString}`

    // We're have errors in WatchCMSAnswer.code and WatchCMSAnswer.msg
    // so let's process http errors in generic request function

    try {
        // TODO: env
        // eslint-disable-next-line max-len
        const res = await fetch(url, {
            method,
            mode: 'cors', // requests from localhost will be blocked
            //cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Origin': 'http://localhost:5173',
                'Referer': 'http://localhost:5173'
            },
            // referrerPolicy: 'no-referrer',
            body: bodyString,
        })

        const json = await res.json()

        const {
            result: { code, msg: message }
        } = json

        if (code !== 200) {
            // TODO: global.notify(message)
            console.warn({ code, message })
            return { data: null, error: message }
        }

        return { data: json, error: null }
    } catch (e) {
        // error while fetching the result, prob. 500

        return { data: null, error: e }
    }
}

/**
 * Request technologies from whatcms
 *
 * @param {string} args.url - needle url
 *
 * @return {TechnologiesData[]} 
 */
const getTechnologies = async ({ url }) => {
    const res = await request({
        method: 'GET',
        endpoint: 'Tech',
        query: { url }
    })

    const technologies = res?.data?.results ?? []
    const { error } = res

    return { technologies, error }
}

/**
 * Request technologies from whatcms
 *
 * @param {string} args.url - needle url
 *
 * @return {HostDetectionData[]} 
 */
const getHostDetection = async ({ url }) => {
    const res = await request({
        method: 'GET',
        endpoint: 'Host',
        query: { url }
    }) || []


    const hostdata = res?.data?.results ?? []
    const { error } = res

    return { hostdata, error }
}

export const Api = {
    getTechnologies,
    getHostDetection
}