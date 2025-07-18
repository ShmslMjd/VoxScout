import { Facebook, Globe, Instagram, X, Youtube, Linkedin } from "lucide-react";

const SDOverview = ({ software }) => {
  // Transform software data for the overview section
  const overview = {
    review: software?.rating ? 
      `${software.rating.score || 0} Stars (${software.rating.totalReviews || 0} Reviews)` : 
      "No reviews yet",
    downloads: software?.downloads?.toLocaleString() || "0",
    price: software?.pricing?.plans?.[0]?.price ? 
      `$${software.pricing.plans[0].price.amount}/${software.pricing.plans[0].price.period}` : 
      "Free",
    description: software?.briefOverview || "",
    features: Array.isArray(software?.features) ? software.features : [],
    pros: Array.isArray(software?.prosAndCons?.pros) ? 
      software.prosAndCons.pros.map(pro => ({
        title: pro.title,
        description: pro.description,
        upvotes: pro.upvotes
      })) : [],
    cons: Array.isArray(software?.prosAndCons?.cons) ? 
      software.prosAndCons.cons.map(con => ({
        title: con.title,
        description: con.description,
        upvotes: con.upvotes
      })) : [],
    platforms: software?.platforms || []
  };

  // Transform company data
  const company = {
    name: software?.company?.name || '',
    logo: software?.logo || '',
    type: software?.category || '',
    established: software?.company?.established ? 
      new Date(software.company.established).getFullYear() : '',
    companyType: software?.company?.companyType || '',
    size: software?.company?.size || '',
    contact: {
      phone: software?.company?.contact?.phone || '',
      email: software?.company?.contact?.email || '',
      website: software?.company?.contact?.website || software?.websiteUrl || ''
    }
  };

  // Transform social media data
  const getSocialIcon = (platform = '', url = '') => {
    if (!url) return <Globe size={18} />;
    switch(platform.toLowerCase()) {
      case 'twitter': return <X size={18} />;
      case 'facebook': return <Facebook size={18} />;
      case 'instagram': return <Instagram size={18} />;
      case 'youtube': return <Youtube size={18} />;
      case 'linkedin': return <Linkedin size={18} />;
      default: return <Globe size={18} />;
    }
  };

  const socials = Array.isArray(software?.company?.socialMedia) ?
    software.company.socialMedia.map(social => ({
      icon: getSocialIcon(social.platform, social.url),
      url: social.url
    })) : [];

  return (
    <div className="bg-white max-w-7xl mx-auto rounded-lg shadow p-8 mt-8 px-2 md:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold mb-4">{company.name} Overview</h2>
          <h3 className="font-semibold mb-2">What is {company.name}?</h3>
          <div className="space-y-4">
            {overview.description.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 text-sm">
                {paragraph}
              </p>
            ))}
          </div>
          <h4 className="font-semibold my-5">Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-2">
            {overview.features.map((feature, index) => (
              <li key={index} className="space-y-1">
                <span className="font-medium">{feature.title}</span>
                {feature.description && (
                  <p className="ml-6 text-gray-600">{feature.description}</p>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Two Cards Stacked */}
        <div className="flex flex-col gap-6 w-full lg:w-[420px] flex-shrink-0">
          {/* Software Detail Card */}
          <div className="border border-blue-200 rounded-lg p-6 bg-white">
            <h3 className="font-semibold text-gray-800 mb-6">Software Details</h3>
            <div className="grid grid-cols-3 gap-4 text-left mb-6">
              {/* Rating Section */}
              <div>
                <div className="flex justify-start mb-2">
                  <svg className="text-blue-500" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </div>
                <div className="uppercase text-xs text-gray-500 font-normal mb-1">Rating</div>
                <div className="font-semibold text-sm text-gray-900">{software.rating.score} Star</div>
              </div>

              {/* Downloads Section */}
              <div>
                <div className="flex justify-start mb-2">
                  <svg className="text-blue-500" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 002-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                  </svg>
                </div>
                <div className="uppercase text-xs text-gray-500 font-normal mb-1">Downloads</div>
                <div className="font-semibold text-sm text-gray-900">{overview.downloads}</div>
              </div>

              {/* Price Section */}
              <div>
                <div className="flex justify-start mb-2">
                  <svg className="text-blue-500" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="uppercase text-xs text-gray-500 font- mb-1">Starting Price</div>
                <div className="font-semibold text-sm text-gray-900">{overview.price}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-left">
              {/* Pros Section */}
              <div>
                <div className="flex justify-start mb-2">
                  <svg className="text-blue-500" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="uppercase text-xs text-gray-500 font-normal mb-1">Pros</div>
                <ul className="list-disc list-inside font-semibold text-sm text-gray-900">
                  {overview.pros.map((pro, i) => (
                    <li key={i}>{pro.title}</li>
                  ))}
                </ul>
              </div>

              {/* Cons Section */}
              <div>
                <div className="flex justify-start mb-2">
                  <svg className="text-blue-500" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="uppercase text-xs text-gray-500 font-normal mb-1">Cons</div>
                <ul className="list-disc list-inside font-semibold text-sm text-gray-900">
                  {overview.cons.map((con, i) => (
                    <li key={i}>{con.title}</li>
                  ))}
                </ul>
              </div>

              {/* Platforms Section */}
              <div>
                <div className="flex justify-start mb-2">
                  <svg className="text-blue-500" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="uppercase text-xs text-gray-500 font-normal mb-1">Platforms</div>
                <ul className="list-disc list-inside font-semibold text-sm text-gray-900">
                  {overview.platforms.map((platform, i) => (
                    <li key={i}>{platform}</li>
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
                <span className="font-medium text-gray-900">{company.established}</span>
              </div>
              <div className="flex justify-between">
                <span>Organization type:</span>
                <span className="font-medium text-gray-900">{company.companyType}</span>
              </div>
              <div className="flex justify-between">
                <span>Company size:</span>
                <span className="font-medium text-gray-900">{company.size}</span>
              </div>
              <div className="flex justify-between">
                <span>Phone:</span>
                <span className="font-medium text-gray-900">{company.contact.phone}</span>
              </div>
              <div className="flex justify-between">
                <span>Email:</span>
                <span className="font-medium text-gray-900">{company.contact.email}</span>
              </div>
              <div className="flex justify-between">
                <span>Website:</span>
                <a href={company.contact.website} className="font-medium text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  {company.contact.website}
                </a>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              {socials.map((social, i) => (
                <a 
                  key={i} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-800"
                >
                  {social.icon}
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