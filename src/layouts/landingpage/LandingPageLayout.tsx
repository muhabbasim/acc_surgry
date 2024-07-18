import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import CursorModule from "src/Acc_landingpage/layouts/cursor/Index";
import Header from "src/Acc_landingpage/layouts/headers/LayoutDefault";
import ScrollbarProgressModule from "src/Acc_landingpage/layouts/scrollbar-progress/Index";
import { ScrollAnimation } from "src/Acc_landingpage/common/scrollAnims";
import { CursorAnimation } from "src/Acc_landingpage/common/cursor";
import { AnchorSscroll } from "src/Acc_landingpage/common/utilits";
import { CurrentPageLabel } from "src/Acc_landingpage/common/utilits";
import { AppState, useSelector } from "src/store/Store";
import DefaultFooter from "src/Acc_landingpage/layouts/footers/LayoutDefault";

import 'src/Acc_landingpage/styles/globals.css';
import 'src/Acc_landingpage/styles/scss/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PreloaderAnimation } from "src/Acc_landingpage/common/preloader";


const LandingPageLayout = () => {

  const customizer = useSelector((state: AppState) => state.customizer);
  const activeDir = customizer.activeDir

  useEffect(() => {
    PreloaderAnimation();
    ScrollAnimation();
    CursorAnimation();
    AnchorSscroll();
    CurrentPageLabel();
  }, []);

  return (
    <div dir={activeDir} className="mil-wrapper" id="top">
      <CursorModule />
      <Header/>
      <ScrollbarProgressModule/>

      <div className="mil-content">
        <div id="swupMain" className="mil-main-transition">
          <Outlet />
          <DefaultFooter/>
        </div>
      </div>
    </div>
  )
}







export default LandingPageLayout;
