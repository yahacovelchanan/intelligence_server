import express from "express";
import agentsRouter from "./function/routes/agentsR.js"
import reportsRouter from "./function/routes/reportsR.js"
import usersRouter from "./function/routes/usersR.js"
const app = express();
const port = 3006;

app.use(express.json());

app.use("/agents",agentsRouter)
app.use("/reports",reportsRouter)
app.use("/users",usersRouter)




app.listen(port, () => {
    console.log(`server runing on http://localhost:${port}`);
})