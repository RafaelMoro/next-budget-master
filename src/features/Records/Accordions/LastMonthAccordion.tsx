import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react"

export const LastMonthAccordion = () => {
  return (
    <>
      <Accordion className="max-w-3xl min-w-[540px]">
        <AccordionPanel>
          <AccordionTitle>Último mes</AccordionTitle>
          <AccordionContent>
            <p>Some text</p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </>
  )
}