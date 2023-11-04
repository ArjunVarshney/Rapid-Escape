interface SectionSubHeadingProps {
   title: string;
}

const SectionSubHeading: React.FC<SectionSubHeadingProps> = ({ title }) => {
   return (
      <div className="px-4">
         <h2 className="text-5xl font-semibold text-muted-foreground tracking-tight inline capitalize">
            {title}
         </h2>
      </div>
   );
};

export default SectionSubHeading;
