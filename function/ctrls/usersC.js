import fs from 'fs/promises'

const getAllUsers = async (req, res) => {
    try {
        const data =await fs.readFile("./data/users.json", "utf8");
        const users=await JSON.parse(data)  
        res.json({users});
    } catch (err) {
        console.error(err);
        res.status(500).json({ err });
    }
}

const addUser = async(req,res) =>{
    try{
        const new_user={"username":req.body.username,
        "password":req.body.password}
        const data =await fs.readFile("./data/users.json", "utf8");
            const users=await JSON.parse(data)
            users.push(new_user)  
        await fs.writeFile("./data/users.json",JSON.stringify(users));
        res.json(new_user)
    }catch(err) {
      console.error('Error writing file:', err);
    }
} 
const updateUser = async(req,res) =>{
    try{
        const data =await fs.readFile("./data/users.json", "utf8");
            const users=await JSON.parse(data)
            for(let i=0;i<users.length;i++){
                if(users[i].username===req.params.username){
                    users[i].password=req.body.password
                    var user_for_update=users[i]
                }
            }
            await fs.writeFile("./data/users.json",JSON.stringify(users));
        res.json(user_for_update)
    }catch(err) {
      console.error('Error update file:', err);
    }
}

const deleteUser = async(req,res) =>{
    try{
        const data =await fs.readFile("./data/users.json", "utf8");
            const users=await JSON.parse(data)
            var serch_in=false
            for(let i=0;i<users.length;i++){
                if(users[i].username===req.params.username){
                    users.splice(i,1)
                    serch_in=true
                }}
    if(serch_in===false){
        res.json({msg:"agent not found"})
    }
    await fs.writeFile("./data/users.json",JSON.stringify(users));
        res.json()
    }catch(err) {
          console.error('Error update file:', err);
    }
}


export{getAllUsers,
    addUser,
    updateUser,
    deleteUser
}
