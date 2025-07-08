import { Button, Drawer, DrawerHeader, DrawerItems } from "flowbite-react"
import { ReactNode } from "react"
import { ShowIndebtedPeople } from "./ShowIndebtedPeople";
import { IndebtedPeopleUI } from "@/shared/types/records.types";

interface IndebtedPeopleDrawerProps {
  children : ReactNode
  indebtedPeople: IndebtedPeopleUI[]
  open: boolean;
  toggleDrawer: () => void
  toggleModal: () => void
}

export const IndebtedPeopleDrawer = ({ children, open, indebtedPeople, toggleDrawer, toggleModal }: IndebtedPeopleDrawerProps) => {
  return (
    <Drawer open={open} onClose={toggleDrawer} position="right">
      <DrawerHeader title="Personas que te deben" />
      <DrawerItems>
        <ShowIndebtedPeople indebtedPeople={indebtedPeople} />
        <Button color="light" className="lg:max-w-max mx-auto" onClick={toggleModal}>Agregar persona</Button>
        { children }
      </DrawerItems>
    </Drawer>
  )
}