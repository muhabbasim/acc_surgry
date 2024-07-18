import PageBanner from 'src/Acc_landingpage/components/PageBanner'
import { Formik } from 'formik';
import ArrowIcon from "src/Acc_landingpage/layouts/svg-icons/Arrow";

export default function Contact() {
  return (
    <div>
      <PageBanner pageTitle={"Get in touch!"} breadTitle={"Contact"} anchorLabel={"Send message"} anchorLink={"#contact"} paddingBottom={1} align={"center"} />

      <div className="mil-map-frame mil-up">
          <div className="mil-map">
              <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d382.482825404447!2d39.78825908458124!3d21.379229260053933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c21a907f21a74b%3A0x4b2f0cce886135d7!2z2KfZhNij2YbYr9mE2LPZitipINiz2YbYqtix!5e0!3m2!1sen!2ssa!4v1720626201726!5m2!1sen!2ssa"
              
              // src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1396.5769090312324!2d-73.6519672!3d45.5673453!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91f8abc30e0ff%3A0xfc6d9cbb49022e9c!2sManoir%20Saint-Joseph!5e0!3m2!1sen!2sua!4v1685485811069!5m2!1sen!2sua" 
              // style={{"border": "0"}} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
              />
          </div>
      </div>

      <section id="contact">
            <div className="container mil-p-120-90">
                <h3 className="mil-center mil-up mil-mb-120">Let's <span className="mil-thin">Talk</span></h3>

                <Formik
                initialValues = {{ email: '', name: '', message: '' }}
                validate = { values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit = {( values, { setSubmitting } ) => {
                    const form = document.getElementById("contactForm");
                    const status = document.getElementById("contactFormStatus");
                    const data = new FormData();

                    data.append('name', values.name);
                    data.append('email', values.email);
                    data.append('message', values.message);

                    setSubmitting(false);
                }}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                <form onSubmit={handleSubmit} id="contactForm" action={''} className="row align-items-center">
                    <div className="col-lg-6 mil-up">
                        <input 
                            type="text" 
                            placeholder="What's your name"
                            name="name" 
                            required 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name} 
                        />
                    </div>
                    <div className="col-lg-6 mil-up">
                        <input 
                            type="email" 
                            placeholder="Your Email"
                            name="email"
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email} 
                        />
                    </div>
                    <div className="col-lg-12 mil-up">
                        <textarea 
                            placeholder="Tell us about our project"
                            name="message" 
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.message} 
                        />
                    </div>
                    <div style={{paddingTop: '50px'}} className="col-lg-8">
                      <p className="mil-up mil-mb-30"><span className="mil-accent">*</span> We promise not to disclose your personal information to third parties.</p>
                    </div>
                    <div style={{paddingTop: '50px'}} className="col-lg-4">
                        <div className="mil-adaptive-right mil-up mil-mb-30">
                            <button type="submit" className="mil-button mil-arrow-place">
                                <span>Send message</span>
                                <ArrowIcon />
                            </button>
                        </div>
                    </div>
                    <div className="form-status" id="contactFormStatus" />
                </form>
                )}
                </Formik>
            </div>
        </section>
    </div>
  )
}
