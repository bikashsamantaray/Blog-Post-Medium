import { SignUpInput } from "@bikhulky/medium-common"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import { Spinner } from "./Spinner"



export const Auth = ({type}: {type:"signup" | "signin"}) => {

    const navigate = useNavigate()

    const [postInputs,setPostInputs] = useState<SignUpInput>({
        email:"",
        password:"",
        name:""
    })
    const [loading,setLoading] = useState(false)

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type == "signup" ? "signup" : "signin"}`,postInputs)
            const jwt = response.data.jwt
            localStorage.setItem("token",jwt)
            navigate("/blogs")
        }catch(e){

        }
    }
    function handleClick(){
        setLoading(true);
        
    }

    return <div className="h-screen flex justify-center flex-col">

        <div className="flex justify-center">

            <div> 
                    <div className="px-10">
                        <div className="font-extrabold text-3xl">
                            Create An Account
                        </div>
                        <div className="text-slate-400 pl-4">
                            {type == "signup" ? "Already have an account?" : "Don't have an account"}
                            <Link className="underline pl-2" to={type == "signup" ? "/signin" : "/signup" }>{type == "signup" ? "Login" : "Sign up"}</Link>
                        </div>
                    </div>
                    <div className="pt-4">
                        {type == "signup" ? <LabelledInput label="Name" placeholder="Bikash Kumar Samantaray..." onChange={(e) =>{
                            setPostInputs({
                                ...postInputs,//retain the existiong username and password
                                name:e.target.value})
                        }} /> : null }
                    </div>
                    <div>
                        <LabelledInput label="Email" placeholder="bikash@gmail.com" onChange={(e) =>{
                            setPostInputs({
                                ...postInputs,//retain the existiong username and password
                                email:e.target.value})
                        }} />
                    </div>
                    <div>
                        <LabelledInput type={"password"} label="password" placeholder="*******" onChange={(e) =>{
                            setPostInputs({
                                ...postInputs,//retain the existiong username and password
                                password:e.target.value})
                        }} />
                    </div>
                    <div>
                    <button onClick={() => {
                        sendRequest(),
                        handleClick()
                    }} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 w-full
                     focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
                      dark:focus:ring-gray-700 dark:border-gray-700 mt-4">{loading? <Spinner /> : type == "signup" ? "Sign up" : "Sign in"}</button>
                    </div>

            </div>
            
        </div>
        
        
    </div>

}
interface LabelledInputType{
    label:string,
    placeholder:string,
    onChange:(e:ChangeEvent<HTMLInputElement>) => void
    type?: string
}
function LabelledInput({label,placeholder,onChange,type}:LabelledInputType){
    return <div>
        <div>
            <label className="block mb-2 text-sm font-semibold text-gray-900 pt-4">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border
             border-gray-300 text-gray-900 text-sm rounded-lg
             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
             " placeholder={placeholder} required />
        </div>
    </div>
}