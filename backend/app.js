import express from 'express';
import cors from 'cors';
import usuariosService from './servicios/usuarios-service.js';
import basededatos from './servicios/basededatos.js';

const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
    next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/login', (req, res) => {
    
    const email = req.body.email;
    const password = req.body.password;
    
    const accountFound = usuariosService.login(email, password);   

    res.json(
        {
            match:!!accountFound 
        }
    );
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

function gracefulShutdown() {
    basededatos.close();
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

