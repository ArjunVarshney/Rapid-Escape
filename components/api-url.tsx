import MarkdownToHTML from "@/actions/markdown-to-html";
import ApiBox from "./ui/api-box";
import TestApi from "./ui/test-api";
import qs from "query-string";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useOrigin } from "@/hooks/use-origin";

interface ApiUrlProps {
  title: string;
  url: string;
  variant: "public" | "admin";
  description: string;
  type?: "route" | "search-param";
  parameters?: {
    name: string;
    type: string;
    default: number | string | undefined;
    placeholder: string;
  }[];
}

const ApiUrl: React.FC<ApiUrlProps> = ({
  title,
  url,
  variant,
  description,
  type = "route",
  parameters = [],
}) => {
  const origin = useOrigin();
  const [apiUrl, setUrl] = useState(url);
  const [response, setResponse] = useState({});

  useEffect(() => {
    setUrl(origin + url);
  }, [origin, url]);

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-full my-6 pb-6 px-2 gap-6">
      <div className="w-full">
        <ApiBox
          title={title}
          url={apiUrl}
          variant={variant}
          description={MarkdownToHTML(description)}
          parameters={parameters}
          onParameterChange={(value: Record<string, any>) => {
            if (type === "search-param") {
              const queryString = qs.stringify(value);
              setUrl(origin + url + "?" + queryString);
            } else if (parameters.length) {
              if (value[parameters[0].name])
                setUrl(
                  origin +
                    url.substring(0, url.indexOf("<")) +
                    value[parameters[0].name]
                );
              else {
                setUrl(origin + url);
              }
            }
          }}
        />
      </div>
      {variant === "public" && (
        <>
          <div className="border w-0" />
          <div className="w-full overflow-hidden flex flex-col gap-1">
            <TestApi
              response={response}
              onRun={async (): Promise<void> => {
                try {
                  const response = await axios.get(apiUrl);
                  setResponse(response);
                  toast.success("Request successfull.");
                } catch (error: any) {
                  setResponse({
                    status: error.response.status,
                    data: error.response.data,
                  });
                  toast.error("Request unsucessfull");
                }
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ApiUrl;
