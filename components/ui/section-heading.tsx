interface SectionHeadingProps {
   title: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title }) => {
   return (
      <div className="px-4 py-10 animate-enter duration-300">
         <h2 className="text-5xl md:text-7xl font-bold tracking-tight pb-4 inline underline">
            {title}
         </h2>
      </div>
   );
};

export default SectionHeading;
