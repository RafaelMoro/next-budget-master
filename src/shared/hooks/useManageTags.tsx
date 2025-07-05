import { useRef, useState } from "react"

/**
* It's to manage tags for records with the modal ManageTagsModal
* This hook is meant to be used with ManageTagsModal component
*/
export const useManageTags = () => {
  // The state to open the tag modal is used outside to avoid submit of create transaction form if user clicks enter
  const [openTagModal, setTagModal] = useState<boolean>(false)
  const toggleTagModal = () => setTagModal(!openTagModal)
  const tags = useRef<string[]>([])
  const updateTags = (newTags: string[]) => {
    tags.current = [...newTags]
  }

  return {
    openTagModal,
    toggleTagModal,
    tags,
    updateTags
  }
}