const { default: axios } = require("axios");
const { BACKEND_URL } = require("./constant.service");
const HOMEWORKLIST_URL = `${BACKEND_URL}/api/homeworklist`

module.exports = {
    // File

    createFile: async (discord_id,channel_id,body) => {
        return axios.post(`${HOMEWORKLIST_URL}/account/${discord_id}/channel/${channel_id}/file`,body)
    },

    getAllFiles: async (discord_id) => {
        return axios.get(`${HOMEWORKLIST_URL}/account/${discord_id}/file`)
    },

    editFile: async (discord_id,file_id,body) => {
        return axios.put(`${HOMEWORKLIST_URL}/account/${discord_id}/file/${file_id}`,body)
    },

    deleteFile: async (discord_id,file_id) => {
        return axios.delete(`${HOMEWORKLIST_URL}/account/${discord_id}/file/${file_id}`)
    },

    // Homework

    addHomework: async (discord_id,channel_id,body) => {
        return axios.post(`${HOMEWORKLIST_URL}/account/${discord_id}/channel/${channel_id}/homework`,body)
    },

    getAllHomeworks: async (channel_id) => {
        return axios.get(`${HOMEWORKLIST_URL}/channel/${channel_id}`)
    },

    editHomework: async (discord_id,channel_id,homework_id,body) => {
        return axios.put(`${HOMEWORKLIST_URL}/account/${discord_id}/channel/${channel_id}/homework/${homework_id}`,body)
    },

    deleteHomework: async (discord_id,channel_id,homework_id) => {
        return axios.delete(`${HOMEWORKLIST_URL}/account/${discord_id}/channel/${channel_id}/homework/${homework_id}`)
    },

    // Channel

    openFile: async (discord_id,channel_id,file_id) => {
        return axios.put(`${HOMEWORKLIST_URL}/account/${discord_id}/channel/${channel_id}/file/${file_id}`)
    },

    editChannel: async (discord_id,channel_id,body) => {
        return axios.put(`${HOMEWORKLIST_URL}/account/${discord_id}/channel/${channel_id}`,body)
    }
}
