"use client";

import { MouseEventHandler, useState } from "react";
import { Button } from "./button";
import ResponseBox from "./response-box";
import SubHeading from "./sub-heading";
import { cn } from "@/lib/utils";

interface TextApiProps {
  response: any;
  onRun: Function;
}

const TestApi: React.FC<TextApiProps> = ({ onRun, response }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative h-full min-h-[220px] lg:min-h-0 rounded-b-lg overflow-hidden">
      <div className="flex justify-between items-center pr-1">
        <div className="flex items-center">
          <Button
            disabled={loading}
            onClick={async (e) => {
              setLoading(true);
              await onRun(e);
              setLoading(false);
            }}
            variant="destructive"
            size="sm"
          >
            Run
          </Button>
          {response.status && (
            <span
              className={cn(
                "mx-4 font-bold py-2 px-4 rounded-lg",
                response.status === 200
                  ? "text-green-500 bg-green-100"
                  : "text-red-500 bg-red-100"
              )}
            >
              Status: {response.status}
            </span>
          )}
        </div>
        <SubHeading title="Test Api" />
      </div>
      <ResponseBox response={response.data} />
    </div>
  );
};

export default TestApi;
