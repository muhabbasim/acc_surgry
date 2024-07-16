
import { useTranslation } from 'react-i18next';

export default function Translatable({ children }: { children: React.ReactNode} ) {
  const { t } = useTranslation();

  return (
    <>
      {t(`${ children }`)}
    </>
  )
}
