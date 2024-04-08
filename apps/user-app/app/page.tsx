
import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";
import styles from "./page.module.css";
import { Button } from "@repo/ui/button";
import { Appbar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { Selector } from "@repo/ui/select";
import { Addmoney } from "../components/Addmoney";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from 'next/navigation';
export default async function page(){
const session = await getServerSession(authOptions)
    if(session?.user){
      redirect('/dashboard')
    }else{
      redirect('/api/auth/signin')
    }
}