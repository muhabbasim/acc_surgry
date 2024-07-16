import { useNavigate } from "react-router";
import { useDispatch } from 'react-redux';
import { setDir, setLanguage } from 'src/store/customizer/CustomizerSlice';
import { Languages } from "src/data/LanguageData";
import { AppState, useSelector } from "src/store/Store";

export default function Language({ setToggle }: any) {
    
const router = useNavigate();
  
  const dispatch = useDispatch();
  const customizer = useSelector((state: AppState) => state.customizer);

  const activeLang = customizer.isLanguage

  const handleChageLanguage = ( value:string ) => {
    dispatch(setLanguage(value))
    localStorage.setItem('ACC_LANG', JSON.stringify(value))
    
    if ( value === 'ar' ) {
      dispatch(setDir('rtl'))
    } else if ( value === 'en' ) {
      dispatch(setDir('ltr'))
    }

    setToggle(false);
  }
  
  return (
    <div>
      <ul style={{ display: 'flex', flexDirection: "column", gap: '10px', zIndex: '20', listStyleType: 'none' }}>
        {Languages.map((lang: any) => {
          return (
            <li 
              key={lang.value}
              style={{ cursor: 'pointer', color: activeLang === lang?.value ? 'white' : 'gray' }}
              onClick={() => handleChageLanguage(lang.value)}
            >
              <span
              > 
                {/* {lang === 'en' ? "English" : "عربي"} */}
                {lang.flagname}
              </span>
            </li>
          )
        })}
      </ul>
    
    </div>
  )
}
