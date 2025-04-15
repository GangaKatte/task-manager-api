const express=require ("express" )
const bodyParser=require ("body-parser" )
const taskRoutes=require ("./routes/tasks" )
const errorHandler=require ("./middleware/errorHandler" )
const app=express()
const PORT=4000

app.use( bodyParser.json() );
app.use ('/tasks',taskRoutes);
 app.use(errorHandler)

app.listen (PORT,()=>{
    console.log ("server is running..")
})