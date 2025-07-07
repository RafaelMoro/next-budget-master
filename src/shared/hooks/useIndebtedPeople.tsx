import { useEffect, useState } from "react"
import { IndebtedPeople, IndebtedPeopleUI } from "../types/records.types"
import { formatNumberToCurrency } from "../utils/formatNumberCurrency.utils"

export const useIndebtedPeople = () => {
  const [indebtedPeople, setIndebtedPeople] = useState<IndebtedPeople[]>([])
  const [openIndebtedPeopleModal, setOpenIndebtedPeopleModal] = useState<boolean>(false)
  const [indebtedPeopleUI, setIndebtedPeopleUI] = useState<IndebtedPeopleUI[]>([])
  const toggleIndebtedPeopleModal = () => setOpenIndebtedPeopleModal((prev) => !prev)
  const addIndebtedPerson = (newIndebtedPerson: IndebtedPeople) => {
    setIndebtedPeople([...indebtedPeople, newIndebtedPerson])
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
    toggleIndebtedPeopleModal,
    addIndebtedPerson,
    indebtedPeople,
    indebtedPeopleUI
  }
}