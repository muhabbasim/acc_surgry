
import { useLocation } from "react-router";

import ArrowIcon from "src/Acc_landingpage/layouts/svg-icons/Arrow";
import Pentagon from "src/Acc_landingpage/layouts/pentagon/Index";
import { Link } from "react-router-dom";

const PageBanner = ({ pageTitle, anchorLabel, anchorLink = 0, paddingBottom, align, headingSize = 1 }: any) => {

  const asPath = useLocation().pathname;
  const cat = useLocation().pathname.split('/')[4];
  const words = pageTitle.split(' ');
  const lastWords = words.splice(-2).join(' ');

  let clearBreadTitle;

  if ( pageTitle != undefined ) {
    clearBreadTitle = pageTitle;
  } else {
    const regex = /(<([^>]+)>)/gi;
    clearBreadTitle = pageTitle.replace(regex, "");
  }

  console.log(clearBreadTitle)
  return (
    <>
      <div className={paddingBottom ? "mil-inner-banner mil-p-0-120" : "mil-inner-banner"}>
        <div className={align == "center" ? "mil-banner-content mil-center mil-up" : "mil-banner-content mil-up"}>
          <div className="mil-animation-frame">
            <div className="mil-animation mil-position-4 mil-dark mil-scale" data-value-1="6" data-value-2="1.4"><Pentagon /></div>
          </div>
          <div className="container">
            <ul className={align == "center" ? "mil-breadcrumbs mil-center mil-mb-60" : "mil-breadcrumbs mil-mb-60"}>
              <li><Link to="/home">Homepage</Link></li>
              {asPath.indexOf('/home/blog/') != -1 &&
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              }
              {asPath.indexOf('/projects/') != -1 &&
              <li>
                <Link to="/projects">Projects</Link>
              </li>
              }
              {asPath.indexOf('/home/services/') != -1 &&
              <li>
                <Link to="/home/services">Services</Link>
              </li>
              }
              {asPath.indexOf('/home/blog_cat/') != -1 &&
              <li>
                <Link to="/home/services">{cat}</Link>
              </li>
              }
              {/* {
                asPath.indexOf('/blog_cat/') && (
                  <li>
                    <Link to="/home/services">{cat}</Link>
                  </li>
                ) 
              } */}
              <li><a dangerouslySetInnerHTML={{__html : clearBreadTitle}} /></li>
            </ul>
            {headingSize == 1 &&
              <h1 className="mil-mb-60 page-title">
                {words.join(' ')}
                <br />
                <strong style={{ fontWeight: 200 }}>{lastWords}</strong>
              </h1>
            }
            {headingSize == 2 &&
            <h2 className={anchorLink != 0 ? "mil-mb-60" : ""} dangerouslySetInnerHTML={{__html : pageTitle}} />
            }
            {anchorLink != 0 &&
            <a href={anchorLink} className="mil-link mil-dark mil-arrow-place mil-down-arrow">
                <span>{anchorLabel}</span>
                <ArrowIcon />
            </a>
            }
          </div>
        </div>
      </div>
      {/* banner end */}
    </>
  );
};
export default PageBanner;
