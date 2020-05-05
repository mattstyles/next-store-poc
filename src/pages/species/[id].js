
import { Box, H1, H2, Text, P, Code } from '@raid/basic-kit'
import { useRouter } from 'next/router'
import bent from 'bent'
import { useQuery } from 'react-query'

const get = bent('json', 'http://localhost:3001')
const endpoint = id => `/api/test?id=${id || 1}`

/**
 * Species is the same as ships, which handles server-rendering and using
 * server-fetched data to speed thinga up, but species use `react-query`
 * instead of `swr`.
 */

const fetch = async url => {
  console.log('[RQ]/fetching', url)
  const response = await get(url)
  console.log('[RQ]/returning', response)
  return response
}

const Species = ({
  data: initialData
}) => {
  const router = useRouter()
  const { id } = router.query

  // Use initial data if it is available, this will stop trying to
  // refetch on the client. Make sure initialData is used (with the =) as
  // data to ensure things are rendered.
  const { data = initialData, error } = useQuery(
    endpoint(id),
    fetch,
    initialData ? { initialData } : null
  )

  console.log('Rendering with data', { data }, { initialData })

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
      <H1>{`Species: ${id}`}</H1>
      <H2>{data.name}</H2>
      <P>Route uses <Code>React Query</Code> combined with <Code>getInitialProps</Code> to allow using server-rendered data when available and use RQ to cache a response for faster later navigation.</P>
      {// <P>{`Rendered by: ${typeof window === 'undefined' ? 'server' : 'client'}. This will cause a server-client mismatch will be make react moan.`}</P>
      }
    </Box>
  )
}

Species.getInitialProps = async (ctx) => {
  console.log('[species/initial]/ctx', ctx)
  const id = ctx.query.id

  console.log(`I am running on a ${typeof window === 'undefined' ? 'server' : 'client'} hit`)

  // ctx.req is server only, similar to typeof window === 'undefined'
  if (!ctx.req) {
    return { data: null }
  }

  const result = await get(endpoint(id))
  console.log('[species/initial]/response', id, result)

  return {
    data: result
  }
}

export default Species
