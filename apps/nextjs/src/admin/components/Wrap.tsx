import { type DetailedHTMLProps, type HTMLAttributes } from 'react'

const Wrapper = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
) => <div className='px-12 pt-12' {...props} />

export const Wrap =
  <T,>(elem: (props: T) => JSX.Element) =>
  // eslint-disable-next-line react/display-name
  (props: T) => <Wrapper>{elem(props)}</Wrapper>
