import { VendorsContext } from "../context/VendorsContext"
import { useContext } from "react"

export const useVendorsContext = () => {
  const context = useContext(VendorsContext)

  if(!context) {
    throw Error('useWorkoutsContext must be used inside an VendorsContextProvider')
  }

  return context
}