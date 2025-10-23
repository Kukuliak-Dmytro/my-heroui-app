import { ClockIcon, QuestionIcon } from "@/shared/assets/icons";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { ReactNode } from "react";
interface ITestCard {
  icon: ReactNode;
  title: string;
  duration: string;
  questions: string;
  buttonText: string;
  isDisabled?: boolean;
  onStart?: () => void;
}

interface ITestCardProps extends ITestCard {
  className?: string;
}

export const TestCard = ({
  icon,
  title,
  duration,
  questions,
  buttonText,
  isDisabled = false,
  onStart,
  className = "",
}: ITestCardProps) => {
  return (
    <div
      className={`bg-white border-1 border-[#d9e7ff] rounded-[14px] p-6
        shadow-sm hover:shadow-md transition-shadow duration-200 font-normal
        flex flex-col justify-center gap-2.5 ${className}`}>
      <div className="flex">
        <div className="w-12 h-12 flex items-center justify-start">{icon}</div>
      </div>
      <h3 className="text-lg font-semibold text-[#2c3345]">{title}</h3>
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2 text-sm text-[#454f69]">
          <ClockIcon />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#454f69]">
          <QuestionIcon />
          <span>{questions}</span>
        </div>
      </div>

      {/* Button */}
      <Button
        color="secondary"
        variant="solid"
        className="w-full"
        disabled={isDisabled}
        endContent={<Icon icon="mdi:arrow-right" className="w-4 h-4" />}
        onPress={onStart}>
        {buttonText}
      </Button>
    </div>
  );
};
