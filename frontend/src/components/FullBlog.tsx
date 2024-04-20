import { Blog } from "../hooks"
import { Appbar } from "./AppBar"
import { Avatar } from "./BlogCards"

export const FullBlog = ({blog}: {blog:Blog}) => {
    return <div>
        <div>
            <Appbar/>
        </div>

        <div className="flex justify-center">

            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-2xl pt-12">

                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        
                        <div className="text-slate-500 pt-2">
                            Posted on 2nd Dec
                        </div>
                        <div className="pt-4">
                            {blog.content}
                        </div>

                    </div>
                    <div className="col-span-4">
                            
                                Author
                                <div className="flex">

                                    <div className="pr-4 flex flex-col justify-center " >
                                         <Avatar name={blog.author.name || "Anonymous"}/>
                                    </div>
                                    <div className="">
                                        <div className="font-bold text-xl">
                                                {blog.author.name || "Anonymous"}
                                        </div>
                                    
                                            <div className="pt-2 text-slate-500">
                                                Random catch phrase to grab
                                            </div>
                                    </div>

                                </div>
                            

                            
                        
                    </div>
                    

                    </div>

            </div>

    </div> 
    
}