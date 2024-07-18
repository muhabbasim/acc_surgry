import Data from "src/Acc_landingpage/data/sections/popular-posts.json";

import ArrowIcon from "src/Acc_landingpage/layouts/svg-icons/Arrow";
import { Link } from "react-router-dom";

const PopularPostsSection = ( { posts }: any ) => {
    
    return (
        <>
            {/* popular */}
            <section className="mil-soft-bg" id="blog">
                <div className="container mil-p-120-60">
                    <div className="row align-items-center mil-mb-30">
                        <div className="col-lg-6 mil-mb-30">
                            <h3 className="mil-up">{Data.title}</h3>
                        </div>
                        <div className="col-lg-6 mil-mb-30">
                            <div className="mil-adaptive-right mil-up">
                                <a href={Data.button.link} className="mil-link mil-dark mil-arrow-place">
                                    <span>{Data.button.label}</span>
                                    <ArrowIcon />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {posts.slice(0, Data.numOfItems).map((item: any, key: any) => (
                        <div className="col-lg-6" key={`blog-post-${key}`}>

                            <Link style={{ color: 'inherit' }} to={`/home/blog/blog_details/${item.id}`} className="mil-blog-card mil-mb-60">
                                <div className="mil-cover-frame mil-up">
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className="mil-post-descr">
                                    <div className="mil-labels mil-up mil-mb-30">
                                        <div className="mil-label mil-upper mil-accent">{item.category}</div>
                                        <div className="mil-label mil-upper">{item.date}</div>
                                    </div>
                                    <h4 className="mil-up mil-mb-30">{item.title}</h4>
                                    <p style={{ color: 'gray' }} className="mil-post-text mil-up mil-mb-30">{item.short}</p>
                                    <div className="mil-link mil-dark mil-arrow-place mil-up">
                                        <span>Read more</span>
                                        <ArrowIcon />
                                    </div>
                                </div>
                            </Link>

                        </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* popular end */}
        </>
    );
};

export default PopularPostsSection;