const express = require('express')
const PORT = 8000;

const app = express();
app.use(express.json()) //parse json

app.get("/",(req,res) => {
    res.send("Hello PriyaDharshini,surya,LP")
})
app.listen(PORT, ()=> {
    console.log(`Success, running in http://localhost:${PORT}`)

})
