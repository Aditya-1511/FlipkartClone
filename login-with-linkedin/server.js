const PORT = 3001;
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (request,response)=>{
   response.send(request.query.code);
   console.log(request.query.code);
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
