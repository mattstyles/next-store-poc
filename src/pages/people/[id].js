
import { Box, H1, H2, Text } from '@raid/basic-kit'
import bent from 'bent'

import { Link } from '../../components/link'

// const get = bent('json', 'https://swapi.dev/api/')
// const endpoint = id => `people/${id || 1}/`
const get = bent('json', 'http://localhost:3000')
const endpoint = id => `/api/test?id=${id || 1}`

const People = ({
  data
}) => {
  if (!data) {
    return (
      <Box>
        <Text as='p'>Loading...</Text>
      </Box>
    )
  }

  return (
    <Box>
      <H1>About</H1>
      <H2>{data.name}</H2>
      <Text as='p'>Some text, go to <Link href='/'>Index</Link></Text>
    </Box>
  )
}

People.getInitialProps = async (ctx) => {
  console.log(ctx)
  const result = await get(endpoint(ctx.query.id))

  return {
    data: result
  }
}

export default People
