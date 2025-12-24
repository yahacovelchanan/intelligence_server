import fs from 'fs/promises'

const getAllReports = async (req, res) => {
    try {
        const data =await fs.readFile("./data/reports.json", "utf8");
        const reports=await JSON.parse(data)  
        res.json({reports});
    } catch (err) {
        console.error(err);
        res.status(500).json({ err });
    }
}

const getOneReportById = async (req, res) => {
          try {
         const data =await fs.readFile("./data/reports.json", "utf8");
            const reports=await JSON.parse(data)  
            for(let i=0;i<reports.length;i++){
                if(reports[i].id===Number(req.params.id)){
                    const report = reports[i]
                   return  res.json(report)
                }
            }
            
      } catch (err) {
        console.error('Error reading file:', err);
      }
    }


const addReport = async(req,res) =>{
    try{
        const new_date=new Date()
        var serch_agentId=false
      const new_report={"id":req.body.id,
        "date":`${new_date.getDate()}/${new_date.getMonth()+1}/${new_date.getFullYear()}`,
        "content":req.body.content,
        "agentId":req.body.agentId}
        const data_for_update =await fs.readFile("./data/agents.json", "utf8");
                    const agents=await JSON.parse(data_for_update)
                    for(let i=0;i<agents.length;i++){
                        if(agents[i].id===req.body.agentId){
                            agents[i].reportsCount+=1
                            serch_agentId=true
                            const data =await fs.readFile("./data/reports.json", "utf8");
            const reports=await JSON.parse(data)
            reports.push(new_report)  
        await fs.writeFile("./data/reports.json",JSON.stringify(reports));
                        }
                    }
                    if(serch_agentId===false){
                        res.json("agentId not found")
                    }

        res.json(new_report)
    }catch(err) {
      console.error('Error writing file:', err);
    }
}  

const updateReport = async(req,res) =>{
    try{
        const data =await fs.readFile("./data/reports.json", "utf8");
            const reports=await JSON.parse(data)
            for(let i=0;i<reports.length;i++){
                if(reports[i].id===req.params.id){
                    const new_date=new Date()
                    reports[i].date=`${new_date.getDate()}/${new_date.getMonth()+1}/${new_date.getFullYear()}`
                    reports[i].content=req.body.content
                    var report_for_update=reports[i]
                }
            }
            await fs.writeFile("./data/reports.json",JSON.stringify(reports));
        res.json(report_for_update)
    }catch(err) {
      console.error('Error update file:', err);
    }
}

const deleteReport = async(req,res) =>{
    try{
        const data =await fs.readFile("./data/reports.json", "utf8");
            const reports=await JSON.parse(data)
            var serch_in=false
            for(let i=0;i<reports.length;i++){
                if(reports[i].id===req.params.id){
                    var report_for_delete=reports[i]
                    const data =await fs.readFile("./data/agents.json", "utf8");
            const agents=await JSON.parse(data)
            for(let i=0;i<agents.length;i++){
                if(agents[i].id===report_for_delete.agentId){
                    agents[i].reportsCount-=1
                }
            }
                    reports.splice(i,1)
                    serch_in=true
                }}
    if(serch_in===false){
        res.json({msg:"agent not found"})
    }
    await fs.writeFile("./data/reports.json",JSON.stringify(reports));
        res.json()
    }catch(err) {
          console.error('Error update file:', err);
    }
}

export{
    getAllReports,
    getOneReportById,
    addReport,
    updateReport,
    deleteReport
}