import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SafePage = () => {
   return (
      <div className="container py-10">
         <div className="flex gap-5 relative">
            <div className="flex items-center justify-center w-[30%] absolute p-3 bg-background border shadow rounded-lg">
               <div className="flex flex-col w-full max-w-sm space-y-2">
                  <Input type="text" placeholder="Enter places to search for" />
                  <Button type="submit">Search</Button>
               </div>
            </div>
            <div className="w-full border rounded-lg h-[90vh] bg-[url('/bg-heat-map.jpg')] bg-no-repeat bg-cover"></div>
         </div>
      </div>
   );
};

export default SafePage;
