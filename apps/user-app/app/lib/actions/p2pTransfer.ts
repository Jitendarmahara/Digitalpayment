"use server"
import { getServerSession } from "next-auth";
import db from "@repo/db/client"
import { authOptions } from "../auth";
export async function Transfer(to:string , amount:number){
    const session =  await getServerSession(authOptions);
    const from = session?.user?.id
    if(!from){
        return{
            msg:"erro while sending"
        }
    }
    const touser = await db.user.findUnique({
        where:{
            phone:to
        }
    });
    if(!touser){
        return{
            msg:"this number does not exits in our data base"
        }
    }

    await db.$transaction(async(tx)=>{
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
        const frombalance = await tx.balance.findUnique({
            where:{
                userId:Number(from)
            }
        })
        if(!frombalance || frombalance.amout < amount){
            throw new Error("insufficient balance")
        }
        await tx.balance.update({
            where:{
                userId:Number(from)
            },
            data:{
                amout:{decrement:amount}
            }
        });
        await tx.balance.update({
            where:{
                userId: touser.id,
            },
            data:{
                amout:{increment:amount}
            }
        })
    })
}