import fs from 'fs/promises'

const getAllAgents = async (req, res) => {
    try {
        const data =await fs.readFile("./data/agents.json", "utf8");
        const agents=await JSON.parse(data)  
        res.json({agents});
    } catch (err) {
        console.error(err);
        res.status(500).json({ err });
    }
}

const getOneAgentsById = async (req, res) => {
          try {
         const data =await fs.readFile("./data/agents.json", "utf8");
            const agents=await JSON.parse(data)  
            for(let i=0;i<agents.length;i++){
                if(agents[i].id===Number(req.params.id)){
                    const agent = agents[i]
                   return  res.json(agent)
                }
            }
            
      } catch (err) {
        console.error('Error reading file:', err);
      }
    }

const addAgent = async(req,res) =>{
    try{
        const new_agent={"id":req.body.id,
        "name":req.body.name,
        "nickname":req.body.nickname,
        "reportsCount":0}
        const data =await fs.readFile("./data/agents.json", "utf8");
            const agents=await JSON.parse(data)
            agents.push(new_agent)  
        await fs.writeFile("./data/agents.json",JSON.stringify(agents));
        res.json(new_agent)
    }catch(err) {
      console.error('Error  writing file:', err);
    }
}

const updateAgent = async(req,res) =>{
    try{
        const data =await fs.readFile("./data/agents.json", "utf8");
            const agents=await JSON.parse(data)
            for(let i=0;i<agents.length;i++){
                if(agents[i].id===req.params.id){
                    if(req.body.id){
                    agents[i].id=req.body.id}
                    if(req.body.name){
                    agents[i].name=req.body.name}
                    if(req.body.nickname){
                    agents[i].nickname=req.body.nickname}
                    var agent_for_update=agents[i]
                }
            }
            await fs.writeFile("./data/agents.json",JSON.stringify(agents));
        res.json(agent_for_update)
    }catch(err) {
      console.error('Error update file:', err);
    }
}

const deleteAgent = async(req,res) =>{
    try{
        const data =await fs.readFile("./data/agents.json", "utf8");
            const agents=await JSON.parse(data)
            var serch_in=false
            for(let i=0;i<agents.length;i++){
                if(agents[i].id===req.params.id){
                    agents.splice(i,1)
                    serch_in=true
                }}
    if(serch_in===false){
        res.json({msg:"agent not found"})
    }
    await fs.writeFile("./data/agents.json",JSON.stringify(agents));
        res.json()
    }catch(err) {
          console.error('Error update file:', err);
    }
}

export{
    getAllAgents,
    getOneAgentsById,
    addAgent,
    updateAgent,
    deleteAgent
}
