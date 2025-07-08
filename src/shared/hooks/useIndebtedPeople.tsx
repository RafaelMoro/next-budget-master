import { useEffect, useState } from "react"
import { IndebtedPeople, IndebtedPeopleUI } from "../types/records.types"
import { formatNumberToCurrency } from "../utils/formatNumberCurrency.utils"
import { useMediaQuery } from "./useMediaQuery"

/**
* This hook is meant to be used with component IndebtedPeopleModal
*/
export const useIndebtedPeople = () => {
  const { isMobileTablet } = useMediaQuery()

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const toggleModal = () => setOpenModal((prev) => !prev)
  const toggleDrawer = () => setOpenDrawer((prev) => !prev)

  const handleClick = isMobileTablet ? toggleModal : toggleDrawer

  const [indebtedPeople, setIndebtedPeople] = useState<IndebtedPeople[]>([])
  const [openIndebtedPeopleModal, setOpenIndebtedPeopleModal] = useState<boolean>(false)
  const [indebtedPeopleUI, setIndebtedPeopleUI] = useState<IndebtedPeopleUI[]>([])

  const toggleIndebtedPeopleModal = () => setOpenIndebtedPeopleModal((prev) => !prev)

  const addIndebtedPerson = (newIndebtedPerson: IndebtedPeople) => {
    setIndebtedPeople([...indebtedPeople, newIndebtedPerson])
  }

  const validatePersonExist = (name: string): boolean => {
    return indebtedPeople.some((person) => person.name.toLowerCase() === name.toLowerCase())
  }

  useEffect(() => {
    const updatedIndebtedPeopleUI: IndebtedPeopleUI[] = indebtedPeople.map((person) => ({
      ...person,
      amountFormatted: formatNumberToCurrency(person.amount),
      amountPaidFormatted: formatNumberToCurrency(person.amountPaid),
      remainingAmountFormatted: formatNumberToCurrency(person.amount - person.amountPaid)
    }))
    setIndebtedPeopleUI(updatedIndebtedPeopleUI)
  }, [indebtedPeople])

  return {
    openIndebtedPeopleModal,
    openModal,
    openDrawer,
    handleClick,
    toggleModal,
    toggleDrawer,
    toggleIndebtedPeopleModal,
    addIndebtedPerson,
    validatePersonExist,
    indebtedPeople,
    indebtedPeopleUI
  }
}