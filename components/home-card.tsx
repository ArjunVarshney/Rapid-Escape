interface HomeCardProps {
   title: string;
   description: string;
   href: string;
}

const HomeCard = ({ title, description, href }: HomeCardProps) => {
   return (
      <div className="bg-white max-w-[250px] border p-6 rounded-lg shadow-lg hover:scale-105 transition active:scale-100">
         <h2 className="text-xl font-bold mb-2 text-black truncate">{title}</h2>
         <p className="text-gray-700 mb-4">{description}</p>
         <a href={href} className="text-indigo-600 hover:text-indigo-400">
            Learn More →
         </a>
      </div>
   );
};

export default HomeCard;
