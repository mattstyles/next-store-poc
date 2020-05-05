
import { Box, Button, Text } from '@raid/basic-kit'
import { NavLink } from '../../components/link'
import { useRouter } from 'next/router'

/**
 * This doesn't really work as the url is changing so next treats it as a
 * new page and always fetches on the server.
 * However shallow links from [id].js work great, with a layout component
 * around that would work great for a lot of situations. It does the navigation
 * though without reloading the data, which is a little strange but probably
 * does not matter most of the time, this is due to an odd side effect whereby
 * the initialData is never reset, so it always thinks something is available
 * as data. Hmm.
 */

const ShallowIndex = () => {
  const router = useRouter()

  return (
    <Box>
      <NavLink href='/shallow/[id]' as='/shallow/1' shallow>Shallow 1</NavLink>
      <NavLink href='/shallow/[id]' as='/shallow/2' shallow>Shallow 2</NavLink>
      <Button onClick={() => {
        // These routes differ so it doesn't work
        router.push('/shallow/[id]', '/shallow/1', { shallow: true })
      }}
      >
        Click me
      </Button>
      <Text sx={{ display: 'block', my: 4 }}>None of this shallow rendering is actually working very well.</Text>
    </Box>
  )
}

export default ShallowIndex
