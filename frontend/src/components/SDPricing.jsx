import { useState } from "react";

const plans = [
	{
		name: "Free",
		price: "$0.00",
		desc: "Per User, Per Month",
	},
	{
		name: "Plus",
		price: "$12.00",
		desc: "Per User, Per Month",
	},
	{
		name: "Business",
		price: "$18.00",
		desc: "Per User, Per Month",
	},
	{
		name: "Business Pro",
		price: "$20.00",
		desc: "Per User, Per Month",
	},
	{
		name: "Enterprice",
		price: "Contact Us",
		desc: "",
	},
];

const SDPricing = () => {
	const [page, setPage] = useState(0);
	const [direction, setDirection] = useState("right"); // "left" or "right"

	const PLANS_PER_PAGE = 4;
	const maxStart = Math.max(0, plans.length - PLANS_PER_PAGE);

	const pagedPlans = plans.slice(page, page + PLANS_PER_PAGE);

	return (
		<section className="bg-slate-50 max-w-7xl mx-auto">
			<div className="max-w-7xl mx-auto bg-white rounded-2xl shadow p-8">
				<h2 className="text-3xl font-bold mb-8">Elevenlabs pricing</h2>
				<div
					className={`grid grid-cols-1 md:grid-cols-4 gap-6 justify-start mb-8 transition-transform duration-300 ${
						direction === "right"
							? "animate-slide-right"
							: direction === "left"
							? "animate-slide-left"
							: ""
					}`}
					// Remove the animation class after animation ends
					onAnimationEnd={() => setDirection("")}
				>
					{pagedPlans.map((plan) => (
						<div
							key={plan.name}
							className="border rounded-xl px-8 py-8 bg-white shadow-sm text-center transition hover:shadow-md flex flex-col"
							style={{ minWidth: 0 }}
						>
							<div className="text-xl font-semibold mb-2">{plan.name}</div>
							<div className="text-3xl font-bold mb-2">{plan.price}</div>
							<div className="text-gray-500">{plan.desc}</div>
						</div>
					))}
				</div>
				<div className="flex items-center justify-center gap-4 mb-4">
					<button
						className="text-gray-400 px-2 py-1 rounded disabled:opacity-50"
						disabled={page === 0}
						onClick={() => {
							setDirection("left");
							setPage(page - 1);
						}}
					>
						&lt;
					</button>
					<div className="flex items-center gap-2">
						{[...Array(maxStart + 1)].map((_, i) => (
							<button
								key={i}
								className={`w-6 h-6 rounded border flex items-center justify-center ${
									page === i ? "border-black" : "border-gray-300"
								}`}
								onClick={() => {
									setDirection(i > page ? "right" : "left");
									setPage(i);
								}}
							>
								<span className="text-lg">{page === i ? "•" : " "}</span>
							</button>
						))}
					</div>
					<button
						className="text-gray-400 px-2 py-1 rounded disabled:opacity-50"
						disabled={page === maxStart}
						onClick={() => {
							setDirection("right");
							setPage(page + 1);
						}}
					>
						&gt;
					</button>
				</div>
				<div className="text-left">
					<a
						href="#"
						className="text-blue-600 hover:underline text-sm font-medium"
					>
						See pricing plan details
					</a>
				</div>
			</div>
		</section>
	);
};

export default SDPricing;