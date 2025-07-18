import React, { useState } from "react";
import { PlusCircle, MinusCircle } from "lucide-react";
import avatar1 from "../img/softwareDetailPage/av1.jpg";
import avatar2 from "../img/softwareDetailPage/av2.jpg";
import avatar3 from "../img/softwareDetailPage/av3.jpg";
import avatar4 from "../img/softwareDetailPage/av4.jpg";

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
      <span className="ml-2 text-xs text-gray-500 font-normal">
        {item.upvotes} upvotes
      </span>
    </button>
    <div
      className={`pl-8 text-gray-700 text-sm transition-all duration-300 overflow-hidden ${
        open ? "max-h-40 opacity-100 pb-3" : "max-h-0 opacity-0"
      }`}
    >
      {item.description}
    </div>
  </div>
);

const SDProsCons = ({ software }) => {
  const [openPro, setOpenPro] = useState(0);
  const [openCon, setOpenCon] = useState(0);

  const pros = software?.prosAndCons?.pros || [];
  const cons = software?.prosAndCons?.cons || [];

  return (
    <div className='bg-white max-w-7xl mx-auto rounded-lg shadow p-8 mt-8 px-2 md:px-8'>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold mb-4">Pros and Cons</h2>
          <div className="avatar-group -space-x-6 rtl:space-x-reverse py-4">
            <div className="avatar">
              <div className="w-12">
                <img src={avatar1} alt="Reviewer 1" />
              </div>
            </div>
            <div className="avatar">
              <div className="w-12">
                <img src={avatar2} alt="Reviewer 2" />
              </div>
            </div>
            <div className="avatar">
              <div className="w-12">
                <img src={avatar3} alt="Reviewer 3" />
              </div>
            </div>
            <div className="avatar">
              <div className="w-12">
                <img src={avatar4} alt="Reviewer 4" />
              </div>
            </div>
          </div>
          <p className="text-gray-700 mb-8">
            Our team analyzed {software?.name} user reviews to determine the most often cited pros and cons. 
            Here's what users like and dislike about {software?.name}, based on real feedback from the community.
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
                    key={idx}
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
                    key={idx}
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