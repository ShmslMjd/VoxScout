import { useState } from 'react';
import CPSoftwareSelection from '../components/CPSoftwareSelection';
import Navbar from '../components/Navbar';
import elevenlabsLogo from '../img/homePage/elevenlabs.png';
import voicemodLogo from '../img/homePage/voicemod.png';
import respeecherLogo from '../img/homePage/respeecher.png';
import murfLogo from '../img/homePage/murf.png';
import CPSummary from '../components/CPSummary';
import CPFeatures from '../components/CPFeatures';
import CPPricing from '../components/CPPricing';
import CPReviews from '../components/CPReviews';
import avatar1 from "../img/softwareDetailPage/av1.jpg";
import avatar2 from "../img/softwareDetailPage/av2.jpg";
import avatar3 from "../img/softwareDetailPage/av3.jpg";
import avatar4 from "../img/softwareDetailPage/av4.jpg";
import Footer from '../components/Footer';

// Dummy data for testing
const SOFTWARE_LIST = [
  {
    id: 1,
    name: "Elevenlabs",
    logo: elevenlabsLogo,
    rating: 4.7,
    totalReviews: 6797,
    ratingDistribution: {
      5: 4500,
      4: 1500,
      3: 500,
      2: 200,
      1: 97
    },
    topReviews: [
      {
        id: 1,
        author: {
          name: "Jonas Sousa",
          role: "UI designer",
          avatar: avatar1
        },
        rating: 4,
        date: "2023-12-01",
        text: "Great voice synthesis quality and easy to use interface"
      },
      {
        id: 2,
        author: {
          name: "Isabela Silveira",
          role: "Desenvolvedora",
          avatar: avatar2
        },
        rating: 5,
        date: "2023-11-28",
        text: "Perfect for my development needs, great API integration"
      },
      {
        id: 3,
        author: {
          name: "Diego Curumim",
          role: "Desenvolvedora",
          avatar: avatar3
        },
        rating: 4,
        date: "2023-11-25",
        text: "Excellent features but pricing could be better"
      },
      {
        id: 4,
        author: {
          name: "Sula Miranda Silva",
          role: "UI designer",
          avatar: avatar4
        },
        rating: 4,
        date: "2023-11-20",
        text: "The voice quality is impressive, good UI/UX"
      }
    ],
    platforms: ["Windows", "Mac", "Mobile"],
    pricing: {
      hasFreeVersion: true,
      hasFreeTrialPeriod: true,
      freeTrialDays: 14,
      tiers: [
        {
          name: "Free",
          price: "Free",
          billingPeriod: "month"
        },
        {
          name: "Creator",
          price: "$15",
          billingPeriod: "month"
        },
        {
          name: "Professional",
          price: "$30",
          billingPeriod: "month"
        }
      ]
    },
    summary: "Eleven is simply dummy text of the printing and typesetting industry.",
    features: [
      "Real-time voice changing",
      "Text-to-speech (TTS)",
      "Mobile compatibility (iOS/Android)",
      "Custom voice creation",
      "Multi-language support"
    ]
  },
  {
    id: 2,
    name: "Respeecher",
    logo: respeecherLogo,
    rating: 4.2,
    totalReviews: 120,
    ratingDistribution: {
      5: 50,
      4: 40,
      3: 20,
      2: 8,
      1: 2
    },
    topReviews: [
      {
        id: 1,
        author: {
          name: "Maria Oliveira",
          role: "Product Manager",
          avatar: avatar1
        },
        rating: 4,
        date: "2023-11-30",
        text: "Good voice cloning features, needs more languages"
      },
      {
        id: 2,
        author: {
          name: "Carlos Silva",
          role: "Marketing Specialist",
          avatar: avatar2
        },
        rating: 5,
        date: "2023-11-27",
        text: "Impressive quality and fast processing times"
      }
    ],
    platforms: ["Windows", "Mac"],
    pricing: {
      hasFreeVersion: false,
      hasFreeTrialPeriod: true,
      freeTrialDays: 7,
      tiers: [
        {
          name: "Basic",
          price: "RM10",
          billingPeriod: "month"
        },
        {
          name: "Pro",
          price: "RM30",
          billingPeriod: "month"
        }
      ]
    },
    summary: "Rees is a long established fact that a reader will be distracted by the readable content.",
    features: [
      "Text-to-speech (TTS)",
      "Voice cloning / voice synthesis",
      "Custom voice creation"
    ]
  },
  {
    id: 3,
    name: "Voicemod",
    logo: voicemodLogo,
    rating: 4.5,
    totalReviews: 3500,
    ratingDistribution: {
      5: 2000,
      4: 1000,
      3: 300,
      2: 150,
      1: 50
    },
    topReviews: [
      {
        id: 1,
        author: {
          name: "Lucas Rocha",
          role: "Sound Engineer",
          avatar: avatar1
        },
        rating: 5,
        date: "2023-11-29",
        text: "Best voice modulation software I've used!"
      },
      {
        id: 2,
        author: {
          name: "Fernanda Costa",
          role: "Content Creator",
          avatar: avatar2
        },
        rating: 4,
        date: "2023-11-26",
        text: "Very good, but I expected more voice options"
      }
    ],
    platforms: ["Windows"],
    pricing: {
      hasFreeVersion: false,
      hasFreeTrialPeriod: false,
      tiers: [
        {
          name: "Basic",
          price: "$15",
          billingPeriod: "month"
        },
        {
          name: "Pro",
          price: "$25",
          billingPeriod: "month"
        },
        {
          name: "Enterprise",
          price: "Custom",
          billingPeriod: "year"
        }
      ]
    },
    summary: "Voice are many variations of passages of Lorem Ipsum available.",
    features: [
      "Real-time voice changing",
      "Voice cloning / voice synthesis",
      "Character or celebrity voices"
    ]
  },
  {
    id: 4,
    name: "Murf AI",
    logo: murfLogo,
    rating: 4.3,
    totalReviews: 2100,
    ratingDistribution: {
      5: 1200,
      4: 600,
      3: 200,
      2: 80,
      1: 20
    },
    topReviews: [
      {
        id: 1,
        author: {
          name: "Roberto Almeida",
          role: "AI Researcher",
          avatar: avatar1
        },
        rating: 4,
        date: "2023-11-30",
        text: "Great potential, looking forward to more updates"
      },
      {
        id: 2,
        author: {
          name: "Patricia Santos",
          role: "Voice Actor",
          avatar: avatar2
        },
        rating: 5,
        date: "2023-11-27",
        text: "Amazing quality, very realistic voices"
      }
    ],
    platforms: ["Windows", "Mac"],
    pricing: {
      hasFreeVersion: false,
      hasFreeTrialPeriod: true,
      freeTrialDays: 30,
      tiers: [
        {
          name: "Basic",
          price: "$20",
          billingPeriod: "month"
        },
        {
          name: "Pro",
          price: "$40",
          billingPeriod: "month"
        },
        {
          name: "Enterprise",
          price: "Custom",
          billingPeriod: "year"
        }
      ]
    },
    summary: "Murf standard chunk of Lorem Ipsum used since the 1500s.",
    features: [
      "Real-time voice changing",
      "Text-to-speech (TTS)",
      "Mobile compatibility (iOS/Android)",
      "Voice cloning / voice synthesis",
      "Custom voice creation",
      "Multi-language support"
    ]
  }
];

const ComparePage = () => {
  // Initialize with Elevenlabs and Respeecher
  const [selected, setSelected] = useState(() => {
    // Find Elevenlabs and Respeecher from SOFTWARE_LIST
    const initialSoftware = SOFTWARE_LIST.filter(
      software => software.name === "Elevenlabs" || software.name === "Respeecher"
    );
    return initialSoftware;
  });

  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar />
      <CPSoftwareSelection 
        selected={selected}
        setSelected={setSelected}
        softwareList={SOFTWARE_LIST}
      />
      <div id="summary">
        <CPSummary selected={selected} />
      </div>
      <div id="features">
        <CPFeatures selected={selected} />
      </div>
      <div id="price">
        <CPPricing selected={selected} />
      </div>
      <div id="ratings">
        <CPReviews selected={selected} />
      </div>
      <Footer />
    </div>
  );
};

export default ComparePage;