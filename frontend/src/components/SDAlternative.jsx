import elevenlabsLogo from "../img/homePage/elevenlabs2.png";
import voicemodLogo from "../img/homePage/voicemod2.png";
import respeecherLogo from "../img/homePage/respeecher.png";
import murfLogo from "../img/homePage/murf.png";

const alternatives = [
  {
    left: { logo: elevenlabsLogo, name: "Elevenlabs" },
    right: { logo: voicemodLogo, name: "Voicemod" },
  },
  {
    left: { logo: elevenlabsLogo, name: "Elevenlabs" },
    right: { logo: respeecherLogo, name: "respeecher" },
  },
  {
    left: { logo: elevenlabsLogo, name: "Elevenlabs" },
    right: { logo: murfLogo, name: "Murf AI" },
  },
];

const SDAlternative = () => {
  return (
    <div className="bg-white rounded-lg shadow p-8 mt-8 mb-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">Elevenlab Comparison and Alternatives</h2>
      <div className="flex flex-col md:flex-row md:justify-between gap-8">
        {alternatives.map((alt, idx) => (
          <a
            key={idx}
            href="#"
            className="flex flex-col items-center flex-1 min-w-[200px] transition transform hover:scale-105 hover:shadow-lg rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E6B057]"
            tabIndex={0}
          >
            <div className="flex items-end gap-4 mb-2 w-full">
              <div className="flex flex-col items-center flex-1">
                <img src={alt.left.logo} alt={alt.left.name} className="h-16 md:h-24 object-contain mb-2" />
                <span className="block text-center text-sm text-black font-medium mt-1">{alt.left.name}</span>
              </div>
              <span className="font-bold text-lg mb-8 md:mb-10">VS</span>
              <div className="flex flex-col items-center flex-1">
                <img src={alt.right.logo} alt={alt.right.name} className="h-16 md:h-24 object-contain mb-2" />
                <span className="block text-center text-sm text-black font-medium mt-1">{alt.right.name}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SDAlternative;