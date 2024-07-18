import { Link } from "react-router-dom";
import PageBannerDark from "src/Acc_landingpage/components/PageBannerDark";
import CallToActionSection from "src/Acc_landingpage/components/sections/CallToAction";
import { serviceData } from "src/Acc_landingpage/data/data";
import ArrowIcon from "src/Acc_landingpage/layouts/svg-icons/Arrow";
import LinesIcon from "src/Acc_landingpage/layouts/svg-icons/Lines";

export default function Services() {
  return (
    
    <div className="mil-dark-bg">
      <PageBannerDark pageTitle={"This is what we do best"} breadTitle={"Services"} anchorLabel={"Our services"} anchorLink={""} />

      <section id="services">
          <div className="mi-invert-fix mil-dark-bgx">
              <div className="container mil-p-120-60">
                  <div className="row">
                      <div className="col-lg-5">

                          <div className="mil-lines-place mil-light">
                            <LinesIcon />
                          </div>

                      </div>
                      <div className="col-lg-7">
                          <div className="row">
                              {serviceData.map((item, key) => (
                              <div className="col-md-6 col-lg-6" key={`services-item-${key}`}>
                                  <Link to={`/home/services/service_details/${item.id}`} className={key%2 == 0 ? "mil-service-card-lg mil-more mil-accent-cursor mil-offset" : "mil-service-card-lg mil-more mil-accent-cursor"}>
                                      <h1 className="mil-muted mil-up mil-mb-30" dangerouslySetInnerHTML={{__html : item.title}} />
                                      <p className="mil-descr mil-light-soft mil-up mil-mb-30">{item.text}</p>
                                      <ul style={{paddingLeft: 0}} className="mil-service-list mil-light mil-mb-30">
                                        {item.list.slice(0, 3).map((list_item:any, list_key:any) => (
                                        <li className="mil-up" key={`services-item-${key}-list-${list_key}`}>{list_item.label}</li>
                                        ))}
                                      </ul>
                                      <div className="mil-link mil-accent mil-arrow-place mil-up">
                                          <span>Read more</span>
                                          <ArrowIcon />
                                      </div>
                                  </Link>
                              </div>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </section>

      <CallToActionSection />

    </div>
  )
}
