import { CheckMarkIcon } from "@/shared/assets/icons";

interface IAbilityCard {
  number: number;
  title: string;
  features: string[];
  className?: string;
}

export const AbilityCard = ({
  number,
  title,
  features,
  className = "",
}: IAbilityCard) => {
  return (
    <div
      className={`bg-white border-1 border-[#d9e7ff] rounded-[14px] p-4
        shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col
        gap-3 ${className}`}>
      <div className="flex justify-start">
        <div
          className="w-[42px] h-[42px] bg-gradient-to-r from-[#007AFF]
            to-[#7cb7f8] rounded-full flex items-center justify-center p-[3px]">
          <span
            className="bg-white font-semibold text-sm rounded-full w-full h-full
              flex items-center justify-center aspect-square text-[20px]">
            {number}
          </span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#2c3345]">{title}</h3>

      <div className="flex flex-col gap-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start justify-start gap-2">
            <div className="flex-shrink-0 mt-0.5">
              <CheckMarkIcon />
            </div>
            <span className="text-sm text-[#454f69] leading-relaxed">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
