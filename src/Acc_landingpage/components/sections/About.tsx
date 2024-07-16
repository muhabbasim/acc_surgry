import Data from "src/Acc_landingpage/data/sections/about.json";
import LinesIcon from "src/Acc_landingpage/layouts/svg-icons/Lines";

const AboutSection = () => {

    return (
        <>
            {/* about */}
            <section id="about">
                <div className="container mil-p-120-30">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-lg-6 col-xl-5">

                            <div className="mil-mb-90">
                                <h2 className="mil-upx mil-mb-0" dangerouslySetInnerHTML={{__html : 'About.title'}} />
                                {/* <span>{'About'itle2')}</span> */}
                                <h2 style={{fontWeight: 100}} className="mil-up mil-mb-60" dangerouslySetInnerHTML={{__html : 'About.title2'}} />
                                <div className="mil-text mil-up mil-mb-30" dangerouslySetInnerHTML={{__html : 'About.description'}} />
                                <div className="mil-text mil-up mil-mb-30" dangerouslySetInnerHTML={{__html : 'About.subtitle'}} />
                                
                                <div className="mil-about-quote">
                                    <div className="mil-avatar mil-up">
                                        <img src={'https://images.unsplash.com/photo-1555169062-013468b47731?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt={Data.avatar.alt} />
                                    </div>
                                    <h6 className="mil-quote mil-up" dangerouslySetInnerHTML={{__html : 'About.subtitle2'}} />
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-5">

                            <div className="mil-about-photo mil-mb-90">
                                <div className="mil-lines-place">
                                    <LinesIcon />
                                </div>
                                <div className="mil-up mil-img-frame" style={{"paddingBottom": "160%"}}>
                                    {/* <img src={"https://images.unsplash.com/photo-1542596216-76b74273f392?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt={Data.image.alt} className="mil-scale" data-value-1="1" data-value-2="1.2" /> */}
                                    <img src={"https://bestfriendspetcare.com/wp-content/uploads/2024/03/cat-at-vet.jpg"} alt={Data.image.alt} className="mil-scale" data-value-1="1" data-value-2="1.2" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            {/* about end */}
        </>
    );
};

export default AboutSection;