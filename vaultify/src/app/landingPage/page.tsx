export default function LandingPage() {
    return (
      <div className="min-h-screen relative bg-slate-800 overflow-hidden flex items-center justify-center">
        {/* Background curved shape */}
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-teal-700/30 rounded-t-[100%]" />
  
        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          {/* Logo */}
          <div className="mb-6 relative w-32 h-32 mx-auto">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZIfh6Mqh0Kg34NwzK2BwmWWXoNYNjC.png"
              alt="Vaultify Logo"
              className="w-full h-full object-contain animate-pulse"
            />
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl" />
          </div>
  
          {/* Text Content */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-mono">Vaultify</h1>
  
          <h2 className="text-lg md:text-xl text-teal-300 mb-6">Lorem ipsum dolor</h2>
  
          <p className="text-gray-300 mb-12 max-w-xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ante tellus. Aenean quis porta sem. Orci
            varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc elementum convallis
            felis, eu volutpat odio semper a.
          </p>
  
          {/* Login Button */}
          <button
            className="bg-white text-slate-800 px-8 py-3 rounded-full font-medium 
                           hover:bg-teal-50 transition-colors duration-200
                           shadow-lg hover:shadow-xl hover:shadow-teal-500/20"
          >
            Fazer Login
          </button>
        </div>
      </div>
    )
  }
  
  