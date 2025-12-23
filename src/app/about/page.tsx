import { 
  Users, 
  Target, 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  Heart,
  ChevronRight,
  Sparkles,
  Stethoscope,
  Smile,
  CheckCircle2
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Care.IO",
  description: "Learn more about Care.IO – a trusted caregiving platform for baby care, elderly care, and home assistance.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-base-100 selection:bg-primary/20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-black uppercase tracking-widest border border-primary/10">
            <Sparkles size={14} />
            Our Story
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
            Caring made <span className="text-primary italic">simple</span>, safe, and accessible.
          </h1>
          <p className="text-xl text-base-content/50 font-medium max-w-2xl mx-auto leading-relaxed">
            Care.IO is redefining the caregiving experience through transparency, trust, and professional excellence.
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Who We Are */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                <Users size={28} />
              </div>
              <h2 className="text-3xl font-black tracking-tight">Who We Are</h2>
            </div>
            <div className="space-y-6 text-lg text-base-content/60 font-medium leading-relaxed">
              <p>
                Care.IO is a trusted caregiving service platform designed to help families find reliable and professional care for their loved ones. From baby care to elderly and patient support, we ensure safe, transparent, and flexible service booking.
              </p>
              <p>
                Our platform connects users with verified caregivers, allowing them
                to book services based on location, duration, and personal needs —
                all from a single, easy-to-use interface.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-base-200/50 border border-base-300 text-sm font-bold">
                <CheckCircle2 size={16} className="text-success" />
                Verified Professionals
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-base-200/50 border border-base-300 text-sm font-bold">
                <CheckCircle2 size={16} className="text-success" />
                Trusted by 5k+ Families
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="bg-base-200/30 rounded-[3rem] p-8 md:p-12 border border-base-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-base-content/5 group-hover:text-primary/10 transition-colors">
              <Target size={120} />
            </div>
            
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shadow-inner">
                  <Target size={28} />
                </div>
                <h2 className="text-3xl font-black tracking-tight">Our Mission & Vision</h2>
              </div>
              
              <ul className="space-y-4">
                {[
                  { icon: <Heart size={18} />, text: "Make caregiving services accessible to everyone" },
                  { icon: <ShieldCheck size={18} />, text: "Build trust through secure and verified booking" },
                  { icon: <Sparkles size={18} />, text: "Deliver a smooth and user-friendly experience" },
                  { icon: <Stethoscope size={18} />, text: "Support families with dependable solutions" }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 p-4 rounded-2xl bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-primary mt-1">{item.icon}</span>
                    <span className="font-bold text-base-content/70">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black tracking-tight">Why Choose Care.IO?</h2>
          <p className="text-base-content/40 font-medium max-w-lg mx-auto italic">
            Setting the standard for excellence in home and family care.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {[
            { 
              title: "Trusted Caregivers", 
              desc: "Background checked and expert verified professionals.",
              icon: <ShieldCheck size={28} />,
              color: "text-blue-500",
              bgColor: "bg-blue-500/10"
            },
            { 
              title: "Flexible Booking", 
              desc: "Book from 1 day to a month with easy scheduling.",
              icon: <Clock size={28} />,
              color: "text-amber-500",
              bgColor: "bg-amber-500/10"
            },
            { 
              title: "Transparent Pricing", 
              desc: "No hidden fees. Flat rates for all care services.",
              icon: <CreditCard size={28} />,
              color: "text-emerald-500",
              bgColor: "bg-emerald-500/10"
            },
            { 
              title: "Secure Platform", 
              desc: "Encrypted payments and privacy protection.",
              icon: <Smile size={28} />,
              color: "text-rose-500",
              bgColor: "bg-rose-500/10"
            }
          ].map((item, i) => (
            <div
              key={i}
              className="group relative bg-base-100 rounded-[2rem] border border-base-200 p-8 shadow-xl shadow-base-content/5 hover:border-primary/20 hover:shadow-primary/5 transition-all"
            >
              <div className={`h-16 w-16 rounded-2xl ${item.bgColor} ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-black tracking-tight mb-3 italic">{item.title}</h3>
              <p className="text-sm text-base-content/40 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-primary rounded-[3rem] p-10 md:p-16 text-primary-content text-center space-y-8 relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="absolute -top-10 -right-10 p-10 opacity-5 rotate-12">
            <Heart size={200} fill="currentColor" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black tracking-tight relative z-10 italic">
            Ready to find the perfect caregiver?
          </h2>
          <p className="text-lg opacity-80 font-medium max-w-xl mx-auto relative z-10 leading-relaxed">
            Join thousands of families who trust Care.IO for their daily caregiving needs.
          </p>
          <div className="pt-4 relative z-10">
            <a 
              href="/services" 
              className="btn btn-lg bg-white text-primary border-none hover:bg-white/90 rounded-2xl px-10 font-black gap-3 shadow-xl"
            >
              Browse Services
              <ChevronRight size={20} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
