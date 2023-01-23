import { useContext } from 'react'
import { RContextType, RContext } from 'rlayers'

const useMap = () => {
  return useContext<RContextType>(RContext)
}
export default useMap
