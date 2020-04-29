
import { Box, H2, Text } from '@raid/basic-kit'
import { useRouter } from 'next/router'
import bent from 'bent'
import useSWR from 'swr'

const get = bent('json', 'http://localhost:3000')
const endpoint = id => `/api/test?id=${id || 1}`

/**
 * The `people` route uses `getInitialProps`, this `ship` component attempts
 * to render instantly if given the data _or_ fetch when necessary.
 * It should also server-render the data-laden page.
 *
 * Supplying `swr` with initialProps, which come from the server fetch if
 * necessary, seems to work. I’m not 100% clear on why, but it meets the
 * requirements.
 *
 * @TODO minor, a load indicator when fetching to check on stale data would
 * be good, and reasonably easy to add I think.
 */

const Ship = ({
  data: initialData
}) => {
  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR(endpoint(id), get, { initialData })

  if (!data) {
    return (
      <Box>
        <Text as='p'>Loading...</Text>
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <Text as='p'>Something went wrong...</Text>
      </Box>
    )
  }

  return (
    <Box sx={{ mt: 4 }}>
      <H2>{`Ship: ${id}`}</H2>
      <Text>{data.name}</Text>
    </Box>
  )
}

export async function getInitialProps (ctx) {
  const result = await get(endpoint(ctx.query.id))

  return {
    data: result
  }
}

export default Ship
