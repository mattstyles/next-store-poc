
import { Box, H1, H2, Text, P, Code } from '@raid/basic-kit'
import { useRouter } from 'next/router'
import bent from 'bent'
import useSWR from 'swr'

const get = bent('json', 'http://localhost:3001')
const endpoint = id => `/api/test?id=${id || 1}`

// const fetch = async url => {
//   console.log('[SWR]/fetching', url)
//   const response = await get(url)
//   console.log('[SWR]/returning', response)
//   return response
// }

const Page = ({
  data: initialData
}) => {
  const router = useRouter()
  const { id } = router.query

  const { data = initialData, error, mutate } = useSWR(
    endpoint(id),
    async () => {
      const res = await get(endpoint(id))
      return res
    },
    initialData ? { initialData } : null
  )

  // Mutate can be a global import { mutate } whereby you'll have to specify
  // the storage key. In this case that is prefilled for us, and as we already
  // have the data it is synchronous so don't need to supply a function,
  // supplying the data itself is good.
  if (initialData) {
    console.log('Calling mutate')
    // mutate(endpoint(id), () => {
    //   console.log('Returning from mutate')
    //   return initialData
    // })
    mutate(initialData)
  }

  console.log(`Rendering with data ${id}`, { data }, { initialData })

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
      <H1>{`Cachy McCacheface: ${id}`}</H1>
      <H2>{data.name}</H2>
      <P>Route uses <Code>SWR</Code> combined with <Code>getInitialProps</Code> to allow using server-rendered data when available and use SWR to cache a response for faster later navigation.</P>
    </Box>
  )
}

Page.getInitialProps = async (ctx) => {
  console.log('[page/initial]/ctx', ctx.pathname, ctx.query)
  const id = ctx.query.id

  console.log(`I am running on a ${typeof window === 'undefined' ? 'srver' : 'client'} hit`)

  // ctx.req is server only, similar to typeof window === 'undefined'
  if (!ctx.req) {
    return { data: null }
  }

  const result = await get(endpoint(id))
  console.log('[swrcache/initial]/response', id, result)

  return {
    data: result
  }
}

export default Page
