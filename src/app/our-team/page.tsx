import { 
  Users, 
  Code, 
  Palette, 
  Database, 
  Sparkles,
  Heart,
  ChevronRight
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Team | Care.IO",
  description: "Meet the dedicated team behind Care.IO - combining technology, empathy, and innovation to deliver trusted care solutions.",
};

const teamMembers = [
  {
    role: "Project Lead / Full-Stack Developer",
    description: "Responsible for system architecture, feature implementation, and overall project coordination.",
    icon: <Code size={32} />,
    color: "from-blue-500/10 to-blue-600/5",
    accent: "text-blue-600",
  },
  {
    role: "Frontend Developer",
    description: "Focused on user experience, responsive UI, accessibility, and modern design practices.",
    icon: <Palette size={32} />,
    color: "from-purple-500/10 to-purple-600/5",
    accent: "text-purple-600",
  },
  {
    role: "Backend Developer",
    description: "Manages APIs, database design, authentication, and secure data handling.",
    icon: <Database size={32} />,
    color: "from-emerald-500/10 to-emerald-600/5",
    accent: "text-emerald-600",
  },
  {
    role: "UI/UX Designer",
    description: "Ensures a clean, user-friendly, and trustworthy interface across all devices.",
    icon: <Sparkles size={32} />,
    color: "from-rose-500/10 to-rose-600/5",
    accent: "text-rose-600",
  },
];

export default function OurTeamPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-base-100">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-black uppercase tracking-widest border border-primary/10">
            <Users size={14} />
            The Team
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
            Meet <span className="text-primary italic">Our Team</span>
          </h1>
          <p className="text-xl text-base-content/50 font-medium max-w-2xl mx-auto leading-relaxed">
            At Care.IO, our team is driven by a shared mission—to make caregiving simple, secure, and accessible for everyone. We combine technology, empathy, and innovation to deliver trusted care solutions for families.
          </p>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-base-100">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative bg-base-100 rounded-[2rem] border border-base-200 p-8 shadow-xl shadow-base-content/5 hover:border-primary/20 hover:shadow-primary/5 transition-all"
            >
              <div className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center ${member.accent} mb-6 group-hover:scale-110 transition-transform shadow-inner`}>
                {member.icon}
              </div>
              <h3 className="text-lg font-black tracking-tight mb-3 leading-tight">{member.role}</h3>
              <p className="text-sm text-base-content/60 font-medium leading-relaxed">{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Statement */}
      <section className="max-w-5xl mx-auto px-6 pb-32 bg-base-100">
        <div className="bg-primary rounded-[3rem] p-10 md:p-16 text-primary-content text-center space-y-8 relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="absolute -top-10 -right-10 p-10 opacity-5 rotate-12">
            <Heart size={200} fill="currentColor" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black tracking-tight relative z-10 italic">
            Together, we are committed
          </h2>
          <p className="text-lg opacity-80 font-medium max-w-2xl mx-auto relative z-10 leading-relaxed">
            We are building a reliable caregiving platform that users can trust with their loved ones. Every feature, every line of code, and every design decision is made with your family's safety and comfort in mind.
          </p>
          <div className="pt-4 relative z-10">
            <Link href="/services">
              <button className="btn btn-lg bg-white text-primary border-none hover:bg-white/90 rounded-2xl px-10 font-black gap-3 shadow-xl">
                Explore Our Services
                <ChevronRight size={20} />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
