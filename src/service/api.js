import axios from "axios";

export const POST = async (url,payload, header)=>{
const res =    await axios.post(url, payload);
console.log("res is ", res);
const data = res.data
}

export const GET = async (url)=>{
    const res = await axios.get(url);
    // console.log("res in get Api", res);
    return res?.data || []
}