import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign, verify } from 'hono/jwt'
import { signUpInput, signinInput } from '@bikhulky/medium-common'



export const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string
    }
  }>()

  userRouter.post('/signup',async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body =await c.req.json();

  const {success} = signUpInput.safeParse(body)

  if (!success) {
    c.status(411)
    return c.json({
        message:"Inputs not valid"
    })
  }

  try{
      const user = await prisma.user.create({
        data:{
          email:body.email,
          password:body.password,
          name:body.name
        }
      })

      const token = await sign({id:user.id},"secret")
      console.log(token);
      
      return c.json({
        jwt: token
      })

  }catch(e){

      c.status(404)
      return c.text("user already exist")
  }
})

userRouter.post('/signin', async (c) => {

      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body =await c.req.json();

    const {success} = signinInput.safeParse(body)
  
    if (!success) {
      c.status(411)
      return c.json({
          message:"Inputs not valid"
      })
    }

    try {
      

    const user =await prisma.user.findUnique({
      where:{
        email:body.email
      }
    })

    if (!user) {

      c.status(403)
      return c.json({Error:"user not found"})
      
    }

    const token = await sign({id:user.id},"secret")

    return c.json({
      jwt:token
    })    
    } catch (e) {
      
      c.status(404)
      return c.text("user already exist")
  }
    
})