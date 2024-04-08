import { Button } from "./button"
interface Appbarprops{
    user?:{
        name?:string |null;
    }
    onSignin:()=>void,
    onSignout:()=>void
}
export  const Appbar=({
    user,
    onSignin,
    onSignout
}:Appbarprops)=>{
    return(
        <div className="flex justify-between border-b px-4">
            <div className="text-lg">
                paytam
            </div>
            <div>
                <Button onClick={user?onSignout:onSignin}>{user?"Logout":"Login"}</Button>
            </div>
        </div>
    )
}