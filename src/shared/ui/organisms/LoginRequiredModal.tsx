"use client";

import { Modal, ModalBody, ModalFooter } from "flowbite-react";
import { useEffect, useState } from "react";
import { LinkButton } from "../atoms/LinkButton";
import { LOGIN_ROUTE } from "@/shared/constants/Global.constants";
import { GetAccessTokenResponse } from "@/shared/types/global.types";
import { JWT_ERROR_VERIFY } from "@/shared/constants/Login.constants";

interface LoginRequiredModalProps {
  show: boolean;
  resToken: GetAccessTokenResponse
}

export const LoginRequiredModal = ({ show, resToken }: LoginRequiredModalProps) => {
  const [openModal, setOpenModal] = useState<boolean>(show);
  const toggleModal = () => setOpenModal((prevState) => !prevState);

  useEffect(() => {
    if (!resToken.accessToken && resToken.message === JWT_ERROR_VERIFY) {
      fetch('/api/auth/sign-out')
    }
  }, [resToken.accessToken, resToken.message])

  return (
    <Modal show={openModal} onClose={toggleModal}>
        <div className="flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600">
          <h4 className="text-xl font-medium text-gray-900 dark:text-white">Vuelve a iniciar sesión para continuar</h4>
        </div>
        <ModalBody>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Por motivos de seguridad, tu sesión se cerró automáticamente. Ingresa de nuevo para continuar.
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <LinkButton href={LOGIN_ROUTE}>Iniciar sesión</LinkButton>
        </ModalFooter>
      </Modal>
  )
}