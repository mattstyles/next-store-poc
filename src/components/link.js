
import { Link as StyledLink } from '@raid/basic-kit'
import BaseLink from 'next/link'

export const Link = ({ children, href, ...rest }) => {
  return (
    <BaseLink href={href} passHref {...rest}>
      <StyledLink>{children}</StyledLink>
    </BaseLink>
  )
}
