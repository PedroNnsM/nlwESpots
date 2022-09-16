//componentes / propriedades
import { useState, useEffect  } from 'react'
import * as Dioalog from '@radix-ui/react-dialog'

import './styles/main.css'
import { GameBanner } from './Components/GameBanner'
import { CreateAdBanner } from './Components/CreateAdBanner'

import logoImg from './assets/logo-nlw-esports.svg'
import { GameController } from 'phosphor-react'
import { Input } from './Components/form/Input'


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}
function App() {
  
  const[games, setGames] = useState<Game[]>([])

  useEffect(()=>{
    fetch('http://localhost:3333/games')
    .then(response => response.json())
    .then(data =>{
      setGames(data)
    })
  }, [])

  return (
    <div className= 'max-w-[1344px] mx-auto flex flex-col items-center my-20  '>
      <img src={logoImg} />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
        </h1>

        <div className="grid grid-cols-6 gap-6 mt-16">

          {games.map( game => {
            return(
              <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
           />
            )
          })}
          
          
        </div>
        <Dioalog.Root>
          <CreateAdBanner />
          
          <Dioalog.Portal>
            <Dioalog.Overlay className='bg-black/60 inset-0 fixed' />

            <Dioalog.Content className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
              <Dioalog.Title className='text-3xl text-white font-black'>Publique um anúcio.</Dioalog.Title>

              
                <form className='mt-8 flex flex-col gap-4'>
                  <div className='flex flex-col gap-2 '>
                    <label htmlFor="game" className='font-semibold'>
                      Qual o game?
                      </label>
                    <Input id='game' placeholder="Qual o game deseja jogar?" />
                  </div>

                  <div className='flex flex-col gap-2 '>
                    <label htmlFor="game">Qual o game?</label>
                    <Input type="text" id='game' placeholder='Como te chamam dentro do game?' />
                  </div>

                  <div className='grid grid-cols-2 gap-6 '>
                   <div className='flex flex-col gap-2'>
                    <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                    <Input type="number" id='yearsPlaying' placeholder='Tudo bem ser ZERO' />
                   </div>
                   <div className='flex flex-col gap-2'>
                    <label htmlFor="discord">Qual o seu discord</label>
                    <Input type="text"  id="discord" placeholder='usuario#0000' />
                   </div>
                  </div>

                   <div>
                      <div>
                        <label htmlFor="weekDays">Quando costuma jogar?</label>
                      </div>
                      <div>
                        <label htmlFor="hourStart">Qual horário do dia?</label>
                        <div>
                          <Input id='hourStart' type="time" placeholder='De' />
                          <Input id='hourEnd' type="time" placeholder='Até' />
                        </div>
                      </div>
                   </div>
                  
                  <div>
                    <Input type="checkbox"  id="" />
                      Costumo me conectar ao chat de voz
                  </div>

                  <footer>
                    <button>Cancelar</button>
                    <button type="submit">
                      <GameController />
                      Encontrar Duo
                      </button>
                  </footer>
                </form>
            </Dioalog.Content>
          </Dioalog.Portal>
        </Dioalog.Root>
    </div>
  )
}

export default App
