"use server"
import db from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
export async function createOnRampTransaction(provider:string , amount:number ){
    const session = await getServerSession(authOptions);
    if(!session?.user || ! session.user?.id){
        return{
            message: "Unauthenticated request"
        }
    }
    const token = Math.random().toString();
    await db.onRampTransaction.create({
        data:{
            provider,
            status: "Processing",
            amount:amount*100,
            starttime:new Date(),
            token : token ,
            userId : Number(session?.user?.id)
        }
    })
    console.log("hi reached here")
    return{
        message: "Done"
    }
}