
import { Box, H1, H2, Text } from '@raid/basic-kit'
import bent from 'bent'
import useSWR from 'swr'

import { Link } from '../components/link'

// const get = bent('json', 'https://swapi.dev/api/')
// const endpoint = 'people/1/'
const get = bent('json', 'http://localhost:3000')
const endpoint = '/api/test'

const About = ({
  data
}) => {
  console.log('data:', data)

  // const { data, error } = useSWR('people/1/', get)

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

About.getInitialProps = async () => {
  const result = await get(endpoint)

  return {
    data: result
  }
}

// @TODO this is not right, I don't think, is it a static request at build time? need to spin up an api and change the response to check
// export async function getServerSideProps (ctx) {
//   const result = await get('people/1/')
//   return {
//     props: {
//       data: result
//     }
//   }
// }

export default About
