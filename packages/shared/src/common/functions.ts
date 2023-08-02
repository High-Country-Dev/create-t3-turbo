import { Truthy } from './types'

export function isTruthy<T>(value: T): value is Truthy<T> {
  return Boolean(value)
}

// https://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid
export const isUuid = (uuid: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    uuid,
  )

export const bound = (
  variable: number,
  min: number | undefined,
  max: number | undefined,
) => {
  const withMin = min === undefined ? variable : Math.max(variable, min)
  const withMaxAndMin = max === undefined ? withMin : Math.min(withMin, max)
  return withMaxAndMin
}

export const stringToNum = (word: string) =>
  word
    .split('')
    .reduce(
      (accu, letter, idx, arr) =>
        accu + (letter.charCodeAt(0) - 96) * Math.pow(26, arr.length - idx - 1),
      0,
    )

export const numToString = (num: number) => {
  let columnLetter = ''
  let t = 0

  while (num > 0) {
    t = (num - 1) % 26
    columnLetter = String.fromCharCode(65 + t) + columnLetter
    num = ((num - t) / 26) | 0
  }
  return columnLetter.toLowerCase() || undefined
}

const addAlphaToHex = (color: string, opacity: number): string => {
  // coerce values so ti is between 0 and 1.
  const _opacity = Math.round(bound(opacity ?? 1, 0, 1) * 255)
  return color + _opacity.toString(16).toUpperCase()
}

const addAlphaToRGB = (color: string, opacity: number): string => {
  return color.replace(
    /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
    `rgba$1,${bound(opacity || 1, 0, 1)})`,
  )
}

export const addAlpha = (color: string, opacity: number): string =>
  color.includes('rgb')
    ? addAlphaToRGB(color, opacity)
    : addAlphaToHex(color, opacity)

export function classNames(...classes: (string | undefined)[]) {
  return classes.filter(isTruthy).join(' ')
}

export const camelCaseToSpacedTitleCase = (camelCase: string) =>
  camelCase.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())

export const getJwtContent = <T extends object>(
  token: string | undefined,
): T | undefined => {
  const bufferable = token?.split('.')[1]
  return bufferable
    ? (JSON.parse(Buffer.from(bufferable, 'base64').toString()) as T)
    : undefined
}

export function sleep(milliseconds: number) {
  const date = Date.now()
  let currentDate = null
  do {
    currentDate = Date.now()
  } while (currentDate - date < milliseconds)
}

// https://stackoverflow.com/questions/8206269/how-to-remove-http-from-a-url-in-javascript
export const removeProtocol = (url: string) => url.replace(/(^\w+:|^)\/\//, '')
