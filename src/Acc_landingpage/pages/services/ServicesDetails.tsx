import { useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Accordion } from "src/Acc_landingpage/common/utilits";
import PageBanner from "src/Acc_landingpage/components/PageBanner";
import RelatedServicesSection from "src/Acc_landingpage/components/sections/RelatedServices";
import { serviceData } from "src/Acc_landingpage/data/data";

export default function ServicesDetails() {
  
  const serviceId = useLocation().pathname?.split("/")[4];
  const service = serviceData.find((service: any) => service.id === serviceId); 
  const otherService = serviceData.filter((service: any) => service.id !== serviceId); 


  useEffect(() => {
    Accordion();
  }, []);


  return (
    <div>
      <PageBanner pageTitle={service?.title} breadTitle={service?.title} anchorLabel={"About service"} anchorLink={"#service"} />

      <section id="service">
          <div className="container mil-p-120-90">
              <div className="row justify-content-between">
                  <div className="col-lg-4 mil-relative mil-mb-90">
                      <h1 className="mil-up mil-mb-30">{service?.title}</h1>
                      <p className="mil-up mil-mb-30">{service?.text}</p>
                      
                      <div className="mil-up">
                          <Link to={''} className="mil-link mil-dark mil-arrow-place">
                            <span>{service?.title}</span>
                          </Link>
                      </div>

                  </div>
                  <div className="col-lg-6">
                  {service?.list != undefined &&
                  <>
                      {service?.list.map((item, key) => (
                        <div className="mil-accordion-group mil-up" key={`service-list-${key}`}>
                            <div className="mil-accordion-menu">
                              <p className="mil-accordion-head">{item.label}</p>
                              <div className="mil-symbol mil-h3">
                                <div className="mil-plus">+</div>
                                <div className="mil-minus">-</div>
                              </div>
                            </div>
                            <div className="mil-accordion-content mil-text" dangerouslySetInnerHTML={{__html : item.value}} />
                        </div>
                      ))}
                  </>
                  }
                  </div>
              </div>
          </div>
      </section>

      <RelatedServicesSection services={otherService} />

    </div>
  )
}
