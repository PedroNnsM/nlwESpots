import express, { response } from "express";


const app = express()

/*
    parms

* Query : sao parametros vindo dos ? ex: localhost:3333/ads?page=2 (quando precisa presistir estado)- ficam disponiveis na url

* Route : sao paramentros vindo por rotas ex localhost:3333/post/como-criar-uma-api-em-node

* Body : enviar varias informacoes numa unica requisicao (normalmente em envio de formulario)
*/

app.get('/games', (request, response) =>{
    return response.json([])
});

// http codes iniciais com 
// 200 = sucesso
// 300 = redirecionamento
// 400 = erros por algum codigo
// 500 = erros inesperados 
app.post('/ads', (request, response) => {
    return response.status(201).json([])
})

app.get('/games/:id/ads', (request, response) => {
    const adId = request.params.id;

    return response.json([])
})

app.get('/ads/:id/discord', (request, response) => {

})


app.listen(3333)
