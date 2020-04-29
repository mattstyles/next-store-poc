
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, utils, Spread } from '@raid/basic-kit'

import { Layout } from '../components/layout'
import { Link } from '../components/link'

const theme = utils.extend({
  colors: {
    primary: 'hsl(329, 100%, 54%)'
  }
})

const Main = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <header>
          <Spread>
            <Link href='/about'>About</Link>
            <Link href='/people/[id]' as='/people/1'>People 1</Link>
            <Link href='/people/[id]' as='/people/2'>People 2</Link>
            <Link href='/films/[id]' as='/films/1'>Film 1</Link>
            <Link href='/films/[id]' as='/films/2'>Film 2</Link>
          </Spread>
        </header>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default Main
