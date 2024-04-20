import { createBlogInput, updateBlogInput } from '@bikhulky/medium-common'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { verify } from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string
    },
    Variables:{
        userId:string
    }
  }>()

  //middleware

  blogRouter.use('/*', async (c, next) => {

    const headers = c.req.header("authorization") || ""
  
    const token = headers.split(" ")[1]
    const res = await verify(token,"secret")
    if (res.id) {
        c.set("userId",res.id)
         await next()
    }else{
      c.status(403)
      return c.json({error:"unauthorized"})
    } 
  })
  
  //-----------------------------------------------------



  blogRouter.post('/',async (c) => {

    const body =await c.req.json();

    const {success} = createBlogInput.safeParse(body)
  
    if (!success) {
      c.status(411)
      return c.json({
          message:"Inputs not valid"
      })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userId = c.get("userId")

    const post = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:userId

        }
    })

    return c.json({
        id:post.id
    })
  })

  
  
  blogRouter.put('/',async (c) => {

     const body =await c.req.json();

  const {success} = updateBlogInput.safeParse(body)

  if (!success) {
    c.status(411)
    return c.json({
        message:"Inputs not valid"
    })
  }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    

    const post = await prisma.post.update({
        where:{
            id: body.id
        },
        data:{
            title:body.title,
            content:body.content

        }
    })

    return c.json({
        id:post.id
    })
  })


  blogRouter.get('/bulk',async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post =await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    })

    console.log(post);
    

    return c.json({
        post
    })
  })
  

  
  blogRouter.get('/:id',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const id = c.req.param("id")

    const post = await prisma.post.findFirst({
        where:{
            id: id
        },
        select:{
            id:true,
            title:true,
            content:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    })

    return c.json({
        post
    })
    } catch (e) {

        c.status(411)
        return c.json({
            message:"error ehile fetching post"
        })
        
    }
  })
  
 