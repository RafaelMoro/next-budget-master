"use client"

import { SELECTED_ACCOUNT_KEY } from "../constants/local-storage.constants"
import { addToLocalStorage, getLocalStorageInfo } from "../lib/local-storage.lib"
import { AccountTypes } from "../types/accounts.types"

/**
 * This function calls the API to save the selected account in the cookie for client side components
 * @param accountId - string
 * @returns Promise<void>
 */
export const saveAccountApi = async (accountId: string) => {
  try {
    const res = await fetch('/api/preferences/selected-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accountId }),
    })
    return res
  } catch (error) {
    console.log('error while saving theme in api', error)
  }
}

export const saveSelectedAccountLocalStorage = async ({ accountId, accountType }:{
  accountId: string
  accountType: AccountTypes
}) => {
  try {
    addToLocalStorage({ prop: SELECTED_ACCOUNT_KEY, newInfo: { accountId, accountType } })
  } catch (error) {
    console.log('error while saving selected account in local storage', error)
  }
}

export const getSelectedAccountLocalStorage = () => {
  try {
    const { "selected-account": selectedAccount } = getLocalStorageInfo()
    return selectedAccount
  } catch (error) {
    console.log('error while getting selected account from local storage', error)
  }
}