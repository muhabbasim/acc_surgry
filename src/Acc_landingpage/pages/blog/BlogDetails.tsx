import { useLocation } from 'react-router'
import PageBanner from 'src/Acc_landingpage/components/PageBanner'
import { blogData } from 'src/Acc_landingpage/data/data'

export default function BlogDetails() {

  const blogId = useLocation().pathname?.split('/')[4]
  const blog = blogData.find((item: any) => (item.id).toString() === blogId )

  return (
    <div>
      <PageBanner pageTitle={blog?.title} breadTitle={blog?.title} align={"center"} headingSize={2} />

      <section id="blog">
          <div className="container mil-p-120-90">
              <div className="row justify-content-center">
                  <div className="col-lg-12">

                      <div className="mil-image-frame mil-horizontal mil-up">
                          <img src={blog?.image} alt={blog?.title} className="mil-scale" data-value-1=".90" data-value-2="1.15" />
                      </div>
                      <div className="mil-info mil-up mil-mb-90">
                          <div>Category: &nbsp;<span className="mil-dark">{blog?.category}</span></div>
                          <div>Date: &nbsp;<span className="mil-dark"></span>{blog?.date}</div>
                          <div>Author: &nbsp;<span className="mil-dark">{blog?.author}</span></div>
                      </div>

                  </div>
                  <div className="col-lg-8">

                    <div className="mil-text mil-up mil-mb-60">{blog?.short}</div>
                    
                    {typeof blog?.gallery != "undefined" &&
                      <>
                    
                          <div className="row">
                              {blog?.gallery.map((item, key) => (
                              <div className="col-lg-6" key={`gallery-item-${key}`}>

                                  <div className="mil-image-frame mil-horizontal mil-up mil-mb-30">
                                      <img src={item.img} alt={item.img} />
                                  </div>

                              </div>
                              ))}
                          </div>
                      </>
                    }
                    <div className="mil-text mil-up mil-mb-60">{blog?.short}</div>
                      
                  </div>
              </div>
          </div>
      </section>
    </div>
  )
}
