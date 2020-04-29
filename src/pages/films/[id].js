
import { Box, H2, Text } from '@raid/basic-kit'
import { useRouter } from 'next/router'
import bent from 'bent'

const get = bent('json', 'http://localhost:3000')
const endpoint = id => `/api/test?id=${id || 1}`

/**
 * The `people` route uses `getInitialProps`, this `films` component attempts
 * to render instantly if given the data _or_ fetch when necessary.
 * It should also server-render the data-laden page.
 *
 * It is *not* static, it is run on every request so if the data changes when
 * the page reloads the page reflecting the data will change. Good. This means
 * that it is comparable to `getInitialProps` but, one crucial difference, it
 * asks the server to make the request and not the client. Interesting.
 *
 * Using `shallow` in `link` makes no difference.
 * Lets leave this example here so we have `people` with `getInitialProps` and
 * `films` with `getServerSideProps` to show that difference and add `starships`
 * as an attempt to combat only loading when necessary (and on server).
 */

const Film = ({
  data
}) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Box>
      <H2>{`Film: ${id}`}</H2>
      <Text>{data.name}</Text>
    </Box>
  )
}

export async function getServerSideProps (ctx) {
  console.log('server:', ctx.query.id)
  const result = await get(endpoint(ctx.query.id))

  return {
    props: {
      data: result
    }
  }
}

export default Film
