import { Baby, Accessibility, Stethoscope, ArrowLeft, CheckCircle2, ShieldCheck, Clock, CreditCard, Search } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";

type Props = {
  params: Promise<{ service_id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { service_id } = await params;
  const serviceName = service_id.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return {
    title: `${serviceName} | Care.IO`,
    description: `Trusted ${serviceName} service for your loved ones. Professional, safe, and compassionate caregiving.`,
  };
}

const serviceMap: Record<string, any> = {
  "baby-care": {
    name: "Baby Care",
    price: 800,
    description: "Professional babysitting service ensuring safety and care for your little ones. Our caregivers are trained in infant safety and early childhood development.",
    icon: <Baby className="w-12 h-12" />,
    color: "from-blue-500/10 to-blue-600/5",
    accent: "text-blue-600",
    features: ["Certified Baby Specialists", "Safety First Approach", "Activity Logging", "Emergency Response Ready"]
  },
  "elderly-care": {
    name: "Elderly Care",
    price: 1000,
    description: "Compassionate elderly care with trained caregivers who provide assistance with daily activities, medication management, and emotional support.",
    icon: <Accessibility className="w-12 h-12" />,
    color: "from-emerald-500/10 to-emerald-600/5",
    accent: "text-emerald-600",
    features: ["Medication Management", "Mobility Assistance", "Companionship", "Health Monitoring"]
  },
  "sick-care": {
    name: "Sick Care",
    price: 1200,
    description: "Special care service for sick patients at home. Our caregivers follow doctor instructions and provide professional support during recovery.",
    icon: <Stethoscope className="w-12 h-12" />,
    color: "from-rose-500/10 to-rose-600/5",
    accent: "text-rose-600",
    features: ["Recovery Support", "Vitals Checking", "Basic Nursing Care", "Appointment Assistance"]
  },
};

export default async function ServiceDetail({ params }: Props) {
  const { service_id } = await params;
  
  // Requirement Match: Login check (Redirect to login if token is missing)
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/auth/login");
  }

  const service = serviceMap[service_id];

  if (!service) {
    return (
      <main className="min-h-[80vh] flex flex-col items-center justify-center p-10 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-base-200 flex items-center justify-center text-base-content/20">
          <Search size={48} />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold italic">Service Not Found</h1>
          <p className="text-base-content/50 max-w-xs mx-auto">
            We couldn't find the care service you're looking for. It might have been moved or removed.
          </p>
        </div>
        <Link href="/">
          <button className="btn btn-primary px-8">Return to Homepage</button>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-[80vh] flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full">
        {/* Breadcrumbs / Back navigation */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-base-content/50 hover:text-primary transition-colors mb-10 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Services
        </Link>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-3 space-y-8">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center ${service.accent} shadow-inner`}>
              {service.icon}
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-base-content">
                {service.name}
              </h1>
              <p className="text-lg text-base-content/70 leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pb-8">
              {service.features.map((feature: string, i: number) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-base-200/50 border border-base-content/5 group hover:bg-base-200 transition-colors">
                  <CheckCircle2 size={20} className="text-primary" />
                  <span className="text-sm font-semibold">{feature}</span>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 space-y-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <ShieldCheck className="text-primary" size={24} />
                Trust & Safety
              </h3>
              <p className="text-sm text-base-content/60 leading-relaxed">
                All our caregivers are thoroughly vetted, background checked, and professionally trained to provide the best care possible. Your family's safety is our number one priority.
              </p>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 p-8 rounded-[2rem] bg-base-100 border border-base-300 shadow-2xl space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-base-content/40">Service Charge</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-primary">৳{service.price}</span>
                  <span className="text-base-content/50 font-medium">/ day</span>
                </div>
              </div>

              <div className="space-y-4 py-6 border-y border-base-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-base-content/70">
                    <Clock size={16} /> 
                    Duration
                  </span>
                  <span className="font-bold">24 Hours / Day</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-base-content/70">
                    <CreditCard size={16} /> 
                    Payment Method
                  </span>
                  <span className="font-bold">Post-Service</span>
                </div>
              </div>

              <div className="space-y-4">
                <Link href={`/booking/${service_id}`} className="block">
                  <button className="btn btn-primary btn-block h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                    Book This Service
                  </button>
                </Link>
                <p className="text-[11px] text-center text-base-content/40 font-medium">
                  By clicking "Book This Service", you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
