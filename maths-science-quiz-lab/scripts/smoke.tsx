import { JSDOM } from 'jsdom'
import React from 'react'

const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/#/' })
const g: any = globalThis
g.window = dom.window
g.document = dom.window.document
g.localStorage = dom.window.localStorage
g.HTMLElement = dom.window.HTMLElement
g.Element = dom.window.Element
g.getComputedStyle = dom.window.getComputedStyle
g.requestAnimationFrame = (cb: any) => setTimeout(cb, 0)
g.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {} })

const { renderToString } = await import('react-dom/server')
const { ProgressProvider } = await import('../src/lib/progress')
const { MATHS_TOPICS } = await import('../src/data/maths')
const { SCIENCE_TOPICS } = await import('../src/data/science')

function render(name: string, node: React.ReactNode) {
  try {
    const html = renderToString(<ProgressProvider>{node}</ProgressProvider>)
    console.log(`OK   ${name.padEnd(26)} ${html.length} chars`)
  } catch (e: any) {
    console.log(`FAIL ${name}: ${e?.message}`)
    console.error(e?.stack?.split('\n').slice(0, 4).join('\n'))
  }
}

const App = (await import('../src/App')).default
const TopicPage = (await import('../src/components/TopicPage')).default
const Home = (await import('../src/pages/Home')).default
const RelayPage = (await import('../src/pages/RelayPage')).default
const CheatPage = (await import('../src/pages/CheatPage')).default
const { SubjectPage, SpecialPage } = await import('../src/pages/Sections')
const CalendarLab = (await import('../src/modes/CalendarLab')).default
const CubeLab = (await import('../src/modes/CubeLab')).default
const DirectionLab = (await import('../src/modes/DirectionLab')).default
const MirrorLab = (await import('../src/modes/MirrorLab')).default
const CrosswordLab = (await import('../src/modes/CrosswordLab')).default
const MoviesLab = (await import('../src/modes/MoviesLab')).default
const CellDiagram = (await import('../src/modes/CellDiagram')).default
const { FibreLab, MotionLab } = await import('../src/modes/ScienceLabs')
const { ClueRound, VideoRound, HandsOn, NewsDigest } = await import('../src/modes/RoundLabs')

render('App shell', <App />)
render('Home', <Home onOpen={() => {}} />)
render('Subject maths', <SubjectPage subject="maths" onOpen={() => {}} />)
render('Subject science', <SubjectPage subject="science" onOpen={() => {}} />)
render('Relay', <RelayPage onBack={() => {}} />)
render('Cheat', <CheatPage onOpen={() => {}} />)
render('Special clue', <SpecialPage id="clue" onBack={() => {}} />)
render('Special video', <SpecialPage id="video" onBack={() => {}} />)
render('Special hands', <SpecialPage id="hands" onBack={() => {}} />)
for (const t of [...MATHS_TOPICS, ...SCIENCE_TOPICS]) render(`Topic ${t.id}`, <TopicPage topic={t} onBack={() => {}} />)
render('Lab calendar', <CalendarLab />)
render('Lab cube', <CubeLab />)
render('Lab direction', <DirectionLab />)
render('Lab mirror', <MirrorLab />)
render('Lab crossword', <CrosswordLab />)
render('Lab movies', <MoviesLab />)
render('Lab cell', <CellDiagram />)
render('Lab fibre', <FibreLab />)
render('Lab motion', <MotionLab />)
render('Lab clue round', <ClueRound />)
render('Lab video round', <VideoRound />)
render('Lab hands-on', <HandsOn />)
render('Lab news', <NewsDigest />)
