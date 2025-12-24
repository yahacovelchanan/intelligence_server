import fs from 'fs/promises'

const validByUser = async(req,res,next) =>{
    const data =await fs.readFile("./data/users.json", "utf8");
                const users=await JSON.parse(data)
                var serch_in=false
                for(let i=0;i<users.length;i++){
                    if(users[i].username===req.headers["username"]&&
                        users[i].password===req.headers["password"]
                    ){
                        serch_in=true
                        next()
                    }
                }
                if(serch_in===false){
                    return res.status(403).json("user not found")
                }

                
                
                   
                
                
}


export{validByUser}