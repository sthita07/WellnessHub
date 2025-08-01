export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-primary via-accent to-secondary px-6">
      {/* Hero */}
      <div className="text-center max-w-3xl">
        {/* Brand Name */}
        <h1 className="text-6xl font-extrabold text-white mb-6 leading-tight tracking-wide drop-shadow-md">
          WellnessHub
        </h1>

        {/* Tagline */}
        <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
          Your space to track moods, reflect in journals, and focus on what
          matters — you.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-6 justify-center">
          <a
            href="/signup"
            className="bg-white text-primary font-semibold px-8 py-3 rounded-full shadow hover:bg-highlight transition duration-300"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-primary transition duration-300"
          >
            Log In
          </a>
        </div>
      </div>
    </div>
  );
}
