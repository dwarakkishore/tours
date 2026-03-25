import React, { useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import categoryData from "@/data/categoryData";

const HeaderNavData = [
  {
    id: uuidv4(),
    hasDropDown: true,
    title: "International",
    href: "/",
    dropdownContent: {
      items: [
        ["Maldives", "Bali", "Malaysia", "Cambodia", "Bhutan"],
        ["Sri Lanka", "Dubai", "Vietnam", "Australia", "Nepal"],
        ["Singapore", "Thailand", "Mauritius", "Azerbaijan", "New Zealand"],
        ["South Africa", "Japan", "Europe", "Greece", "Turkey"],
        ["Seychelles", "Kenya"],
      ],
    },
  },
  {
    id: uuidv4(),
    hasDropDown: true,
    title: "Domestic",
    href: "/",
    dropdownContent: {
      items: [
        ["Kashmir", "Himachal", "Uttarakhand", "Rajasthan", "Gujarat"],
        ["Delhi", "Uttar Pradesh", "Punjab", "Madhya Pradesh", "Bihar"],
        ["Maharashtra", "Goa", "Karnataka", "Kerala", "Tamil Nadu"],
        ["Andhra Pradesh", "Telangana", "Odisha", "West Bengal", "Assam"],
        ["Northeast"],
      ],
    },
  },
  { id: uuidv4(), hasDropDown: false, title: "Group Package", href: "/" },
  {
    id: uuidv4(),
    hasDropDown: true,
    title: "Explore Packages",
    href: "/",
    dropdownContent: {
      items: [
        [
          {
            title: "Romantic Getaways",
            subtitle: "All things love",
            image: "/media/theme-icons/romantic-getaway.svg",
          },
          {
            title: "Group Adventures",
            subtitle: "All things fun",
            image: "/media/theme-icons/group-adventure.svg",
          },
          {
            title: "Family Funventure",
            subtitle: "All things togetherness",
            image: "/media/theme-icons/family-funventure.svg",
          },
        ],
        [
          {
            title: "Educational",
            subtitle: "All things new",
            image: "/media/theme-icons/educational.svg",
          },
          {
            title: "Religious Retreat",
            subtitle: "All things spiritual",
            image: "/media/theme-icons/religious-retreat.svg",
          },
          {
            title: "Solo Expedition",
            subtitle: "All things you",
            image: "/media/theme-icons/solo-expedition.svg",
          },
        ],
        [
          {
            title: "Exploration Bundle",
            subtitle: "All things adventure",
            image: "/media/theme-icons/exploration-bundle.svg",
          },
          {
            title: "Relax and Rejuvenate",
            subtitle: "All things leisure",
            image: "/media/theme-icons/relax-rejuvenate.svg",
          },
          {
            title: "Elite Escape",
            subtitle: "All things luxury",
            image: "/media/theme-icons/elite-escape.svg",
          },
        ],
      ],
    },
  },
];

const HeaderNav = ({ onHover, internationalRegions = [], domesticRegions = [] }) => {
  const navRefs = useRef({});

  const headerNavData = [
    {
      id: "intl",
      hasDropDown: true,
      title: "International",
      href: "/destinations",
      dropdownContent: {
        items: internationalRegions.map(region => region.name),
        slugs: internationalRegions.map(region => region.slug),
      },
    },
    {
      id: "dom",
      hasDropDown: true,
      title: "Domestic",
      href: "/destinations",
      dropdownContent: {
        items: domesticRegions.map(region => region.name),
        slugs: domesticRegions.map(region => region.slug),
      },
    },
    { id: "group", hasDropDown: false, title: "Group Package", href: "/group-departure" },
    {
      id: "explore",
      hasDropDown: true,
      title: "Explore Packages",
      href: "/destinations",
      dropdownContent: {
        items: categoryData.map(cat => ({
          title: cat.title,
          subtitle: cat.subtitle,
          image: cat.iconLight, // Use existing iconLight from categoryData
          slug: cat.slug
        })),
      },
    },
  ];

  const handleMouseEnter = (item) => {
    if (!item.hasDropDown) return;

    const rect = navRefs.current[item.id].getBoundingClientRect();
    onHover({
      isOpen: item.hasDropDown,
      content: item.dropdownContent.items,
      title: item.title,
      position: { x: rect.x + rect.width / 2 },
      slugs: item.dropdownContent.slugs
    });
  };

  return (
    <nav className="h-full">
      <ul className="flex gap-8 text-white">
        {headerNavData.map((item) => (
          <li key={item.id} ref={(el) => (navRefs.current[item.id] = el)}>
            <Link
              className="flex items-center gap-1 opacity-80 transition duration-300 hover:opacity-100"
              href={item.href}
              onMouseEnter={() => handleMouseEnter(item)}
            >
              <span>{item.title}</span>
              {item.hasDropDown && <ChevronDown size={18} />}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderNav;
