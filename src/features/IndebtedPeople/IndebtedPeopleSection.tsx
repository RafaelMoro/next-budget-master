"use client"
import { ReactNode } from "react"
import { Button } from "flowbite-react"

import { IndebtedPeopleUI } from "@/shared/types/records.types"
import { ShowIndebtedPeople } from "./ShowIndebtedPeople"

interface IndebtedPeopleSectionProps {
  indebtedPeople: IndebtedPeopleUI[]
  isMobileTablet: boolean
  children: ReactNode
  handleClick: () => void
}

export const IndebtedPeopleSection = ({ children, indebtedPeople, isMobileTablet, handleClick }: IndebtedPeopleSectionProps) => {
  return (
    <section className="flex flex-col gap-4">
      <h4 className="text-xl text-center md:text-start font-semibold">Personas que te deben</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        ¿Alguien más coopera con esta transacción? Registra aquí su parte para que no se te olvide.
      </p>
      { (indebtedPeople.length > 0  && isMobileTablet) && (
        <ShowIndebtedPeople indebtedPeople={indebtedPeople} />
      )}
      <Button color="light" className="lg:max-w-max mx-auto" onClick={handleClick}>¿Quién te debe?</Button>
      { children }
    </section>
  )
}