import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  Sparkles,
  ChevronRight,
  HeadphonesIcon
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Care.IO",
  description: "Contact Care.IO for support, service inquiries, or feedback. We're here to help you find the best care.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-base-100 selection:bg-primary/20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-1/2 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-black uppercase tracking-widest border border-primary/10">
            <HeadphonesIcon size={14} />
            Support Center
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
            How can we <br />
            <span className="text-primary italic">help you</span> today?
          </h1>
          <p className="text-xl text-base-content/50 font-medium max-w-2xl mx-auto leading-relaxed">
            Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          
          {/* Contact Information */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-black tracking-tight italic">Get in Touch</h2>
              <p className="text-lg text-base-content/60 font-medium leading-relaxed">
                Whether you need help with booking, have a service inquiry, or want to share feedback, feel free to contact us. We usually respond within 24 hours.
              </p>
            </div>

            <div className="grid gap-6">
              {[
                { 
                  icon: <Mail className="text-primary" size={24} />, 
                  label: "Email Us", 
                  value: "support@careio.com", 
                  desc: "Our friendly team is here to help." 
                },
                { 
                  icon: <Phone className="text-primary" size={24} />, 
                  label: "Call Us", 
                  value: "+880 1XXXXXXXXX", 
                  desc: "Sun-Thu from 9am to 6pm." 
                },
                { 
                  icon: <MapPin className="text-primary" size={24} />, 
                  label: "Visit Us", 
                  value: "Dhaka, Bangladesh", 
                  desc: "Come say hello at our HQ." 
                },
                { 
                  icon: <Clock className="text-primary" size={24} />, 
                  label: "Working Hours", 
                  value: "9:00 AM – 6:00 PM", 
                  desc: "Sunday – Thursday" 
                }
              ].map((item, i) => (
                <div key={i} className="group p-6 rounded-[2rem] bg-base-200/50 border border-base-200 hover:bg-base-100 hover:shadow-xl hover:shadow-base-content/5 transition-all flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-base-100 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-widest text-base-content/40 mb-1">{item.label}</h4>
                    <p className="text-xl font-bold text-base-content mb-1">{item.value}</p>
                    <p className="text-sm text-base-content/50 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 blur-[100px] -z-10 rounded-full" />
            <div className="bg-base-100 rounded-[3rem] p-8 md:p-12 border border-base-300 shadow-2xl space-y-8">
              <div className="space-y-2">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                  <MessageSquare size={24} />
                </div>
                <h3 className="text-3xl font-black tracking-tight">Send a message</h3>
                <p className="text-base-content/50 font-medium">Have a specific inquiry? Fill out the form below.</p>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-base-content/40 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Your name" 
                      className="input input-lg input-bordered w-full rounded-2xl font-bold focus:ring-4 focus:ring-primary/10 transition-all bg-base-200/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-base-content/40 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="you@example.com" 
                      className="input input-lg input-bordered w-full rounded-2xl font-bold focus:ring-4 focus:ring-primary/10 transition-all bg-base-200/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-base-content/40 ml-1">Message Subject</label>
                  <select 
                    defaultValue="default"
                    className="select select-lg select-bordered w-full rounded-2xl font-bold focus:ring-4 focus:ring-primary/10 transition-all bg-base-200/50"
                  >
                    <option value="default" disabled>Select a subject</option>
                    <option>Service Inquiry</option>
                    <option>Account Support</option>
                    <option>Billing Question</option>
                    <option>Partnership</option>
                    <option>Feedback</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-base-content/40 ml-1">Your Message</label>
                  <textarea 
                    rows={4} 
                    placeholder="Tell us how we can help..." 
                    className="textarea textarea-lg textarea-bordered w-full rounded-2xl font-medium focus:ring-4 focus:ring-primary/10 transition-all bg-base-200/50"
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-block h-16 rounded-2xl text-lg font-black shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all gap-3 group"
                >
                  Send Message
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>

              <div className="pt-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-base-content/30 italic">
                <Sparkles size={12} />
                24/7 Security & Privacy Guaranteed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map/Trust Banner */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
         <div className="rounded-[3rem] bg-gradient-to-br from-primary to-secondary p-12 text-center text-primary-content space-y-8 relative overflow-hidden">
            <div className="absolute -top-10 -left-10 p-10 opacity-5 -rotate-12">
               <MapPin size={200} fill="currentColor" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight italic relative z-10">Care.IO is available everywhere in Bangladesh</h2>
            <p className="text-lg opacity-80 font-medium max-w-2xl mx-auto relative z-10">
               Our network of verified caregivers spans across all major divisions. From Dhaka to Sylhet, we bring professional care right to your doorstep.
            </p>
            <div className="pt-4 relative z-10">
               <button 
                 className="inline-flex items-center gap-2 btn btn-lg bg-white border-none hover:bg-white/90 rounded-2xl px-12 font-black shadow-xl text-blue-600"
               >
                  Check Coverage
                  <ChevronRight size={20} />
               </button>
            </div>
         </div>
      </section>
    </main>
  );
}
