import { useState } from 'react';
import CPSoftwareSelection from '../components/CPSoftwareSelection';
import Navbar from '../components/Navbar';
import elevenlabsLogo from '../img/homePage/elevenlabs.png';
import voicemodLogo from '../img/homePage/voicemod.png';
import respeecherLogo from '../img/homePage/respeecher.png';
import murfLogo from '../img/homePage/murf.png';

// Dummy data for testing
const SOFTWARE_LIST = [
  {
    id: 1,
    name: "Elevenlabs",
    logo: elevenlabsLogo,
    rating: 4.7,
    reviews: 6797,
    platforms: ["Windows", "Mac", "Mobile"],
    price: "Free",
    summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    id: 2,
    name: "Respeecher",
    logo: respeecherLogo,
    rating: 4.2,
    reviews: 120,
    platforms: ["Windows", "Mac"],
    price: "RM10",
    summary: "It is a long established fact that a reader will be distracted by the readable content."
  },
  {
    id: 3,
    name: "Voicemod",
    logo: voicemodLogo,
    rating: 4.5,
    reviews: 3500,
    platforms: ["Windows"],
    price: "$15",
    summary: "There are many variations of passages of Lorem Ipsum available."
  },
  {
    id: 4,
    name: "Murf AI",
    logo: murfLogo,
    rating: 4.3,
    reviews: 2100,
    platforms: ["Windows", "Mac"],
    price: "$20",
    summary: "The standard chunk of Lorem Ipsum used since the 1500s."
  }
];

const ComparePage = () => {
  // Initialize with first two software items
  const [selected, setSelected] = useState([SOFTWARE_LIST[0], SOFTWARE_LIST[1]]);

  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar />
      <CPSoftwareSelection 
        selected={selected}
        setSelected={setSelected}
        softwareList={SOFTWARE_LIST}
      />
    </div>
  );
};

export default ComparePage;