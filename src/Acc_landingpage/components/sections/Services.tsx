import ArrowIcon from "src/Acc_landingpage/layouts/svg-icons/Arrow";
import Pentagon from "src/Acc_landingpage/layouts/pentagon/Index";
import { Link } from "react-router-dom";
import Translatable from "src/Acc_components/translatable_text/Translatable";
import { serviceData } from "src/Acc_landingpage/data/data";

  
const ServicesSection = () => {
    // Make sure to access the items array correctly
    // const items = t('items', { returnObjects: true });

  return (
    <>
        {/* services */}
        <section className="mil-dark-bg-service">
            <div className="mi-invert-fix">
                <div className="mil-animation-frame">
                    <div className="mil-animation mil-position-1 mil-scale" data-value-1="2.4" data-value-2="1.4" style={{"top": "300px", "right": "-100px"}}>
                        <Pentagon />
                    </div>
                    <div className="mil-animation mil-position-2 mil-scale" data-value-1="2" data-value-2="1" style={{"left": "150px"}}>
                        <Pentagon />
                    </div>
                </div>
                <div className="container mil-p-120-0">

                    <div className="mil-mb-120">
                        <div className="row">
                            <div className="col-lg-10">
                                <span className="mil-suptitle mil-light-soft mil-suptitle-right mil-up" dangerouslySetInnerHTML={{__html : 'Have access to a wide range of services tailored for your pets'}} />
                            </div>
                        </div>

                        <div className="mil-complex-text justify-content-center mil-up mil-mb-15">
                            <span className="mil-text-image"><img src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2896&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="team" /></span>
                            <h2 style={{ fontWeight: 100 }} className="mil-h1 mil-muted mil-center" dangerouslySetInnerHTML={{__html : 'Our Core'}} />
                        </div>

                        <div className="mil-complex-text justify-content-center mil-up">
                            <h2 className="mil-h1 mil-muted mil-center" dangerouslySetInnerHTML={{__html : 'Services at ACC'}} />
                            <Link to={'/home/services'} className="mil-services-button mil-button mil-arrow-place">
                                <span><Translatable>All services</Translatable></span>
                                <ArrowIcon />
                            </Link>
                        </div>
                    </div>

                    <div className="row mil-services-grid m-0">
                       
                        {serviceData.map((item, key) => (
                            <div key={`services-item-${key}`} className="col-md-6 col-lg-3 mil-services-grid-item p-0">
                                <Link to={`/home/services/service_details/${item.id}`} className="mil-service-card-sm mil-up">
                                    <h5 className="mil-muted mil-mb-30" dangerouslySetInnerHTML={{__html : item.title}} />
                                    <p className="mil-light-soft mil-mb-30">{item.text}</p>
                                    <div className="mil-button mil-icon-button-sm mil-arrow-place">
                                        <ArrowIcon />
                                    </div>
                                </Link>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
        {/* services end */}
    </>
  );
};

const keys = [
    "title",
    "text",
    "link",
  ]
export default ServicesSection;