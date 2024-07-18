import { Link } from "react-router-dom";
import Translatable from "src/Acc_components/translatable_text/Translatable";
import Data from "src/Acc_landingpage/data/sections/related-services.json";


const RelatedServicesSection = ( { services } :any ) => {

    return (    
        <>
            {/* related services */}
            <section>
                <div className="container mil-p-120-90">
                    <div className="row align-items-center mil-mb-30">
                        <div className="col-lg-6 mil-mb-30">
                            <h3 className="mil-up"><Translatable>Other services</Translatable></h3>
                        </div>
                        <div className="col-lg-6 mil-mb-30">
                            <div className="mil-adaptive-right mil-up">
                                <a href={Data.button.link} className="mil-link mil-dark mil-arrow-place">
                                    <span><Translatable>View all services</Translatable></span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {services?.map((item: any, key: any) => (
                        <div className="col-lg-4" key={`services-${key}`}>

                            <Link style={{ color: 'inherit'}} to={`/home/services/service_details/${item.id}`} className="mil-service-card-lg mil-other-card mil-more mil-mb-30">
                                <h4 className="mil-up mil-mb-30" dangerouslySetInnerHTML={{__html : item.title}} />
                                <p className="mil-descr mil-up mil-mb-30">{item.text}</p>
                                <ul style={{ paddingLeft: 0}} className="mil-service-list mil-dark mil-mb-30">
                                    {item?.list?.map((list_item: any, list_key: any) => (
                                    <li className="mil-up" key={`services-${key}-list-${list_key}`}>{list_item.label}</li>
                                    ))}
                                </ul>
                                <div className="mil-link mil-dark mil-arrow-place mil-up">
                                    <span>Read more</span>
                                </div>
                            </Link>

                        </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* related services end */}
        </>
    );
};

export default RelatedServicesSection;