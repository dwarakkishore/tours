import InternationalContent from "@/components/Navbars/InternationalContent";
import DomesticContent from "@/components/Navbars/DomesticContent";
import ExplorePackagesContent from "@/components/Navbars/ExplorePackagesContent";

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
