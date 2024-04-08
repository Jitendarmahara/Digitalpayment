
import db from '@repo/db/client'
import bcrypt from "bcrypt"
import  CredentialsProvider  from "next-auth/providers/credentials"
import { use } from 'react'
 export const authOptions = {
    providers:[
        CredentialsProvider({
            name: 'Credentials',
            credentials:{
                phone:{label:"phone number",type:"text",placeholder:"124455" , required:true},
                password:{label:"password", type:"password" , required:true}
            },
            async authorize(credentials:any){
                const hashedpassword = await bcrypt.hash(credentials.password,10);
                const existingUser = await db.user.findFirst({
                    where:{
                        phone:credentials.phone
                    }
                });
                if(existingUser){
                    const passwordValidation = await bcrypt.compare(credentials.password , existingUser.password);
                    if(passwordValidation){
                        return{
                            id: existingUser.id.toString(),
                            name:existingUser.name,
                            phone:existingUser.phone
                        }
                    }
                    return null;
                }
                try{
                    const user = await db.user.create({
                        data: {
                            phone:credentials.phone,
                            password: hashedpassword
                        }
                    });
                    
                    return{
                        id: user.id.toString(),
                        name: user.name,
                        email:user.email,
                        phone:user.phone
                    }
                }
                catch(e){
                    console.log(e)
                    return null
                }
                
                
            }
        })
    ],
    secret: process.env.JWT_SECRET || 'secret',
    // this is dont have learn
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub
            return session
        }
    }
}