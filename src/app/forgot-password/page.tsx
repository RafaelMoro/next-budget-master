import type { Metadata } from "next";
import { ForgotPassword } from "@/features/Login/ForgotPassword/ForgotPassword";
import { FORGOT_PASSWORD_META_DESCRIPTION, FORGOT_PASSWORD_META_TITLE } from "@/shared/constants/metadata.constants";

export const metadata: Metadata = {
  title: FORGOT_PASSWORD_META_TITLE,
  description: FORGOT_PASSWORD_META_DESCRIPTION,
};

export default function ForgotPasswordPage() {
  return (
    <ForgotPassword />
  )
}