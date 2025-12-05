type HeaderInfo = {
  title: string;
  subtitle: string;
  description: string;
};

const SectionHeader = ({ headerInfo }: { headerInfo: HeaderInfo }) => {
  const { title, subtitle, description } = headerInfo;

  return (
    <div className="animate-fade-up mx-auto text-center">
      <div className="bg-zumthor dark:border-strokedark dark:bg-blacksection mb-3 inline-block rounded-full px-3 py-1 sm:mb-4 sm:px-4.5 sm:py-1.5 dark:border">
        <span className="font-body text-xs font-medium text-black select-none sm:text-sm md:text-base dark:text-white">
          {title}
        </span>
      </div>

      <h2 className="font-heading mx-auto mb-3 text-2xl leading-tight font-bold text-black select-none sm:mb-4 sm:text-3xl md:w-4/5 md:text-4xl xl:w-1/2 xl:text-5xl dark:text-white">
        {subtitle}
      </h2>

      <p className="font-body mx-auto text-sm leading-relaxed text-gray-700 select-none sm:text-base md:w-4/5 md:text-lg lg:w-3/5 xl:w-[46%] dark:text-gray-300">
        {description}
      </p>
    </div>
  );
};

export default SectionHeader;
