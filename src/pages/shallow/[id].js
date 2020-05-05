
import { Box, H1, H2, P, Code, Text } from '@raid/basic-kit'
import { useRouter } from 'next/router'
import { NavLink } from '../../components/link'
import bent from 'bent'
import useSWR from 'swr'

const get = bent('json', 'http://localhost:3000')
const endpoint = id => `/api/test?id=${id || 1}`

const ShallowPage = ({
  data: initialData
}) => {
  const router = useRouter()
  const { id } = router.query

  const { data = initialData, error } = useSWR(
    endpoint(id),
    get
  )

  console.log(`Page render, shallow ${id}:`, { data, initialData })

  if (!data) {
    return <Box><Text>Loading...</Text></Box>
  }

  if (error) {
    return <Box><Text>Something went wrong</Text></Box>
  }

  return (
    <Box>
      <H1>{`Film: ${id}`}</H1>
      <H2>{data.name}</H2>
      <P>Route uses <Code>getServerSideProps</Code> always run <em>before</em> the page render but runs on the server and not the client.</P>
      <NavLink href='/shallow/[id]' as='/shallow/1' shallow>Shallow 1</NavLink>
      <NavLink href='/shallow/[id]' as='/shallow/2' shallow>Shallow 2</NavLink>
    </Box>
  )
}

export async function getServerSideProps (ctx) {
  console.log('Fetching shallowPage data', endpoint(ctx.query.id))
  const result = await get(endpoint(ctx.query.id))

  return {
    props: {
      data: result
    }
  }
}

export default ShallowPage
