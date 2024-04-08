"use client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Selector } from "@repo/ui/select"
import { TextInput } from "@repo/ui/input"
import { useState } from "react"
import { createOnRampTransaction } from "../app/lib/actions/createOnRampTransaction"
const Supported_Bank=[{
    name:"hdfc",
    redirectUrl:"https://netbanking.hdfcbank.com"
},{
    name:"Axis Bank",
    redirectUrl:"https://www.axisbank.com"
}]

export const Addmoney= ()=>{
    const [redirectUrl , setredirectUrl] = useState(Supported_Bank[0]?.redirectUrl);
    const [provider, setProvider] = useState(Supported_Bank[0]?.name || "");
    const [value, setValue] = useState(0)
    return(
        <Card title="Add Money">
            <div className="pt-2">
                <TextInput label={"Amount"} placeholder="Amount" onChange={(value)=>{
                    const input = Number(value)
                    setValue(input)
                }}></TextInput>
                
                <div className="py-4 text-left">
                    Bank
                </div>
                <Selector onSelect={(value)=>{
                    setredirectUrl(Supported_Bank.find((x)=>x.name==value)?.redirectUrl ||" ")
                }} options={Supported_Bank.map((x)=>({
                    key:x.name,
                    value:x.name
                }))}>
                </Selector>
                <div>
                    <Button onClick={async()=>{
                        await createOnRampTransaction(provider , value);
                        window.location.href= redirectUrl|| ""
                    }}>
                        Add Money
                    </Button>
                </div>
          </div>
        </Card>
    )
}