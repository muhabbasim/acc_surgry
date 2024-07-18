import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import PageBanner from 'src/Acc_landingpage/components/PageBanner'
import { blogCategories, blogData } from 'src/Acc_landingpage/data/data'

export default function BlogCat() {

  const cat = useLocation().pathname?.split('/')[4]
  const postData: any = blogData.filter((blog) => blog.category === cat)

  return (
    <div>
      <PageBanner pageTitle={`Puplication Category ${cat}`} breadTitle={postData?.title} anchorLabel={"Publications"} anchorLink={"#blog"} paddingBottom={1} />
      
      <section id="blog">
          <div className="container mil-p-120-120">
              <div className="row align-items-center mil-mb-30">
                  <div className="col-lg-4 mil-mb-30">
                      <h3 className="mil-up">Other categories:</h3>
                  </div>
                  <div className="col-lg-8 mil-mb-30">
                      <div className="mil-adaptive-right mil-up">

                          <ul className="mil-category-list">
                              {blogCategories.map((item, key) => (
                              <li key={`categories-item-${key}`}><Link  to={`/home/blog/blog_cat/${item.title}`} className={ item.title == cat ? "mil-active" : ""}>{item.title}</Link></li>
                              ))}
                              <li key={`categories-item-0`}><Link to="/home/blog">All categories</Link></li>
                          </ul>
                      </div>
                  </div>
              </div>
              <div className="row">
                  {postData.map((item: any, key: any) => (              
                  <div className="col-lg-12" key={`posts-item-${key}`}>

                      <a style={{ color: 'inherit'}} href={`/blog/${item.id}`} className="mil-blog-card mil-blog-card-hori mil-more mil-mb-60">
                          <div className="mil-cover-frame mil-up">
                              <img src={item.image} alt={item.title} />
                          </div>
                          <div className="mil-post-descr">
                              <div className="mil-labels mil-up mil-mb-30">
                                  <div className="mil-label mil-upper mil-accent">{item.category}</div>
                                  <div className="mil-label mil-upper">{item.date}</div>
                              </div>
                              <h4 className="mil-up mil-mb-30">{item.title}</h4>
                              <p className="mil-post-text mil-up mil-mb-30">{item.short}</p>
                              <div className="mil-link mil-dark mil-arrow-place mil-up">
                                  <span>Read more</span>
                              </div>
                          </div>
                      </a>

                  </div>
                  ))}
              </div>
          </div>
      </section>
    </div>
  )
}
