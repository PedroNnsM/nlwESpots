import express, { response } from "express";
import  cors from 'cors'

import { PrismaClient } from '@prisma/client'
import { converHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinutsToHoursString } from "./utils/convert-minutes-to-hours-string";

const app = express()

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
    log: ['query']
})

/*
    parms

* Query : sao parametros vindo dos ? ex: localhost:3333/ads?page=2 (quando precisa presistir estado)- ficam disponiveis na url

* Route : sao paramentros vindo por rotas ex localhost:3333/post/como-criar-uma-api-em-node

* Body : enviar varias informacoes numa unica requisicao (normalmente em envio de formulario)
*/

app.get('/games', async (request, response) =>{
    const games = await prisma.game.findMany({
        include: {
            _count:{
                select:{
                    ads: true,
                }
            }
        }
    })

    return response.json(games)
});

// http codes iniciais com 
// 200 = sucesso
// 300 = redirecionamento
// 400 = erros por algum codigo
// 500 = erros inesperados 

// Rota para pegar os jogos

app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body: any = request.body;
// zod javascript para validacao
    
    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: converHourStringToMinutes (body.hourStart),
            hourEnd: converHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })

    return response.status(201).json(ad)
})


// Rota para pegar os anuncios por jogos 
app.get('/games/:id/ads', async(request, response) => {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select:{
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where:{
            gameId,
        },
        orderBy:{
            createdAt:'desc'
        },
    })
    return response.json(ads.map(ad =>{
        return{
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutsToHoursString(ad.hourStart),
            hourEnd: convertMinutsToHoursString(ad.hourEnd),
        }
    }))
})


// Rota para pegar passar o Discord no anuncio
app.get('/ads/:id/discord', async (request, response) => {
    const  adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select:{
            discord: true,
        },
        where:{
            id: adId
        },
    })
    return response.json({
        discord: ad.discord,
    })
})


app.listen(3333)
