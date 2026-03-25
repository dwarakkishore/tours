import React from "react";

const RichTextRenderer = ({ text }) => {
  //   const text =
  //     "•\tArrival in Singapore: Complete immigration formalities and proceed to Hotel.\n•\tMarina Bay Sands: In the evening visit the famous marina bay sands Open to the public for a fee, the observation deck offers a 360-degree view of Singapore's skyline, making it a popular spot for photography enthusiasts\n\tGardens by the Bay: Enjoy the famous Gardens by the Bay (cloud forest & Super tree) with its vibrant colours, cascading waterfalls, and fragrant flora.\n•\tOvernight Stay: Return to hotel for overnight stay.\n•\tMeals included on the day: Breakfast – Lunch - Dinner\n";

  const formatText = (text) => {
    return text
      .split("\n")
      .map((line, index) => {
        if (!line.trim()) return null;

        const formatLine = (content) => {
          // Split at the first colon if it exists
          const colonIndex = content.indexOf(":");
          if (colonIndex !== -1) {
            const beforeColon = content.substring(0, colonIndex);
            const afterColon = content.substring(colonIndex);
            return (
              <>
                <span className="font-bold">{beforeColon}</span>
                {afterColon}
              </>
            );
          }
          return content;
        };

        // Check if line starts with a bullet point
        if (line.startsWith("•")) {
          // Remove the bullet point and trim any tabs
          const content = line.substring(1).trim();
          return (
            <div key={index} className="mb-4 flex items-start">
              <span className="mr-2 text-gray-600">•</span>
              <span>{formatLine(content)}</span>
            </div>
          );
        } else if (line.trim().startsWith("Gardens")) {
          // Handle the special case of Gardens by the Bay which is indented but doesn't have a bullet
          return (
            <div key={index} className="mb-4 ml-6">
              {formatLine(line.trim())}
            </div>
          );
        } else if (line.trim()) {
          // Any other non-empty line
          return (
            <div key={index} className="mb-4">
              {formatLine(line.trim())}
            </div>
          );
        }
        return null;
      })
      .filter(Boolean);
  };

  return (
    <div className="">
      <div className="space-y-2">{formatText(text)}</div>
    </div>
  );
};

export default RichTextRenderer;
