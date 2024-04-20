import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName:string;
    title:string;
    content:string;
    publishDates:string;
    id:string
}

export const Blogcards = ({
    authorName,
    title,
    content,
    publishDates,
    id
}:BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
    
    <div className="border-b p-4 w-screen max-w-screen-md cursor-pointer">

        <div className="flex">
            <div className="flex">
                <Avatar name={authorName}/>
            </div>
            <div className="font-extralight pl-2 text-sm">
                {authorName}
            </div>
            <div className="pl-2 textxl">
                &#xb7;
            </div>
            <div className="pl-2 font-thin text-slate-400 text-sm">
                {publishDates}
            </div>
        </div>
        <div className="text-2xl font-bold pt-2">
            {title}
        </div>
        <div className="text-xl font font-thin">
            {content.slice(0,100) + "..."}
        </div>
        <div className="text-slate-400 text-sm font-thin pt-2">
            {`${Math.ceil(content.length/100)} minutes read`}
        </div>

    </div>
    </Link>
}

export function Avatar({name} : {name:string}) {
    
    return <div className={`relative inline-flex items-center justify-center w-6 h-6 overflow-hidden
     bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className="text-xs text-gray-600 dark:text-gray-300">
            {name[0]}
        </span>
    </div>

}