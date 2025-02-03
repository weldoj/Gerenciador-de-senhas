import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-800">
      {/* Background curved shape */}
      <div className="absolute -bottom-36 h-[40vh] w-[102vw] rounded-t-[100%] bg-[#87B8BD]/80" />

      {/* Content */}
      <div className="relative mx-auto px-4 text-center">
        {/* Logo */}
        <div className="relative mx-auto mb-6 h-[239px] w-[247px]">
          <Image
            width={357}
            height={349}
            src={"/logo.png"}
            alt="Vaultify Logo"
            className="h-full w-full animate-pulse object-contain"
          />
          <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl" />
        </div>

        {/* Text Content */}
        <h1 className="mb-4 font-mono text-4xl font-bold text-white md:text-5xl [text-shadow:_-3_2_5px_#00eaff,_0_0_0px_#00eaff,_0_0_0px_#00eaff]">
          Vaultify
        </h1>

        <h2 className="mb-6 text-lg text-white md:text-xl">
          Lorem ipsum dolor
        </h2>

        <p className="mx-auto mb-12 flex max-w-[920px] text-balance text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ante
          tellus. Aenean quis porta sem. Orci varius natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus. Nunc elementum
          convallis felis, eu volutpat odio semper a.
        </p>

        {/* Login Button */}
        <Link className="rounded-full bg-white px-20 py-3 font-medium text-slate-800 shadow-lg transition-colors duration-200 hover:bg-teal-50 hover:shadow-xl hover:shadow-teal-500/20" href={"/login"}>
          Fazer Login
        </Link>
      </div>
    </div>
  );
}
