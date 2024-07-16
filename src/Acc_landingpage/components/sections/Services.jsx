import Data from "@data/sections/services.json";
import Link from "next/link";
import ArrowIcon from "@layouts/svg-icons/Arrow";
import Pentagon from "@layouts/pentagon/Index";
import { useTranslations } from "next-intl";

  
const ServicesSection = () => {
    const t = useTranslations('Services');
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
                                <span className="mil-suptitle mil-light-soft mil-suptitle-right mil-up" dangerouslySetInnerHTML={{__html : t('title1')}} />
                            </div>
                        </div>

                        <div className="mil-complex-text justify-content-center mil-up mil-mb-15">
                            <span className="mil-text-image"><img src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2896&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="team" /></span>
                            <h2 style={{ fontWeight: 100 }} className="mil-h1 mil-muted mil-center" dangerouslySetInnerHTML={{__html : t('title2')}} />
                        </div>

                        <div className="mil-complex-text justify-content-center mil-up">
                            <h2 className="mil-h1 mil-muted mil-center" dangerouslySetInnerHTML={{__html : t('title3')}} />
                            <Link href={Data.button.link} className="mil-services-button mil-button mil-arrow-place">
                                <span>{t('button.label')}</span>
                                <ArrowIcon />
                            </Link>
                        </div>
                    </div>

                    <div className="row mil-services-grid m-0">
                        <div key={`services-item-${0}`} className="col-md-6 col-lg-3 mil-services-grid-item p-0">
                            <Link href={t('service1.link')} className="mil-service-card-sm mil-up">
                                <h5 className="mil-muted mil-mb-30" dangerouslySetInnerHTML={{__html : t('service1.title')}} />
                                <p className="mil-light-soft mil-mb-30">{t('service1.text')}</p>
                                <div className="mil-button mil-icon-button-sm mil-arrow-place">
                                    <ArrowIcon />
                                </div>
                            </Link>
                        </div>
                        <div key={`services-item-${1}`} className="col-md-6 col-lg-3 mil-services-grid-item p-0">
                            <Link href={t('service2.link')} className="mil-service-card-sm mil-up">
                                <h5 className="mil-muted mil-mb-30" dangerouslySetInnerHTML={{__html : t('service2.title')}} />

                                <p className="mil-light-soft mil-mb-30">{t('service2.text')}</p>
                                <div className="mil-button mil-icon-button-sm mil-arrow-place">
                                    <ArrowIcon />
                                </div>
                            </Link>
                        </div>
                        <div key={`services-item-${2}`} className="col-md-6 col-lg-3 mil-services-grid-item p-0">
                            <Link href={t('service3.link')} className="mil-service-card-sm mil-up">
                                <h5 className="mil-muted mil-mb-30" dangerouslySetInnerHTML={{__html : t('service3.title')}} />
                                <p className="mil-light-soft mil-mb-30">{t('service3.text')}</p>
                                <div className="mil-button mil-icon-button-sm mil-arrow-place">
                                    <ArrowIcon />
                                </div>
                            </Link>
                        </div>
                        <div key={`services-item-${3}`} className="col-md-6 col-lg-3 mil-services-grid-item p-0">
                            <Link href={t('service4.link')} className="mil-service-card-sm mil-up">
                                <h5 className="mil-muted mil-mb-30" dangerouslySetInnerHTML={{__html : t('service4.title')}} />
                                <p className="mil-light-soft mil-mb-30">{t('service4.text')}</p>
                                <div className="mil-button mil-icon-button-sm mil-arrow-place">
                                    <ArrowIcon />
                                </div>
                            </Link>
                        </div>
                        {/* {Data.items.map((item, key) => (
                        <div key={`services-item-${key}`} className="col-md-6 col-lg-3 mil-services-grid-item p-0">

                            <Link href={item.link} className="mil-service-card-sm mil-up">
                                <h5 className="mil-muted mil-mb-30" dangerouslySetInnerHTML={{__html : t('item.title')}} />
                                <p className="mil-light-soft mil-mb-30">{item.text}</p>
                                <div className="mil-button mil-icon-button-sm mil-arrow-place">
                                    <ArrowIcon />
                                </div>
                            </Link>

                        </div>
                        ))} */}
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