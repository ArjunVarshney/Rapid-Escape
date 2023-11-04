import HomeCard from "@/components/home-card";
import { Button } from "@/components/ui/button";

export default function Home() {
   const cardContent = [
      {
         title: "Safe Zones",
         description: "Real-time updates on crisis zones and safe passages",
         href: "/safe",
      },
      {
         title: "AQI(Air Quality Index)",
         description: "Realtime updates on Air quality to help you breathe",
         href: "/",
      },
      {
         title: "Hospitals",
         description: "Locate nearby hospitals and emergency services",
         href: "/",
      },
      {
         title: "Food And Water Supplies",
         description: "Access information about essential supplies",
         href: "/",
      },
   ];

   return (
      <div>
         <video
            id="background-video"
            autoPlay
            muted
            poster="/bg-earth.mp4"
            className="absolute -z-10 h-full w-full top-0 left-0 object-cover"
         >
            <source src="/bg-earth.mp4" type="video/mp4" />
         </video>
         <div className="container my-5">
            <div className="h-[80vh] flex flex-col justify-center">
               <h1 className="text-5xl font-bold py-10 text-white">
                  Rapid Escape
               </h1>
               <div className="flex gap-5 items-center justify-start flex-wrap pb-10">
                  {cardContent.map((content) => {
                     return <HomeCard {...content} key={content.title} />;
                  })}
               </div>
               <div className="flex gap-2">
                  <Button>Safe Places</Button>
                  <Button variant={"outline"}>Learn More</Button>
               </div>
            </div>
         </div>
      </div>
   );
}
