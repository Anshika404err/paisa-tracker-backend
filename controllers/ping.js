

export const ping = (req,res)=>{
    console.log("pong")
    return res.status(200).json({message:"pong"})
}