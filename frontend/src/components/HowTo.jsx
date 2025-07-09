import { Download, GitCompare, Search } from "lucide-react";

const steps = [
  {
    Icon: Search,
    step: "STEP 1",
    title: "Search",
    desc: "Search the tools you are interested in and get the product detail from various sites!",
  },
  {
    Icon: GitCompare,
    step: "STEP 2",
    title: "Compare",
    desc: 'Compare the tools you are interested in and find the best one for you! You can also compare multiple tools at once.',
  },
  {
    Icon: Download,
    step: "STEP 3",
    title: "Download",
    desc: "Download the tool you like and start using it! You can also find the official website of the tool.",
  },
];

const HowTo = () => (
  <div className="max-w-7xl mx-auto py-12 px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {steps.map((step, idx) => (
        <div key={idx} className="flex flex-col items-start border-r last:border-r-0 pr-6 last:pr-0">
          <step.Icon className="w-12 h-12 mb-4" />
          <span className="text-sky-500 font-semibold mb-1">{step.step}</span>
          <h3 className="font-bold text-lg mb-2">{step.title}</h3>
          <p className="text-gray-600">{step.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default HowTo;