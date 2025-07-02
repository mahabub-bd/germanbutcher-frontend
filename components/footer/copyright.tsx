const Copyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="py-10 md:mb-0 mb-15 md:py-8 border-t-4 border-[#deb149] bg-gradient-to-r from-black/90 via-black/90 to-black/90 backdrop-blur-sm text-white">
      <div className=" container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-6">
        <p className="text-red-100 text-xs md:text-sm">
          © {currentYear} German Butcher. All rights reserved.
        </p>
        <div className="flex space-x-2 md:space-x-4 mt-3 md:mt-0">
          {["Terms & Conditions", "Privacy Policy"].map((text, index) => (
            <button
              key={index}
              className="relative px-2 md:px-6 py-1.5 md:py-2 text-xs md:text-sm text-red-100 border border-white/20 rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-[#c70909] hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-[#c70909]/20 group overflow-hidden"
            >
              <span className="relative z-10">{text}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#c70909]/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Copyright;
