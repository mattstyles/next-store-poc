
import { Box, H1, H2, Text, P, Code } from '@raid/basic-kit'
import { useRouter } from 'next/router'
import bent from 'bent'
import useSWR from 'swr'

const get = bent('json', 'http://localhost:3001')
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
 * be good, and reasonably easy to add I think. see `isValidating` which is
 * returned from hte useSWR hook.
 */

// This function is only necessary to add some logging, normally just
// supplying `get` to SWR is fine.
const fetch = async url => {
  console.log('[SWR]/fetching', url)
  const response = await get(url)
  console.log('[SWR]/returning', response)
  return response
}

// Initial data will **only** be from the server, but, in this case, if a
// parent did supply it then things would work just the same.
const Ship = ({
  data: initialData
}) => {
  const router = useRouter()
  const { id } = router.query

  // Supplying initialData has an odd side-effect, when this is supplied
  // SWR will not run at all. This will often be fine but it means that if
  // you navigate away and then back, SWR will have no cache and so will have
  // no data and will trigger a loading state even though we have already
  // fetched the data. Omitting it forces SWR to run (which fills the cache)
  // and the following `data = initital` line gives the component data with
  // which to render.
  const { data = initialData, error } = useSWR(
    endpoint(id),
    fetch,
    initialData ? { initialData } : null
  )

  // This hydrates data _if_ it is already supplied, SWR will still run and
  // will update if initialData is stale. Default = assignment above also works.
  // if (initialData) {
  //   data = initialData
  // }

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
      <H1>{`Ship: ${id}`}</H1>
      <H2>{data.name}</H2>
      <P>Route uses <Code>SWR</Code> combined with <Code>getInitialProps</Code> to allow using server-rendered data when available and use SWR to cache a response for faster later navigation.</P>
    </Box>
  )
}

// const cache = {}

Ship.getInitialProps = async (ctx) => {
  console.log('[ship/initial]/ctx', ctx)
  const id = ctx.query.id

  // Caching can be good here, but, this will cache on server hits too which
  // may or may no be desirable, and SWR has a cache anyway for client stuff.
  // If using, be sure to store the data in the cache after fetching later.
  // If using, use a proper cache, not this stray object cache(!)
  // if (cache[id]) {
  //   console.log('[ship/initial]/cache', cache[id])
  //   return {
  //     data: cache[id]
  //   }
  // }

  console.log(`I am running on a ${typeof window === 'undefined' ? 'srver' : 'client'} hit`)

  // ctx.req is server only, similar to typeof window === 'undefined'
  if (!ctx.req) {
    return { data: null }
  }

  // @TODO try swr `mutate` to pull from an SWR cache if possible, or run the
  // and fill that cache (which would allow supplying initialData to SWR and
  // avoid loading the data twice in quick succession, once on server and
  // once on the client).

  const result = await get(endpoint(id))
  console.log('[ship/initial]/response', id, result)
  // cache[id] = result

  return {
    data: result
  }
}

// The above 'if server' stuff probably won't work here as this code _always_
// runs on the server.
// export async function getServerSideProps (ctx) {
//   console.log('[ship/ssprops]/ctx', ctx.query.id)
//   const result = await get(endpoint(ctx.query.id))
//   console.log('[ship/ssprops]/response', result)
//
//   return {
//     props: {
//       data: result
//     }
//   }
// }

export default Ship
