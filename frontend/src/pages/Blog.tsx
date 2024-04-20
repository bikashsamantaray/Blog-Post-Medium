import { useParams } from "react-router-dom"
import { FullBlog } from "../components/FullBlog"
import { useBlog } from "../hooks"
import { Spinner } from "../components/Spinner"
import { Appbar } from "../components/AppBar"

export const Blog= () => {


    const {id} = useParams()
    console.log(id);
    


    const {loading,blog} = useBlog({
        id:id || ""
    })

    if(loading || !blog){
        return <div>
            <Appbar/>
            <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <Spinner/>

            </div>
            
        </div>
        </div> 
        
    }

    return <div>
        <FullBlog blog={blog}/>
    </div>

}