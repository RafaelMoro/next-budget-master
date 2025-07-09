import { IndebtedPeopleUI } from "@/shared/types/records.types"
import { Button } from "flowbite-react"
import { ShowIndebtedPeople } from "./ShowIndebtedPeople"
import { ReactNode } from "react"

interface IndebtedPeopleSectionProps {
  children: ReactNode
  openModal: boolean
  toggleModal: () => void
  indebtedPeople: IndebtedPeopleUI[]
  updateEditPerson: (person: IndebtedPeopleUI) => void
}

/**
 * This component wraps the modal to add a indebted person. It is a section with title and description. Also shows
 * the indebted people
 */
export const IndebtedPeopleSection = ({ children, toggleModal, indebtedPeople, updateEditPerson }: IndebtedPeopleSectionProps) => {
  return (
    <section className="flex flex-col gap-4">
      <h4 className="text-xl text-center md:text-start font-semibold">Personas que te deben</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        ¿Alguien más coopera con esta transacción? Registra aquí su parte para que no se te olvide.
      </p>
      { indebtedPeople.length > 0 && (
        <ShowIndebtedPeople updateEditPerson={updateEditPerson} indebtedPeople={indebtedPeople} />
      )}
      <Button color="light" className="lg:max-w-max mx-auto" onClick={toggleModal}>¿Quién te debe?</Button>
      { children }
    </section>
  )
}