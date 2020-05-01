
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, utils, Spread, Flex, Box } from '@raid/basic-kit'

import { Layout, FullLayout } from '../components/layout'
import { Link, NavLink } from '../components/link'
import { Nav } from '../components/nav'
import { Main } from '../components/main'

const theme = utils.extend({
  colors: {
    primary: 'hsl(329, 100%, 54%)',
    secondary: 'hsl(274, 56%, 34%)'
  }
})

// <header>
//   <Spread>
//     <Link href='/'>Index</Link>
//     <Link href='/about'>About</Link>
//     <Link href='/people/[id]' as='/people/1'>People 1</Link>
//     <Link href='/people/[id]' as='/people/2'>People 2</Link>
//     <Link href='/films/[id]' as='/films/1'>Film 1</Link>
//     <Link href='/films/[id]' as='/films/2'>Film 2</Link>
//     <Link href='/ships/[id]' as='/ships/1'>Ship 1</Link>
//     <Link href='/ships/[id]' as='/ships/2'>Ship 2</Link>
//   </Spread>
// </header>

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <FullLayout>
        <Nav sx={{ flex: 1 }}>
          <NavLink href='/'>Index</NavLink>
          <NavLink href='/about'>About</NavLink>
          <NavLink href='/people/[id]' as='/people/1'>People 1</NavLink>
          <NavLink href='/people/[id]' as='/people/2'>People 2</NavLink>
          <NavLink href='/films/[id]' as='/films/1'>Film 1</NavLink>
          <NavLink href='/films/[id]' as='/films/2'>Film 2</NavLink>
          <NavLink href='/ships/[id]' as='/ships/1'>Ship 1</NavLink>
          <NavLink href='/ships/[id]' as='/ships/2'>Ship 2</NavLink>
        </Nav>
        <Main sx={{ flex: 4 }}>
          <Component {...pageProps} />
        </Main>
      </FullLayout>
    </ThemeProvider>
  )
}

export default App
