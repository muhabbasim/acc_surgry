import { useNavigate } from "react-router";

const useActiveDir = () => {
  const router = useNavigate();
  const { locale: activeLocale } = router;

  let activeDir;
  if (activeLocale === "en") {
    activeDir = 'ltr';
  } else if (activeLocale === "ar") {
    activeDir = 'rtl';
  } else {
    activeDir = 'ltr'; // Default to 'ltr' if locale is not 'en' or 'ar'
  }

  return activeDir;
};

export default useActiveDir;