import axios from "axios"
import { Appbar } from "../components/AppBar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const navigate = useNavigate();
    return <div>

        <Appbar/>

        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
            
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                focus:border-blue-500 block w-full p-2.5  " placeholder="Title"/>

            </div>
            
        </div>
        <div className="flex justify-center w-full pt-4">
            <div className="pt-8 max-w-screen-lg w-full">
                <TextEditor onChange={(e) => {
                    setContent(e.target.value)
                }} />
            </div>
        </div>

        <div className="flex justify-center w-full pt-4">
            <div className="pt-8 max-w-screen-lg w-full">
                        <button onClick={ async () =>{
                            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                                title,
                                content
                            },{
                                headers:{
                                    Authorization: "Bearer " + localStorage.getItem("token") 
                                }
                            })
                            navigate(`/blog/${response.data.id}`)
                        }} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 w-full
                        focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
                        dark:focus:ring-gray-700 dark:border-gray-700 mt-4">Publish</button>
            </div>
        </div>
            
    </div> 
        
}

function TextEditor({onChange}:{  onChange:(e:ChangeEvent<HTMLInputElement>) => void }){
    return <div className="mb-6">
   
    <input onChange={onChange} type="text"  className="block w-full p-8
     text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500" 
     placeholder="Write the content"/>
</div>
}