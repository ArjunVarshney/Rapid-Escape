"use client";

import { cn } from "@/lib/utils";
import { JsonToHtmlOptionType, jsontohtml } from "jsontohtml-render";
import { useEffect, useState } from "react";

interface ResponseBoxProps {
  response: any;
}

const ResponseBox: React.FC<ResponseBoxProps> = ({ response }) => {
  const [options, setOptions] = useState<JsonToHtmlOptionType>({
    space_from_left: "50px",
    line_numbers: { space_from_left: "20px" },
    retractors: { space_from_left: "30px" },
  });

  useEffect(() => {
    if (window.innerWidth < 650) {
      setOptions({
        space_from_left: "50px",
        fontSize: "12px",
        line_numbers: { space_from_left: "20px" },
        retractors: { space_from_left: "30px" },
      });
    }
  }, []);

  return (
    <div
      className={cn(
        "text-white w-full min-h-[160px] absolute top-12 border bottom-0 overflow-auto bg-black rounded-lg p-3",
        response ? "" : "text-opacity-80"
      )}
      dangerouslySetInnerHTML={{
        __html: response
          ? jsontohtml(response, options)
          : "Click run to try...",
      }}
    ></div>
  );
};

export default ResponseBox;
