import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development"? "http://localhost:5000/api" : "/api",
    withCredentials:true,  //sends cookies to the server for we are using req.cookies in the middelwares


    //  if in developmenmt mode use the localhost:5000/acpi if not use the techHive.com since it is being deployed server must send teh things to techHive.com

})