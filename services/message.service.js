const { default: axios } = require("axios");
const { BACKEND_URL } = require("./constant.service");
const MESSAGE_URL = `${BACKEND_URL}/api/message`

module.exports = {
    postMessage: async (body) => {
        return axios.post(MESSAGE_URL,body)
    }
}