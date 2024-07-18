
import { useLocation, useNavigate } from "react-router";
import AppData from "src/Acc_landingpage/data/app.json";

import ArrowIcon from "src/Acc_landingpage/layouts/svg-icons/Arrow";
import Pentagon from "src/Acc_landingpage/layouts/pentagon/Index";
import { Link } from "react-router-dom";

const PageBannerDark = ({ pageTitle, breadTitle, anchorLabel, anchorLink }: any) => {

  const location = useLocation();
  const asPath = location.pathname
  let clearBreadTitle;

  if ( breadTitle != undefined ) {
    clearBreadTitle = breadTitle;
  } else {
    const regex = /(<([^>]+)>)/gi;
    clearBreadTitle = pageTitle.replace(regex, "");
  }

  const headTitle = `${AppData.settings.siteName} - ${clearBreadTitle}`;

  return (
    <>
      <div>
        <title>{headTitle}</title>
      </div>
      
      {/* banner */}
      <div className="mil-inner-banner">
        <div className="mi-invert-fix">
          <div className="mil-banner-content mil-up">
            <div className="mil-animation-frame">
              <div className="mil-animation mil-position-4 mil-scale" data-value-1="6" data-value-2="1.4"><Pentagon /></div>
            </div>
            <div className="container">
              <ul className="mil-breadcrumbs mil-light mil-mb-60">
                <li><Link to="/home">Homepage</Link></li>
                {asPath.indexOf('/blog/') != -1 &&
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                }
                {asPath.indexOf('/projects/') != -1 &&
                <li>
                  <Link to="/projects">Projects</Link>
                </li>
                }
                {asPath.indexOf('/services/') != -1 &&
                <li>
                  <Link to="/services">Services</Link>
                </li>
                }
                <li><a dangerouslySetInnerHTML={{__html : clearBreadTitle}} /></li>
              </ul>
              <h1 className="mil-muted mil-mb-60" dangerouslySetInnerHTML={{__html : pageTitle}} />
              <a href={anchorLink} className="mil-link mil-accent mil-arrow-place mil-down-arrow">
                  <span>{anchorLabel}</span>
                  <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* banner end */}
    </>
  );
};
export default PageBannerDark;
