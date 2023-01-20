const { default: axios } = require("axios");
const { BACKEND_URL } = require("./constant.service");
const HOMEWORKLIST_URL = `${BACKEND_URL}/api/homeworklist`

module.exports = {
    // File

    createFile: async (discord_id,channel_id,body) => {
        return axios.post(`${HOMEWORKLIST_URL}/account/${discord_id}/channel/${channel_id}/file`,body)
                .then(res => {return res}).catch(err => {return err.response})
    },

    getAllFiles: async (discord_id) => {
        return axios.get(`${HOMEWORKLIST_URL}/account/${discord_id}/file`)
                .then(res => {return res}).catch(err => {return err.response})
    },

    editFile: async (discord_id,file_id,body) => {
        return axios.put(`${HOMEWORKLIST_URL}/account/${discord_id}/file/${file_id}`,body)
                .then(res => {return res}).catch(err => {return err.response})
    },

    deleteFile: async (discord_id,file_id) => {
        return axios.delete(`${HOMEWORKLIST_URL}/account/${discord_id}/file/${file_id}`)
                .then(res => {return res}).catch(err => {return err.response})
    },

    // Homework

    addHomework: async (discord_id,channel_id,body) => {
        return axios.post(`${HOMEWORKLIST_URL}/account/${discord_id}/channel/${channel_id}/homework`,body)
                .then(res => {return res}).catch(err => {return err.response})
    },

    getAllHomeworks: async (channel_id,type) => {
        if(!type) type = 'ALL'
        return axios.get(`${HOMEWORKLIST_URL}/channel/${channel_id}` + `?type=${type.toUpperCase()}`)
                .then(res => {return res}).catch(err => {return err.response})
    },

    editHomework: async (discord_id,channel_id,homework_id,body) => {
        return axios.put(`${HOMEWORKLIST_URL}/account/${discord_id}/channel/${channel_id}/homework/${homework_id}`,body)
                .then(res => {return res}).catch(err => {return err.response})
    },

    deleteHomework: async (discord_id,channel_id,homework_id) => {
        return axios.delete(`${HOMEWORKLIST_URL}/account/${discord_id}/channel/${channel_id}/homework/${homework_id}`)
                .then(res => {return res}).catch(err => {return err.response})
    },

    // Channel

    openFile: async (discord_id,channel_id,file_id) => {
        return axios.put(`${HOMEWORKLIST_URL}/account/${discord_id}/channel/${channel_id}/file/${file_id}`)
                .then(res => {return res}).catch(err => {return err.response})
    },

    editChannel: async (discord_id,channel_id,body) => {
        return axios.put(`${HOMEWORKLIST_URL}/account/${discord_id}/channel/${channel_id}`,body)
                .then(res => {return res}).catch(err => {return err.response})
    }
}
