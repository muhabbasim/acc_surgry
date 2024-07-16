import React from 'react'
import { useTranslations } from "next-intl";

export default function Translatable(children) {
  
  const t = useTranslations();

  return (
    <>
      {t(`${ children }`)}
    </>
  )
}
