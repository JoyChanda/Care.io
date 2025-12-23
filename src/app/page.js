export default function Home() {
  return (
    <main className="min-h-screen bg-base-200 flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Welcome to <span className="text-primary">Care</span>
          <span className="text-secondary">.IO</span>
        </h1>
        <p className="text-xl md:text-2xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
          Professional and trusted care services for your loved ones. We provide
          baby care, elderly care, and sick care services with compassion and
          expertise.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <button className="btn btn-primary btn-lg px-8">Get Started</button>
          <button className="btn btn-outline btn-lg px-8">Learn More</button>
        </div>
      </div>
    </main>
  );
}
