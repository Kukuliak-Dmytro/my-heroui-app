import { LatestResultsCard } from "./latest-results-card.component";

interface IResultEntry {
  flagIcon: string;
  name: string;
  iqScore: number;
  isHighlighted?: boolean;
}

interface ILatestResultsSection {
  results: IResultEntry[];
}

export const LatestResultsSection = ({ results }: ILatestResultsSection) => {
  // Split results into two columns
  const leftColumn = results.filter((_, index) => index % 2 === 0);
  const rightColumn = results.filter((_, index) => index % 2 === 1);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2c3345]">
            Latest results
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-6">
            {leftColumn.map((result, index) => (
              <LatestResultsCard
                key={`left-${index}`}
                flagIcon={result.flagIcon}
                name={result.name}
                iqScore={result.iqScore}
                isHighlighted={result.isHighlighted}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {rightColumn.map((result, index) => (
              <LatestResultsCard
                key={`right-${index}`}
                flagIcon={result.flagIcon}
                name={result.name}
                iqScore={result.iqScore}
                isHighlighted={result.isHighlighted}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
