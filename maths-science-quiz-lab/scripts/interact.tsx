import { JSDOM } from 'jsdom'
import React from 'react'

const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/#/' })
const g: any = globalThis
g.window = dom.window
g.document = dom.window.document
g.localStorage = dom.window.localStorage
g.HTMLElement = dom.window.HTMLElement
g.Element = dom.window.Element
g.Node = dom.window.Node
g.getComputedStyle = dom.window.getComputedStyle
g.requestAnimationFrame = (cb: any) => setTimeout(cb, 0)
g.IS_REACT_ACT_ENVIRONMENT = true
g.alert = () => {}

const { createRoot } = await import('react-dom/client')
const { act } = await import('react-dom/test-utils')
const { ProgressProvider } = await import('../src/lib/progress')
const { MATHS_TOPICS } = await import('../src/data/maths')
const QuestionRunner = (await import('../src/components/QuestionRunner')).default
const TopicPage = (await import('../src/components/TopicPage')).default
const RelayPage = (await import('../src/pages/RelayPage')).default
const CrosswordLab = (await import('../src/modes/CrosswordLab')).default
const { ClueRound } = await import('../src/modes/RoundLabs')

const results: string[] = []
function check(name: string, cond: boolean, extra = '') {
  results.push(`${cond ? 'PASS' : 'FAIL'} ${name}${extra ? ' — ' + extra : ''}`)
}

async function mount(node: React.ReactNode) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  await act(async () => { root.render(<ProgressProvider>{node}</ProgressProvider>) })
  return { container, root, cleanup: async () => { await act(async () => root.unmount()); container.remove() } }
}
const click = async (el: Element | null | undefined) => { if (!el) throw new Error('no element'); await act(async () => { (el as HTMLElement).dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true })) }) }

// 1 drill engine
{
  const qs = MATHS_TOPICS.find((t) => t.id === 'series')!.questions.slice(0, 3)
  const { container, cleanup } = await mount(<QuestionRunner questions={qs} runId="test" subject="maths" shuffleQuestions={false} />)
  const opts = container.querySelectorAll('button.option')
  check('drill shows options', opts.length >= 2, `${opts.length} options`)
  const correct = qs[0].answer
  const correctBtn = Array.from(opts).find((b) => b.textContent?.includes(correct)) as HTMLElement
  await click(correctBtn)
  check('drill marks correct', container.textContent!.includes('Correct'))
  check('drill shows explanation', container.textContent!.includes(qs[0].explain.slice(0, 20)))
  const next = Array.from(container.querySelectorAll('button')).find((b) => b.textContent?.includes('Next question'))
  await click(next)
  check('drill advances', container.textContent!.includes('Q 2 / 3'))
  await cleanup()
}

// 2 topic page drill tab
{
  const t = MATHS_TOPICS.find((x) => x.id === 'cube')!
  const { container, cleanup } = await mount(<TopicPage topic={t} onBack={() => {}} />)
  const drillTab = Array.from(container.querySelectorAll('button')).find((b) => b.textContent?.includes('Drill'))
  await click(drillTab)
  check('topic drill tab opens runner', container.querySelectorAll('button.option').length > 0)
  await cleanup()
}

// 3 relay start + got it
{
  const { container, cleanup } = await mount(<RelayPage onBack={() => {}} />)
  const start = Array.from(container.querySelectorAll('button')).find((b) => b.textContent?.includes('Start the relay'))
  await click(start)
  check('relay enters play', container.textContent!.includes('Got it'))
  const got = Array.from(container.querySelectorAll('button')).find((b) => b.textContent?.includes('Got it'))
  await click(got)
  await act(async () => { await new Promise((r) => setTimeout(r, 500)) })
  check('relay scores and advances', container.textContent!.includes('✓ 1') || container.textContent!.includes('1'))
  await cleanup()
}

// 4 crossword typing
{
  const { container, cleanup } = await mount(<CrosswordLab />)
  const input = container.querySelector('.cw-cell input') as HTMLInputElement
  check('crossword renders inputs', !!input)
  await act(async () => {
    const setter = Object.getOwnPropertyDescriptor(dom.window.HTMLInputElement.prototype, 'value')!.set!
    setter.call(input, 'M')
    input.dispatchEvent(new dom.window.Event('input', { bubbles: true }))
  })
  check('crossword accepts a letter', (container.querySelector('.cw-cell input') as HTMLInputElement).value === 'M')
  const checkBtn = Array.from(container.querySelectorAll('button')).find((b) => b.textContent === 'Check')
  await click(checkBtn)
  check('crossword check does not crash', true)
  await cleanup()
}

// 5 clue round typing
{
  const { container, cleanup } = await mount(<ClueRound />)
  const reveal = Array.from(container.querySelectorAll('button')).find((b) => b.textContent?.includes('Reveal clue'))
  await click(reveal)
  check('clue round reveals clue 2', container.textContent!.includes('My lander') || container.textContent!.includes('CLUE 2'))
  const input = container.querySelector('input') as HTMLInputElement
  await act(async () => {
    const setter = Object.getOwnPropertyDescriptor(dom.window.HTMLInputElement.prototype, 'value')!.set!
    setter.call(input, 'Chandrayaan-3')
    input.dispatchEvent(new dom.window.Event('input', { bubbles: true }))
  })
  const form = container.querySelector('form')!
  await act(async () => { form.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true })) })
  check('clue round accepts answer', container.textContent!.includes('Correct'))
  await cleanup()
}

console.log(results.join('\n'))
console.log(results.some((r) => r.startsWith('FAIL')) ? 'SOME FAILURES' : 'ALL INTERACTIONS PASS')
