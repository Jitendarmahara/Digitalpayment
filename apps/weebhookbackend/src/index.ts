import db from "@repo/db/client"
import express from "express"

const app = express();
app.use(express.json())
app.post("/hdfcweebhook" , async (req , res)=>{
    
    const paymentinformation:{
        amount:string,
        userId:string,
        token : string,
        
    } = {
        amount: req.body.amount,
        userId: req.body.user_identifier,
        token : req.body.token,
    }
    const statusoftsnx = await db.onRampTransaction.findFirst({
        where:{
           token:paymentinformation.token,
        }
    })
    if(statusoftsnx?.status==="Success"){
        return res.json({
            msg:"this transaction is allready made"
        })
    }
    
    try{
        await db.$transaction([
            db.balance.upsert({
                where:{
                    userId:Number(paymentinformation.userId)
                },
                update:{
                    amout:{
                        increment : Number(paymentinformation.amount) // to protect form comming to request suddenly
                    }
                },
                create:{
                    amout:Number(paymentinformation.amount),
                    locked:0,
                    userId: Number(paymentinformation.userId),

                }
            }),
           
            db.onRampTransaction.updateMany({
                where:{
                    token:paymentinformation.token
                },
                data:{
                    status:"Success"
                }
            })
            
        ])
        console.log("i reached here")
        res.status(200).json({
            msg:"captured data"
        })
    }
    catch(e){
        console.log(e);
        res.status(402).json({
            msg:"error while processing data"
        })
    }
})
app.listen(3003 , ()=>{
    console.log('server is ready to serve')
})