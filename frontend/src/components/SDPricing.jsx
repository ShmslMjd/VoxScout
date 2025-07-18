import { useState } from "react";

const SDPricing = ({ software }) => {
	const [page, setPage] = useState(0);
	const [direction, setDirection] = useState("right"); // "left" or "right"

	// Get pricing plans from software model
	const plans =
		software?.pricing?.plans?.map((plan) => ({
			name: plan.name,
			price:
				plan.price?.amount &&
				`$${plan.price.amount}${
					plan.price.period === "monthly"
						? "/mo"
						: plan.price.period === "yearly"
						? "/yr"
						: ""
				}`,
			desc: plan.features?.[0] || "", // Show first feature as description
			features: plan.features || [],
			limitations: plan.limitations || [],
		})) || [];

	const PLANS_PER_PAGE = 4;
	const maxStart = Math.max(0, plans.length - PLANS_PER_PAGE);
	const pagedPlans = plans.slice(page, page + PLANS_PER_PAGE);

	return (
		<section className="bg-slate-50 max-w-7xl mx-auto">
			<div className="max-w-7xl mx-auto bg-white rounded-2xl shadow p-8">
				<h2 className="text-3xl font-bold mb-8">{software?.name} Pricing</h2>
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
							<div className="text-3xl font-bold mb-4">{plan.price}</div>
							<div className="text-gray-500 mb-4">{plan.desc}</div>

							{/* Features List */}
							<ul className="text-sm text-left space-y-2 mt-4">
								{plan.features.map((feature, idx) => (
									<li key={idx} className="flex items-start">
										<svg
											className="w-5 h-5 text-green-500 mr-2"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M5 13l4 4L19 7"
											></path>
										</svg>
										{feature}
									</li>
								))}
							</ul>

							{/* Limitations List */}
							{plan.limitations.length > 0 && (
								<ul className="text-sm text-left space-y-2 mt-4">
									{plan.limitations.map((limitation, idx) => (
										<li key={idx} className="flex items-start text-gray-500">
											<svg
												className="w-5 h-5 text-gray-400 mr-2"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M6 18L18 6M6 6l12 12"
												></path>
											</svg>
											{limitation}
										</li>
									))}
								</ul>
							)}
						</div>
					))}
				</div>

				{/* Trial Period Info */}
				{software?.pricing?.hasFreeTrialPeriod && (
					<div className="text-center text-sm text-gray-600 my-4">
						Try free for {software.pricing.freeTrialDays} days
					</div>
				)}

				{/* Pagination Controls */}
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

			</div>
		</section>
	);
};

export default SDPricing;