import { Download, DollarSign, Star, Globe } from "lucide-react";
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
      { icon: <svg width="18" height="18" fill="currentColor" className="inline" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.85 1.94 3.63a4.28 4.28 0 0 1-1.94-.54v.05c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.11 2.94 3.97 2.97A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 24 4.59a8.36 8.36 0 0 1-2.54.7z"/></svg>, url: "https://twitter.com" },
      // Add more socials as needed
    ],
  };

  return (
    <section className="max-w-7xl mx-auto mt-8 px-2 md:px-4">
      <div className="bg-white rounded-lg shadow p-8">
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
          <div className="flex flex-col gap-6 w-full lg:w-[340px] flex-shrink-0">
            {/* Software Detail Card */}
            <div className="border rounded-lg p-6 bg-gray-50">
              <h3 className="font-semibold text-gray-800 mb-4">Software Detail</h3>
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div>
                  <div className="flex justify-center mb-1">
                    <Star className="text-blue-500" size={20} />
                  </div>
                  <div className="font-semibold">{overview.review}</div>
                  <div className="text-xs text-gray-500 mt-1">Review</div>
                </div>
                <div>
                  <div className="flex justify-center mb-1">
                    <Download className="text-blue-500" size={20} />
                  </div>
                  <div className="font-semibold">{overview.downloads}</div>
                  <div className="text-xs text-gray-500 mt-1">No of Download</div>
                </div>
                <div>
                  <div className="flex justify-center mb-1">
                    <DollarSign className="text-blue-500" size={20} />
                  </div>
                  <div className="font-semibold">{overview.price}</div>
                  <div className="text-xs text-gray-500 mt-1">Starting Price</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="font-semibold text-sm mb-1">Pros</div>
                  <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                    {overview.pros.map((pro, i) => (
                      <li key={i}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm mb-1">Cons:</div>
                  <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                    {overview.cons.map((con, i) => (
                      <li key={i} className="font-semibold text-red-500">{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* Company Detail Card */}
            <div className="border rounded-lg p-6 bg-gray-50">
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
    </section>
  );
};

export default SDOverview;