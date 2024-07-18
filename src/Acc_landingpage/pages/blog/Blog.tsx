import { Link } from 'react-router-dom'
import PageBanner from 'src/Acc_landingpage/components/PageBanner'
import PaginatedBlog from 'src/Acc_landingpage/components/PaginatedBlog'
import Pagination from 'src/Acc_landingpage/components/Pagination'
import PopularPostsSection from 'src/Acc_landingpage/components/sections/PopularPosts'
import { blogCategories, blogData } from 'src/Acc_landingpage/data/data'


export default function Blog() {
  
  return (
    <div>
      <PageBanner pageTitle={"Exploring Pet World with us"} breadTitle={"Blog"} anchorLabel={"Publications"} anchorLink={"#blog"} paddingBottom={1} />
      <PopularPostsSection posts={blogData} />
      
      <section> 
        <div className="container mil-p-120-120">
          <div className="row align-items-center mil-mb-30">
              <div className="col-lg-4 mil-mb-30">
                  <h3 className="mil-up">Categories:</h3>
              </div>
              <div className="col-lg-8 mil-mb-30">
                  <div className="mil-adaptive-right mil-up">

                      <ul className="mil-category-list">
                          {blogCategories.map((item, key) => (
                          <li key={`categories-item-${key}`}><Link to={`/home/blog/blog_cat/${item.title}`}>{item.title}</Link></li>
                          ))}
                          <li><Link to="/home/blog" className="mil-active">All categories</Link></li>
                      </ul>
                  </div>
              </div>
          </div>
          <div className="row">
              <PaginatedBlog
                items={blogData}
              />
              
              <Pagination
                currentPage={1}
                totalItems={6}
                perPage={3}
                renderPageLink={(page: any) => `/blog/page/${page}`}
              />
          </div>
        </div>
      </section>
    </div>
  )
}
