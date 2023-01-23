export const resolveVersion = (): string => {
  const rcVersion = process.env.REACT_APP_RC_VERSION ? process.env.REACT_APP_RC_VERSION.slice(0, 7) : null
  const packageVersion = process.env.REACT_APP_VERSION as string
  return rcVersion ? `${packageVersion}+${rcVersion}` : packageVersion
}
