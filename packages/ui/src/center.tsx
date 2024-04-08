import React  from "react"
export const Center = ({childern}:{
    childern:React.ReactNode})=>{
        return(
            <div className="flex justify-center  flex-col h-screen">
                <div className="flex justify-center">
                {childern}
                </div>
            </div>
        )
}