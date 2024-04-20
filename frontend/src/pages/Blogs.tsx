import { Appbar } from "../components/AppBar"
import { Blogcards } from "../components/BlogCards"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = () => {

    const {loading,blogs} = useBlogs();

    if(loading){
        return <div>
            <Appbar/>
            <div className="flex justify-center">
                <div>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                </div>
            </div>
        </div>
    }


    return <div >

        <Appbar/>
        <div className=" flex justify-center">
            <div className="max-w-xl">
                
                

                {blogs.map(blog =>
                    <Blogcards 
                    id={blog.id}
                    authorName = {blog.author.name || "Anonymous"}
                    title = {blog.title}
                    content={blog.content}
                    publishDates = {"2nd feb"} />
                )}


            
            
            </div>

        </div>

        
    </div>
}