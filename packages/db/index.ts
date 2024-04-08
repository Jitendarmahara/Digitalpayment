import {PrismaClient} from '@prisma/client'
const PrismaClientSingleton = ()=>{
    return new PrismaClient()
}
declare global {
    var prsimaGlobal: undefined| ReturnType<typeof PrismaClientSingleton>
}
const prisma: ReturnType<typeof PrismaClientSingleton>=globalThis.prsimaGlobal?? PrismaClientSingleton()
export default prisma
if(process.env.NODE_ENV!=='production')globalThis.prsimaGlobal = prisma