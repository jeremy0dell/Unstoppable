import { useState, useEffect, useLayoutEffect, useContext } from 'react'
import '../styles/hooks.css'
import Row from '../components/Row'
// import { IntlProvider, IntlConsumer } from '../components/Context'
import { IntlProvider, IntlContext } from '../components/Context'


const Hooks = (props) => {
  const [name, setName] = useState('Jeremy')
  const [surname, setSurname] = useState('Odell')
  const [effectCount, setEffectCount] = useState(0)
  const [width, setWidth] = useState()
  const intl = useContext(IntlContext)

  const handleWidth = () => setWidth(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', () => handleWidth())
    setEffectCount(effectCount + 1)

    return () => window.removeEventListener('resize', () => handleWidth())
  }, [name, surname, intl, width])

  return (
    <div id="container">
      <main>
        <Row label="First name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Row>
        <Row label="Last name">
          <input
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </Row>
        <Row label="Locale">
          {intl.flag}
        </Row>
        <Row label="Button">
          <button onClick={
            () => {
              const flags = ['🇲🇽', '🇦🇺', '🇬🇧', '🇯🇵', '🇳🇵', '🇦🇪', '🇦🇲', '🇦🇹', '🇧🇻', '🇨🇺', '🇪🇬', '🇬🇳', '🇮🇪']
              intl.setFlag(
                flags[Math.floor(Math.random()*flags.length)]
              )
            }
          }>
          Click me to change the locale
          </button>
        </Row>
        <Row label="Effect Count">
          {effectCount}
        </Row>
        <Row label="Width">
          {width || 'resize the window'}
        </Row>
      </main>
    </div>
  )
}

export default () => 
  <IntlProvider>
    <Hooks />
  </IntlProvider>