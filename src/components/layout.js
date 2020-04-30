
import styled from 'styled-components'
import { css } from '@styled-system/css'
import { themeGet } from '@styled-system/theme-get'
import { sx } from '@raid/ui-core'
import { Box } from '@raid/basic-kit'

// Copied from core utils within basic-kit
const map = _ => f => {
  if (Array.isArray(_)) {
    return _.map(f)
  }

  return f(_)
}
const inc = v => _ => _ + v

export const Layout = styled(Box)(
  props => {
    const padding = themeGet('tokens.layout.padding')(props)
    const morePadding = map(padding)(inc(2))
    return css({
      width: ['100%', '38rem', '44rem'],
      mx: 'auto',
      px: [morePadding, padding],
      py: morePadding,
      boxSizing: 'border-box'
    })
  },
  sx
)
