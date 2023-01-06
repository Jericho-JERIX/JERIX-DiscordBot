const { default: axios } = require("axios");
const { BACKEND_URL } = require("./constant.service");
const HOMEWORKLIST_URL = `${BACKEND_URL}/api/homeworklist`

// File

export async function createFile(discord_id,channel_id,body){
    return axios.get(`${HOMEWORKLIST_URL}/account/${discord_id}/channel/${channel_id}/file`,body)
}

export async function getAllFiles(discord_id){
    return axios.get(`${HOMEWORKLIST_URL}/account/${discord_id}/file`)
}

export async function editFile(discord_id,file_id,body){
    return axios.put(`${HOMEWORKLIST_URL}/account/${discord_id}/file/${file_id}`,body)
}

export async function deleteFile(discord_id,file_id){
    return axios.delete(`${HOMEWORKLIST_URL}/account/${discord_id}/file/${file_id}`)
}

// Homework

export async function addHomework(discord_id,channel_id,body){
    return axios.post(`${HOMEWORKLIST_URL}/account/${discord_id}/channel/${channel_id}/homework`,body)
}

export async function getAllHomeworks(channel_id){
    return axios.get(`${HOMEWORKLIST_URL}/channel/${channel_id}`)
}

export async function editHomework(discord_id,channel_id,homework_id,body){
    return axios.put(`${HOMEWORKLIST_URL}/account/${discord_id}/channel/${channel_id}/homework/${homework_id}`,body)
}

export async function addHomework(discord_id,channel_id,homework_id){
    return axios.delete(`${HOMEWORKLIST_URL}/account/${discord_id}/channel/${channel_id}/homework/${homework_id}`)
}

// Channel

export async function openFile(discord_id,channel_id,file_id){
    return axios.put(`${HOMEWORKLIST_URL}/account/${discord_id}/channel/${channel_id}/file/${file_id}`,body)
}

export async function editChannel(discord_id,channel_id,body){
    return axios.put(`${HOMEWORKLIST_URL}/account/${discord_id}/channel/${channel_id}`,body)
}