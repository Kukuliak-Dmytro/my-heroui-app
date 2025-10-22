interface IHowItWorksCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface IHowItWorksCardProps extends IHowItWorksCard {
  className?: string;
}

export const HowItWorksCard = ({
  icon,
  title,
  description,
  className = "",
}: IHowItWorksCardProps) => {
  return (
    <div
      className={`bg-white border-1 border-[#d9e7ff] rounded-[14px] p-6
        ${className}`}>
      <div className="mb-4 flex justify-left">{icon}</div>
      <p className="text-lg text-[#2c3345] mb-3 font-semibold">{title}</p>
      <p className="text-sm text-[#0d0d0e] leading-relaxed font-normal">
        {description}
      </p>
    </div>
  );
};
