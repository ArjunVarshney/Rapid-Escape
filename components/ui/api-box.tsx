// @ts-nocheck
"use client";

import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Label } from "./label";

interface ApiBoxProps {
  title: string;
  url: string;
  description: string;
  variant: "public" | "admin";
  parameters: {
    name: string;
    type: string;
    default: number | string | undefined;
    placeholder: string;
  }[];
  onParameterChange: Function;
}

const textMap: Record<ApiBoxProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiBoxProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const ApiBox: React.FC<ApiBoxProps> = ({
  title,
  url,
  description,
  variant = "public",
  parameters,
  onParameterChange,
}) => {
  let defaultValue = {};
  parameters.forEach((parameter) => {
    defaultValue[parameter.name] = parameter.default;
  });

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    onParameterChange(value);
  }, [value, onParameterChange]);

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    toast.success("API Route copied to the clipboard.");
  };

  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] w-full break-all word py-[0.2rem] mr-2 font-mono text-sm font-semibold">
          {url}
        </code>
        <Button variant="outline">
          <Copy className="h-4 w-4" size="icom" onClick={onCopy} />
        </Button>
      </AlertDescription>
      <Accordion type="single" collapsible className="pt-5">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-sm sm:text-lg">
            Details
          </AccordionTrigger>
          <AccordionContent>
            <div
              className="my-1.5 text-primary"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {parameters.length === 0 ? (
        <div className="pb-5" />
      ) : (
        <Accordion type="single" collapsible className="pb-5">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm sm:text-lg">
              Change Params
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid w-full items-center gap-1.5 my-3">
                {parameters.map((parameter) => (
                  <div
                    key={parameter.name}
                    className="flex mr-4 flex-col sm:flex-row gap-y-2 items-center"
                  >
                    <Label
                      htmlFor={parameter.name}
                      className="w-full sm:w-[30%]"
                    >
                      {parameter.name}:
                    </Label>
                    <Input
                      type={parameter.type}
                      id={parameter.name}
                      className="w-full"
                      placeholder={parameter.placeholder}
                      min={0}
                      value={value[parameter.name]}
                      onChange={(e) => {
                        setValue((prev) => {
                          const dPrev = { ...prev };
                          dPrev[parameter.name] = e.target.value || undefined;
                          return dPrev;
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </Alert>
  );
};

export default ApiBox;
