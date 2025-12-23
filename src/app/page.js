import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">🎨 DaisyUI + Tailwind CSS</h1>
          <p className="text-xl text-base-content/70">
            Testing DaisyUI components with light/dark themes
          </p>
        </div>

        {/* Theme Toggle Demo */}
        <div className="alert alert-info mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>DaisyUI themes are configured! Try switching between light and dark mode in your system settings.</span>
        </div>

        {/* Buttons Section */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <button className="btn btn-primary">Primary</button>
              <button className="btn btn-secondary">Secondary</button>
              <button className="btn btn-accent">Accent</button>
              <button className="btn btn-success">Success</button>
              <button className="btn btn-warning">Warning</button>
              <button className="btn btn-error">Error</button>
              <button className="btn btn-ghost">Ghost</button>
              <button className="btn btn-link">Link</button>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-primary text-primary-content">
            <div className="card-body">
              <h2 className="card-title">Primary Card</h2>
              <p>This card uses primary theme colors.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-sm">Action</button>
              </div>
            </div>
          </div>

          <div className="card bg-secondary text-secondary-content">
            <div className="card-body">
              <h2 className="card-title">Secondary Card</h2>
              <p>This card uses secondary theme colors.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-sm">Action</button>
              </div>
            </div>
          </div>

          <div className="card bg-accent text-accent-content">
            <div className="card-body">
              <h2 className="card-title">Accent Card</h2>
              <p>This card uses accent theme colors.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-sm">Action</button>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Badges</h2>
            <div className="flex flex-wrap gap-4">
              <div className="badge badge-primary">Primary</div>
              <div className="badge badge-secondary">Secondary</div>
              <div className="badge badge-accent">Accent</div>
              <div className="badge badge-success">Success</div>
              <div className="badge badge-warning">Warning</div>
              <div className="badge badge-error">Error</div>
              <div className="badge badge-ghost">Ghost</div>
              <div className="badge badge-outline">Outline</div>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="space-y-4 mb-8">
          <div className="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Success! Your Tailwind CSS + DaisyUI setup is working perfectly!</span>
          </div>

          <div className="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Warning: This is a test alert component!</span>
          </div>

          <div className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Error: This is just a demo, no actual errors!</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-base-content/60 mt-12">
          <p>✅ Tailwind CSS v3 + DaisyUI Configuration Complete</p>
          <p className="text-sm mt-2">All components are rendering correctly with theme support!</p>
        </div>
      </div>
    </div>
  );
}

