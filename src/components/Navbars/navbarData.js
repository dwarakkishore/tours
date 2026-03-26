import dynamic from "next/dynamic";

const InternationalContent = dynamic(() => import("@/components/Navbars/InternationalContent"), { 
  loading: () => <div className="h-64 animate-pulse bg-white/10 rounded-2xl" /> 
});
const DomesticContent = dynamic(() => import("@/components/Navbars/DomesticContent"), { 
  loading: () => <div className="h-64 animate-pulse bg-white/10 rounded-2xl" /> 
});
const ExplorePackagesContent = dynamic(() => import("@/components/Navbars/ExplorePackagesContent"), { 
  loading: () => <div className="h-64 animate-pulse bg-white/10 rounded-2xl" /> 
});

const navbarData = [
  {
    id: "nav-international",
    title: "International",
    hasDropdown: true,
    dropdownContent: (props) => <InternationalContent {...props} />,
  },
  {
    id: "nav-domestic",
    title: "Domestic",
    hasDropdown: true,
    dropdownContent: (props) => <DomesticContent {...props} />,
  },
  {
    id: "nav-group-departure",
    title: "Group Departure",
    hasDropdown: false,
    href: "/themes/group-departure",
  },
  {
    id: "nav-explore",
    title: "Explore Packages",
    hasDropdown: true,
    dropdownContent: (props) => <ExplorePackagesContent {...props} />,
  },
  /* {
    id: "nav-activities",
    title: "Activities",
    hasDropdown: false,
    href: "/activities",
  }, */
  {
    id: "nav-about-us",
    title: "About Us",
    hasDropdown: false,
    href: "/about",
  },
];

export default navbarData;
