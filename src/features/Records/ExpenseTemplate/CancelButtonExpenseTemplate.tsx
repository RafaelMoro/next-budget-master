import { useRouter } from 'next/navigation'
import { Button } from "flowbite-react"

import { DASHBOARD_ROUTE } from "@/shared/constants/Global.constants"
import { LinkButton } from "@/shared/ui/atoms/LinkButton"
import { resetEditRecordLS } from '@/shared/utils/records.utils'
import { RiArrowLeftLine } from '@remixicon/react'

interface CancelButtonExpenseTemplateProps {
  action: 'create' | 'edit' | 'goBack'
}

export const CancelButtonExpenseTemplate = ({ action }: CancelButtonExpenseTemplateProps) => {
  const router = useRouter()
  const handleGoBack = () => {
    resetEditRecordLS()
    router.push(DASHBOARD_ROUTE)
  }

  if (action === 'goBack') {
    return (
      <Button onClick={handleGoBack} color="light">
        <RiArrowLeftLine />
        Volver
      </Button>
    )
  }

  if (action === 'edit') {
    return (
      <Button onClick={handleGoBack} color="secondary">Cancelar</Button>
    )
  }

  return (
    <LinkButton className="mt-4" type="secondary" href={DASHBOARD_ROUTE} >Cancelar</LinkButton>
  )
}