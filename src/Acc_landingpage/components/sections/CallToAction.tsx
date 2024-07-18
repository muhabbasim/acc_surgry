import { Link } from "react-router-dom";
import Data from "src/Acc_landingpage/data/sections/call-to-action.json";


import ArrowIcon from "src/Acc_landingpage/layouts/svg-icons/Arrow";

const CallToActionSection = () => {
  return (
    <>
        {/* call to action */}
        <section className="mil-soft-bg">
            <div className="container mil-p-120-120">
                <div className="row">
                    <div className="col-lg-10">
                        <span className="mil-suptitle mil-suptitle-right mil-suptitle-dark mil-up" dangerouslySetInnerHTML={{__html : Data.subtitle}} />
                    </div>
                </div>
                <div className="mil-center">
                    <h2 className="mil-up mil-mb-60" dangerouslySetInnerHTML={{__html : Data.title}} />
                    <div className="mil-up">
                        <Link to={Data.button.link} className="mil-button mil-arrow-place">
                            <span>{Data.button.label}</span>
                            <ArrowIcon />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        {/* call to action end */}
    </>
  );
};

export default CallToActionSection;