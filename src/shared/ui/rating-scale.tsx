import { StarIcon } from "@/shared/assets/icons";

interface IRatingScaleProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
}

export const RatingScale = ({
  rating,
  maxRating = 5,
  size = 17,
  className = "",
}: IRatingScaleProps) => {
  const renderStar = (index: number) => {
    const starRating = Math.max(0, Math.min(rating - index, 1));
    const isPartial = starRating > 0 && starRating < 1;
    const isFilled = starRating >= 1;

    if (isPartial) {
      return (
        <div key={index} className="relative">
          {/* Background star (empty) */}
          <StarIcon fill="currentColor" size={size} className="text-gray-300" />
          {/* Foreground star (partial fill) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: `inset(0 ${(1 - starRating) * 100}% 0 0)`,
            }}>
            <StarIcon
              fill="currentColor"
              size={size}
              className="text-yellow-400"
            />
          </div>
        </div>
      );
    }

    return (
      <StarIcon
        key={index}
        fill={isFilled ? "#f7b635" : "#e5e7eb"}
        size={size}
      />
    );
  };

  return (
    <div className={`flex items-center ${className}`}>
      {Array.from({ length: maxRating }).map((_, index) => renderStar(index))}
    </div>
  );
};
