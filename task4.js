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
            },
            // referrerPolicy: 'no-referrer',
            body: bodyString,
        })

        const json = await res.json()

        const {
            result: { code, msg: message }
        } = json

        if (code !== 200) {
            return { data: json, error: message }
        }

        return { data: json, error: null }
    } catch (e) {
        // error while fetching the result, prob. 500

        return { data: null, error: e }
    }
}

const urls = [
    'google.com',
    'google.ru',
    'g123123oogle.com',
    'google.by',
    'go123123ogle.com',
    'google.jp',
    'go123r323rogle.com',
    'google.org',
    'microsoft.com',
    'google.net',
    'reddit.com',
]

const requests = urls.map((url) => request({
    method: 'GET',
    endpoint: 'Tech',
    query: { url }
}))

    ;
(async () => {
    const results = await Promise.all(requests)
    const resObject = {}
    urls.forEach((e, i) => {
        const res = results[i]?.data
        if (res) {
            resObject[e] = res
        }
    })

    console.log(JSON.stringify(resObject, null, 4))
})()