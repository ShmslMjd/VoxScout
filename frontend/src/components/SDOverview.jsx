import { Facebook, Globe, Instagram, X, Youtube } from "lucide-react";
import elevenlabsLogo from "../img/homePage/elevenlabs.png";

const SDOverview = () => {
  // Dummy data for now
  const overview = {
    review: "4.5 Stars",
    downloads: "1,234,345",
    price: "Free",
    pros: ["pros 1", "pros 2", "pros 3"],
    cons: ["cons 1", "cons 2", "cons 3"],
  };

  const company = {
    logo: elevenlabsLogo,
    name: "Elevenlabs",
    type: "AI Audio",
    founded: "March 21, 2006",
    orgType: "Private Company",
    size: "120-300 Employees",
    phone: "(406) 555-0120",
    email: "twitter@gmail.com",
    website: "https://twitter.com",
    socials: [
      { icon: <Globe size={18} />, url: "https://twitter.com" },
      { icon: <X size={18} />, url: "https://x.com" },
      { icon: <Facebook size={18}/>, url: "https://facebook.com" },
      { icon: <Instagram size={18} />, url: "https://instagram.com" },
      { icon: <Youtube size={18} />, url: "https://youtube.com" },
      // Add more socials as needed
    ],
  };  

  return (
      <div className="bg-white max-w-7xl mx-auto rounded-lg shadow p-8 mt-8 px-2 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold mb-4">Elevenlabs Overview</h2>
            <h3 className="font-semibold mb-2">What is Elevenlabs</h3>
            <p className="text-gray-700 mb-4 text-sm">
              Integer aliquet pretium consequat. Donec et sapien id leo accumsan pellentesque eget maximus tellus. Duis et est ac leo rhoncus tincidunt vitae vehicula augue. Donec in suscipit diam. Pellentesque quis justo sit amet arcu commodo sollicitudin. Integer finibus blandit condimentum. Vivamus sit amet ligula ullamcorper, pulvinar ante id, tristique erat. Quisque sit amet aliquam urna. Maecenas blandit felis id massa sodales finibus. Integer bibendum eu nulla eu sollicitudin. Sed lobortis diam tincidunt accumsan faucibus. Quisque blandit augue quis turpis auctor, dapibus euismod ante ultricies. Ut non felis lacinia turpis feugiat euismod at id magna. Sed ut orci arcu. Suspendisse sollicitudin faucibus aliquet.
            </p>
            <p className="text-gray-700 mb-4 text-sm">
              Nam dapibus consectetur erat in euismod. Cras urna augue, mollis venenatis augue sed, porttitor aliquet nibh. Sed tristique dictum elementum. Nulla imperdiet sit amet quam eget lobortis. Etiam in neque sit amet orci interdum tincidunt.
            </p>
            <h4 className="font-semibold mb-2">Features</h4>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Quisque semper gravida est et consectetur.</li>
              <li>Curabitur blandit lorem velit, vitae pretium leo placerat eget.</li>
              <li>Morbi mattis in ipsum ac tempus.</li>
              <li>Curabitur eu vehicula libero. Vestibulum sed purus ullamcorper, lobortis lectus nec.</li>
              <li>Vulputate turpis. Quisque ante odio, iaculis a porttitor sit amet.</li>
              <li>Lobortis vel lectus. Nulla at risus ut diam.</li>
              <li>Commodo feugiat. Nullam laoreet, diam placerat dapibus tincidunt.</li>
              <li>Odio metus posuere lorem, id condimentum erat velit nec neque.</li>
              <li>Dui sodales ut. Curabitur tempus augue.</li>
            </ul>
          </div>
          {/* Right Side: Two Cards Stacked */}
          <div className="flex flex-col gap-6 w-full lg:w-[420px] flex-shrink-0">
            {/* Software Detail Card */}
            <div className="border border-blue-200 rounded-lg p-6 bg-white">
              <h3 className="font-semibold text-gray-800 mb-6">Software Detail</h3>
              <div className="grid grid-cols-3 gap-4 text-left mb-6">
                <div>
                  <div className="flex justify-start mb-2">
                    <svg className="text-blue-500" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                  </div>
                  <div className="uppercase text-xs text-gray-500 font-normal mb-1">Review</div>
                  <div className="font-medium text-gray-900">{overview.review}</div>
                </div>
                <div>
                  <div className="flex justify-start mb-2">
                    <svg className="text-blue-500" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <div className="uppercase text-xs text-gray-500 font-normal mb-1">No of Download</div>
                  <div className="font-medium text-gray-900">{overview.downloads}</div>
                </div>
                <div>
                  <div className="flex justify-start mb-2">
                    <svg className="text-blue-500" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="7" width="18" height="13" rx="2" />
                      <path d="M16 3v4M8 3v4" />
                    </svg>
                  </div>
                  <div className="uppercase text-xs text-gray-500 font-normal mb-1">Starting Price</div>
                  <div className="font-medium text-gray-900">{overview.price}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-lef">
                <div>
                  <div className="flex justify-start mb-2">
                    <svg className="text-blue-500" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="4" y="4" width="16" height="16" rx="2" />
                      <path d="M8 2v4M16 2v4" />
                    </svg>
                  </div>
                  <div className="uppercase text-xs text-gray-500 font-normal mb-1">Pros</div>
                  <ul className="list-disc list-inside font-medium text-gray-900 text-left mx-auto inline-block">
                    {overview.pros.map((pro, i) => (
                      <li key={i}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex justify-start mb-2">
                    <svg className="text-blue-500" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="10" r="3" />
                      <path d="M12 13v7" />
                    </svg>
                  </div>
                  <div className="uppercase text-xs text-gray-500 font-normal mb-1">Cons</div>
                  <ul className="list-disc list-inside font-medium text-gray-900 text-left mx-auto inline-block">
                    {overview.cons.map((con, i) => (
                      <li key={i}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* Company Detail Card */}
            <div className="border border-blue-200 rounded-lg p-6 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <img src={company.logo} alt={company.name} className="h-12 w-12 object-contain rounded" />
                <div>
                  <div className="font-semibold">{company.name}</div>
                  <div className="text-xs text-gray-500">{company.type}</div>
                </div>
              </div>
              <div className="text-xs text-gray-700 space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Founded in:</span>
                  <span className="font-medium text-gray-900">{company.founded}</span>
                </div>
                <div className="flex justify-between">
                  <span>Organization type:</span>
                  <span className="font-medium text-gray-900">{company.orgType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Company size:</span>
                  <span className="font-medium text-gray-900">{company.size}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phone:</span>
                  <span className="font-medium text-gray-900">{company.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-medium text-gray-900">{company.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Website:</span>
                  <a href={company.website} className="font-medium text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    {company.website}
                  </a>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                {/* Socials */}
                {company.socials.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SDOverview;