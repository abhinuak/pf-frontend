import axios from 'axios'

export const commonAPI = async (httpRequest,url,reqBody,reqHeaders)=>{
    const reqConfig={
        method:httpRequest,
        url,
        data:reqBody,
        headers:reqHeaders?reqHeaders: {"Content-Type":"application/json"}

    }
    return await axios(reqConfig).then(
        (result)=>{
            return result
        }
    ).catch((err)=>{
        return err
    })
}