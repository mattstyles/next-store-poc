
import { Box, H1, H2, P, Code, Text } from '@raid/basic-kit'
import bent from 'bent'

import { Link } from '../../components/link'

/**
 * People route uses `getInitialProps`.
 * This runs on the server and on the client and so fulfils the criteria
 * whereby a page will be server rendered if hit directly or renders via
 * a clientside in-app navigation.
 * However, this happens _before_ the navigation which would require some
 * sort of load indicator prior to navigating to a page. The opposite is that
 * the page controls a loading display _if_ it has no data with which to
 * render. See `films` for an attempt to beat this problem.
 */

// const get = bent('json', 'https://swapi.dev/api/')
// const endpoint = id => `people/${id || 1}/`
const get = bent('json', 'http://localhost:3000')
const endpoint = id => `/api/test?id=${id || 1}`

const People = ({
  data
}) => {
  //  This will never get run as `getInitialProps` always runs first.
  if (!data) {
    return (
      <Box>
        <Text as='p'>Loading...</Text>
      </Box>
    )
  }

  return (
    <Box>
      <H1>People</H1>
      <H2>{data.name}</H2>
      <P>Some text, go to <Link href='/'>Index</Link></P>
      <P>These routes use <Code>getInitialProps</Code>, which always runs <em>before</em> the page is navigated to (either on the server or on the client).</P>
    </Box>
  )
}

People.getInitialProps = async (ctx) => {
  const result = await get(endpoint(ctx.query.id))

  return {
    data: result
  }
}

export default People
