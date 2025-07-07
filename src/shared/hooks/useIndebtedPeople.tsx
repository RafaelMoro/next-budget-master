import { useRef, useState } from "react"
import { IndebtedPeople } from "../types/records.types"

export const useIndebtedPeople = () => {
  const indebtedPeople = useRef<IndebtedPeople[]>([])
  const [openIndebtedPeopleModal, setOpenIndebtedPeopleModal] = useState<boolean>(false)
  const toggleIndebtedPeopleModal = () => setOpenIndebtedPeopleModal((prev) => !prev)
  const addIndebtedPerson = (newIndebtedPerson: IndebtedPeople) => {
    indebtedPeople.current = [...indebtedPeople.current, newIndebtedPerson]
  }

  return {
    openIndebtedPeopleModal,
    toggleIndebtedPeopleModal,
    addIndebtedPerson,
    indebtedPeople
  }
}