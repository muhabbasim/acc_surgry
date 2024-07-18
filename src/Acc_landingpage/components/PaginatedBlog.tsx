import { Link } from "react-router-dom";


const PaginationPage = ({ items }: any) => {
    return (
      <>
        {items.map((item: any, index: any) => (
        <div className="col-lg-12" key={`post-${index}`}>

            <Link style={{color:'inherit'}} to={`/home/blog/blog_details/${item.id}`} className="mil-blog-card mil-blog-card-hori mil-more mil-mb-60">
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
                    </div>
                </div>
            </Link>

        </div>
        ))}
      </>
    );
  };
  export default PaginationPage;
  