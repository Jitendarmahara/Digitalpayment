export const TextInput = ({label , onChange , placeholder}:{
    label:string,
    onChange:(value:string)=>void,
    placeholder:string,
}):JSX.Element=>{
    return(
        <div className="pt-2">
            <label className="block mb-2 text-gray-900 font-medium text-sm">{label}</label>
            <input onChange={(e)=>onChange(e.target.value)}className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" placeholder={placeholder}></input>
        </div>
    )
}