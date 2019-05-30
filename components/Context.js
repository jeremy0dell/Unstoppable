import { createContext, useState } from 'react'

const IntlContext = createContext()

const IntlProvider = ({ children }) => {
    const [flag, setFlag] = useState('🇺🇸')

    return (
        <IntlContext.Provider value={{ flag, setFlag }}>
            {children}
        </IntlContext.Provider>
    )
}

const IntlConsumer = IntlContext.Consumer

export { IntlProvider, IntlContext }
// export const (IntlContext.Consumer)