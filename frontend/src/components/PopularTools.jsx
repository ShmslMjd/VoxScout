import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Star, Heart } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import elevenlabsLogo from '../img/homePage/elevenlabs.png';
import voicemodLogo from '../img/homePage/voicemod.png';
import respeecherLogo from '../img/homePage/respeecher.png';
import murfLogo from '../img/homePage/murf.png';

// Dummy data (replace with your real data)
const tools = [
	{
		name: "Eleven Labs",
		logo: elevenlabsLogo,
		rating: 5,
		reviews: "12,776",
	},
	{
		name: "Voicemod",
		logo: voicemodLogo,
		rating: 4,
		reviews: "776",
	},
	{
		name: "Respeecher",
		logo: respeecherLogo,
		rating: 2,
		reviews: "2,776",
	},
	{
		name: "Murf AI",
		logo: murfLogo,
		rating: 5,
		reviews: "3,776",
	},
	// Add more tools as needed
];

// Custom arrow components
const Arrow = ({ className, style, onClick, direction }) => (
	<button
		className={`absolute top-1/2 z-10 -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100 ${
			direction === "left" ? "left-0" : "right-0"
		}`}
		style={{ ...style }}
		onClick={onClick}
		aria-label={direction === "left" ? "Previous" : "Next"}
		type="button"
	>
		{direction === "left" ? (
			<ChevronLeft size={24} />
		) : (
			<ChevronRight size={24} />
		)}
	</button>
);

const PopularTools = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		swipeToSlide: true,
		nextArrow: <Arrow direction="right" />,
		prevArrow: <Arrow direction="left" />,
		responsive: [
			{
				breakpoint: 1024,
				settings: { slidesToShow: 3 },
			},
			{
				breakpoint: 768,
				settings: { slidesToShow: 2 },
			},
			{
				breakpoint: 480,
				settings: { slidesToShow: 1 },
			},
		],
	};

	return (
		<div className="bg-sky-200 py-8 px-2 md:px-8 rounded-lg">
            <div className="max-w-7xl mx-auto py-12 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl md:text-2xl font-bold">
                        Popular AI Audio Tools
                    </h2>
                    <a
                        href="#"
                        className="text-blue-700 font-medium hover:underline text-sm md:text-base"
                    >
                        See all
                    </a>
                </div>
                <div className="relative">
                    <Slider {...settings}>
                        {tools.map((tool, idx) => (
                            <div key={idx} className="px-2">
								<div className="card bg-base-100 max-w-72 shadow-xl">
									<div className="card-body">
										<div className="flex justify-between items-center">
											<h2 className="card-title">{tool.name}</h2>
											<button className="text-gray-400 hover:text-red-400">
												<Heart size={18} />
											</button>
										</div>
										<div className="flex items-center gap-1 mt-1">
                                            {[...Array(tool.rating)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    className="text-yellow-400 fill-yellow-400"
                                                />
                                            ))}
                                            <span className="text-xs text-gray-500 ml-1">
                                                ({tool.reviews})
                                            </span>
                                        </div>
									</div>
									<figure>
										<img
										src= {tool.logo}
										alt="Shoes" />
									</figure>
								</div>
                                {/*<div className="bg-white rounded-xl shadow p-5 flex flex-col items-center relative min-h-[260px]">
                                    <button className="absolute top-3 right-3 text-gray-400 hover:text-red-400">
                                        <Heart size={18} />
                                    </button>
                                    <div className="w-full mb-3">
                                        <span className="block font-semibold text-sm">
                                            {tool.name}
                                        </span>
                                        <div className="flex items-center gap-1 mt-1">
                                            {[...Array(tool.rating)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    className="text-yellow-400 fill-yellow-400"
                                                />
                                            ))}
                                            <span className="text-xs text-gray-500 ml-1">
                                                ({tool.reviews})
                                            </span>
                                        </div>
                                    </div>
                                    <img
                                        src={tool.logo}
                                        alt={tool.name}
                                        className="object-contain h-20 my-4"
                                        draggable={false}
                                    />
                                </div>*/}
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
		</div>
	);
};

export default PopularTools;