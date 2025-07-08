import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { ReactNode } from "react";

interface FurtherDetailsAccordeonProps {
  children: ReactNode
}

export const FurtherDetailsAccordeon = ({ children }: FurtherDetailsAccordeonProps) => {
  return (
    <Accordion collapseAll>
      <AccordionPanel>
        <AccordionTitle>Más detalles</AccordionTitle>
        <AccordionContent>
          {children}
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  )
}