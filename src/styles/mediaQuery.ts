import { generateMedia } from 'styled-media-query'

export const customBreakpoints = {
  huge: '1500px',
  large: '1170px',
  medium: '868px',
  mobile: '604px',
  small: '450px',
}

export const customMedia = generateMedia(customBreakpoints)
