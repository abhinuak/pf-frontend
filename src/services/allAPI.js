const { BASE_URL } = require("./baseUrl")
const { commonAPI } = require("./commonAPI")

//register api
export const registerAPI = async(user)=>{
    return await commonAPI("POST",`${BASE_URL}/user/register`,user,"")
}
// login api

export const loginAPI = async(user)=>{
    return await commonAPI("POST",`${BASE_URL}/user/login`,user,"")
}
//add project

export const addProjectAPI = async (reqBody,reqHeaders)=>{
    return await commonAPI("POST",`${BASE_URL}/projects/add`,reqBody,reqHeaders)
}

// home project
export const homeProjectAPI = async ()=>{
    return await commonAPI("GET",`${BASE_URL}/projects/home-projects`,"","")
}

// all project
export const allProjectAPI = async (searchKey,reqHeaders)=>{
    return await commonAPI("GET",`${BASE_URL}/projects/all?search=${searchKey}`,"",reqHeaders)
}

// userApi
export const userProjectAPI = async (reqHeaders) => {
    return await commonAPI("GET",` ${BASE_URL}/user/all-projects`, "", reqHeaders);
  };

//   edit 

export const editProjectAPI = async (projectId,reqBody,reqHeaders) => {
    return await commonAPI("PUT",` ${BASE_URL}/user/project/edit/${projectId}`,reqBody, reqHeaders);
  };


