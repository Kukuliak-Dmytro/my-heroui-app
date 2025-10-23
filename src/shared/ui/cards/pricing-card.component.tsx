import { VerifiedIcon } from "@/shared/assets/icons";
import { Button } from "@heroui/button";

interface IPricingCard {
  title: string;
  price: string;
  billingPeriod: string;
  features: string[];
  buttonText?: string;
  className?: string;
}

export const PricingCard = ({
  title,
  price,
  billingPeriod,
  features,
  buttonText = "Get started",
  className = "",
}: IPricingCard) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-8 shadow-sm
        ${className}`}>
      <h3 className="text-lg font-semibold text-[#2c3345] mb-4 uppercase">
        {title}
      </h3>

      <div className="mb-6">
        <span className="text-4xl font-bold text-[#2c3345]">{price}</span>
        <span className="text-sm text-[#6b7280] ml-2">{billingPeriod}</span>
      </div>

      <div className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <VerifiedIcon />
            <span className="text-sm text-[#454f69]">{feature}</span>
          </div>
        ))}
      </div>

      <Button
        color="primary"
        variant="solid"
        className="w-full bg-[#20B2AA] hover:bg-[#1a9a94] text-white
          font-semibold py-3">
        {buttonText}
      </Button>
    </div>
  );
};
