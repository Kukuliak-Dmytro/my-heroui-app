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
      <div className="mb-4 flex">
        <div className="w-12 h-12 flex items-center justify-start">{icon}</div>
      </div>
      <h3 className="text-lg font-semibold text-[#2c3345] mb-4">{title}</h3>
      <div className="flex items-center justify-between gap-2 mb-6">
        <div
          className="flex items-center justify-center gap-2 text-sm
            text-[#454f69]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7z"></path>
          </svg>
          <span>{duration}</span>
        </div>
        <div
          className="flex items-center justify-center gap-2 text-sm
            text-[#454f69]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 20 20">
            <path
              fill="currentColor"
              d="M1.668 9.126a.5.5 0 0 1 .706.042l3.647 4.104L16.147 3.146a.5.5 0 1 1 .707.708l-10.5 10.5a.5.5 0 0 1-.728-.022l-4-4.5a.5.5 0 0 1 .042-.706M11 13a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2zm6.5 3h-4a.5.5 0 1 0 0 1h4a.5.5 0 1 0 0-1m-4-3a.5.5 0 1 0 0 1h4a.5.5 0 1 0 0-1z"></path>
          </svg>
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
