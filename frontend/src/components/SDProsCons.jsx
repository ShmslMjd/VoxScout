import React, { useState } from "react";
import { PlusCircle, MinusCircle } from "lucide-react";
import avatar1 from "../img/softwareDetailPage/av1.jpg";
import avatar2 from "../img/softwareDetailPage/av2.jpg";
import avatar3 from "../img/softwareDetailPage/av3.jpg";
import avatar4 from "../img/softwareDetailPage/av4.jpg";

const pros = [
  {
    title: "Natural-sounding voice synthesis",
    percent: "97% positive reviews out of 210 reviews",
    detail:
      "Elevenlabs delivers highly realistic AI-generated voices, making audio content engaging and lifelike for podcasts, audiobooks, and more.",
  },
  {
    title: "Fast and scalable API",
    percent: "95% positive reviews out of 180 reviews",
    detail:
      "Developers praise the robust API, which allows for quick integration and high-volume audio generation with minimal latency.",
  },
  {
    title: "Multilingual support",
    percent: "93% positive reviews out of 150 reviews",
    detail:
      "Users appreciate support for multiple languages and accents, enabling global reach for their audio projects.",
  },
  {
    title: "Custom voice cloning",
    percent: "92% positive reviews out of 120 reviews",
    detail:
      "The platform allows users to create custom AI voices, which is valuable for branding and unique content creation.",
  },
  {
    title: "Intuitive web interface",
    percent: "90% positive reviews out of 100 reviews",
    detail:
      "The dashboard is user-friendly, making it easy for non-technical users to generate and manage audio files.",
  },
];

const cons = [
  {
    title: "Limited free tier",
    percent: "35% negative reviews out of 80 reviews",
    detail:
      "Some users feel the free plan is too restrictive, limiting the amount of audio that can be generated before requiring payment.",
  },
  {
    title: "Occasional pronunciation errors",
    percent: "28% negative reviews out of 65 reviews",
    detail:
      "There are occasional mispronunciations or unnatural intonations, especially with uncommon words or names.",
  },
  {
    title: "Voice cloning approval delays",
    percent: "22% negative reviews out of 50 reviews",
    detail:
      "Custom voice cloning requests sometimes take longer than expected to be approved and processed.",
  },
  {
    title: "No offline mode",
    percent: "18% negative reviews out of 40 reviews",
    detail:
      "The service requires an internet connection, which can be inconvenient for users needing offline access.",
  },
  {
    title: "Pricing for high-volume use",
    percent: "15% negative reviews out of 30 reviews",
    detail:
      "Some users mention that costs can add up quickly for large-scale or commercial projects.",
  },
];

const AccordionItem = ({ item, open, onClick, iconColor }) => (
  <div className="border-b last:border-b-0">
    <button
      className="flex items-center w-full py-3 text-left focus:outline-none"
      onClick={onClick}
      aria-expanded={open}
    >
      {open ? (
        <MinusCircle className={`mr-2 ${iconColor}`} />
      ) : (
        <PlusCircle className={`mr-2 ${iconColor}`} />
      )}
      <span className="font-semibold">{item.title}</span>
      <span className="ml-2 text-xs text-gray-500 font-normal">{item.percent}</span>
    </button>
    <div
      className={`pl-8 text-gray-700 text-sm transition-all duration-300 overflow-hidden ${
        open ? "max-h-40 opacity-100 pb-3" : "max-h-0 opacity-0"
      }`}
    >
      {item.detail}
    </div>
  </div>
);

const SDProsCons = () => {
  const [openPro, setOpenPro] = useState(0);
  const [openCon, setOpenCon] = useState(0);

  return (
     <div className='bg-white max-w-7xl mx-auto rounded-lg shadow p-8 mt-8 px-2 md:px-8'>
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold mb-4">Pros and Cons</h2>
                <div className="avatar-group -space-x-6 rtl:space-x-reverse py-4">
                    <div className="avatar">
                        <div className="w-12">
                        <img src={avatar1} />
                        </div>
                    </div>
                    <div className="avatar">
                        <div className="w-12">
                        <img src={avatar2} />
                        </div>
                    </div>
                    <div className="avatar">
                        <div className="w-12">
                        <img src={avatar3} />
                        </div>
                    </div>
                    <div className="avatar">
                        <div className="w-12">
                        <img src={avatar4} />
                        </div>
                    </div>
                </div>
                <p className="text-gray-700 mb-8">
                    Our team analyzed Elevenlabs user reviews to determine the most often cited pros and cons. Here’s what users like and dislike about Elevenlabs, based on real feedback from the community.
                </p>
                <div className="bg-white rounded-lg p-8 flex flex-col md:flex-row gap-8">
                    {/* Pros */}
                    <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4 flex items-center text-green-600">
                        <PlusCircle className="mr-2" /> Pros rated by users
                    </h3>
                    <div className="divide-y">
                        {pros.map((item, idx) => (
                        <AccordionItem
                            key={item.title}
                            item={item}
                            open={openPro === idx}
                            onClick={() => setOpenPro(openPro === idx ? -1 : idx)}
                            iconColor="text-green-600"
                        />
                        ))}
                    </div>
                    </div>
                    {/* Divider */}
                    <div className="w-full md:w-px bg-gray-200 my-6 md:my-0 md:h-auto" />
                    {/* Cons */}
                    <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4 flex items-center text-red-500">
                        <MinusCircle className="mr-2" /> Cons rated by users
                    </h3>
                    <div className="divide-y">
                        {cons.map((item, idx) => (
                        <AccordionItem
                            key={item.title}
                            item={item}
                            open={openCon === idx}
                            onClick={() => setOpenCon(openCon === idx ? -1 : idx)}
                            iconColor="text-red-500"
                        />
                        ))}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SDProsCons;