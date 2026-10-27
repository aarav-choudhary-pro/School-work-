import { useEffect, useState } from 'react'
import Home from './pages/Home'
import RelayPage from './pages/RelayPage'
import CheatPage from './pages/CheatPage'
import { SpecialPage, SubjectPage } from './pages/Sections'
import TopicPage from './components/TopicPage'
import { MATHS_TOPICS } from './data/maths'
import { SCIENCE_TOPICS } from './data/science'

type Route =
  | { name: 'home' }
  | { name: 'maths' }
  | { name: 'science' }
  | { name: 'relay' }
  | { name: 'cheat' }
  | { name: 'topic'; id: string }
  | { name: 'special'; id: 'clue' | 'video' | 'hands' }

const ALL_TOPICS = [...MATHS_TOPICS, ...SCIENCE_TOPICS]
const SPECIAL_IDS = ['clue', 'video', 'hands'] as const

function parseHash(): Route {
  const h = window.location.hash.replace(/^#\/?/, '')
  if (!h) return { name: 'home' }
  if (h === 'maths' || h === 'science' || h === 'relay' || h === 'cheat') return { name: h }
  if (ALL_TOPICS.some((t) => t.id === h)) return { name: 'topic', id: h }
  if ((SPECIAL_IDS as readonly string[]).includes(h)) return { name: 'special', id: h as 'clue' | 'video' | 'hands' }
  return { name: 'home' }
}

function hashFor(r: Route) {
  if (r.name === 'home') return '#/'
  if (r.name === 'topic') return `#/${r.id}`
  if (r.name === 'special') return `#/${r.id}`
  return `#/${r.name}`
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => parseHash())

  useEffect(() => {
    const onHash = () => setRoute(parseHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [route])

  function go(next: Route) {
    window.location.hash = hashFor(next)
    setRoute(next)
  }

  function open(id: string) {
    if (id === 'cheat') return go({ name: 'cheat' })
    if (id === 'relay') return go({ name: 'relay' })
    if ((SPECIAL_IDS as readonly string[]).includes(id)) return go({ name: 'special', id: id as 'clue' | 'video' | 'hands' })
    go({ name: 'topic', id })
  }

  const topic = route.name === 'topic' ? ALL_TOPICS.find((t) => t.id === route.id) : undefined

  return (
    <>
      <header className="topbar">
        <div className="topbar-in">
          <button className="brand" onClick={() => go({ name: 'home' })} aria-label="Quiz Lab home">
            <span className="brand-mark">QL</span>
            <span className="brand-text">
              <b>QUIZ LAB</b>
              <span>inter-house · maths + science</span>
            </span>
          </button>

          <nav className="nav" aria-label="Main">
            <button className={route.name === 'home' ? 'on' : ''} onClick={() => go({ name: 'home' })}>Plan</button>
            <button className={route.name === 'maths' || (topic?.subject === 'maths') ? 'on' : ''} onClick={() => go({ name: 'maths' })}>Maths</button>
            <button className={route.name === 'science' || (topic?.subject === 'science') || route.name === 'special' ? 'on' : ''} onClick={() => go({ name: 'science' })}>Science</button>
            <button className={route.name === 'relay' ? 'on' : ''} onClick={() => go({ name: 'relay' })}>Relay</button>
            <button className={route.name === 'cheat' ? 'on' : ''} onClick={() => go({ name: 'cheat' })}>Cheat sheet</button>
          </nav>

          <div className="top-right">
            <span className="streak-pill">QUIZ <b>28 OCT</b> · 09:00</span>
          </div>
        </div>
      </header>

      <main className="wrap">
        {route.name === 'home' && <Home onOpen={open} />}
        {route.name === 'maths' && <SubjectPage subject="maths" onOpen={open} />}
        {route.name === 'science' && <SubjectPage subject="science" onOpen={open} />}
        {route.name === 'relay' && <RelayPage onBack={() => go({ name: 'home' })} />}
        {route.name === 'cheat' && <CheatPage onOpen={open} />}
        {route.name === 'special' && <SpecialPage id={route.id} onBack={() => go({ name: 'science' })} />}
        {route.name === 'topic' && topic && (
          <TopicPage topic={topic} onBack={() => go({ name: topic.subject === 'maths' ? 'maths' : 'science' })} />
        )}
        {route.name === 'topic' && !topic && (
          <div className="card">
            <p>Topic not found. <button className="btn sm" onClick={() => go({ name: 'home' })}>Go home</button></p>
          </div>
        )}
      </main>
    </>
  )
}
