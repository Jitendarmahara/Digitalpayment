"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import db from "@repo/db/client"
import { Addmoney } from "../../../components/Addmoney";
import { Balancecard } from "../../../components/Balancecard";
import { OnRamTransactions } from "../../../components/OnRampTransaction";

async function getBalance(){
    const session = await getServerSession(authOptions);
    const balance = await db.balance.findFirst({
        where:{
            userId:Number(session?.user?.id)
        }
    })
    return{
        amount: balance?.amout || 0,
        locked : balance?.locked || 0 ,
    }
}
 async function getOnRamTransaction(){
    const session = await getServerSession(authOptions);
    const txns = await db.onRampTransaction.findMany({
        where:{
            userId:Number(session?.user?.id)
        }
    });
    return txns.map(t=>({
        time:t.starttime,
        provider:t.provider,
        status:t.status,
        amount : t.amount,
    }))
}
export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRamTransaction();

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <Addmoney />
            </div>
            <div>
                <Balancecard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <OnRamTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}