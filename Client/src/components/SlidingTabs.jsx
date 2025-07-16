import { useState, useRef, useEffect } from "react";

const tabs = ["Home", "About", "Contact"];

export default function SlidingTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef([]);

  const [indicatorStyle, setIndicatorStyle] = useState({});

  useEffect(() => {
    const current = tabRefs.current[activeTab];
    if (current) {
      setIndicatorStyle({
        width: current.offsetWidth + "px",
        left: current.offsetLeft + "px",
      });
    }
  }, [activeTab]);

  return (
    <div className="relative w-fit border-b border-gray-300">
      <div className="flex space-x-6">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            ref={(el) => (tabRefs.current[index] = el)}
            onClick={() => setActiveTab(index)}
            className={`pb-2 transition-colors duration-300 ${
              activeTab === index ? "text-blue-600" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div
        className="absolute bottom-0 h-[2px] bg-blue-600 transition-all duration-300"
        style={indicatorStyle}
      />
    </div>
  );
}
