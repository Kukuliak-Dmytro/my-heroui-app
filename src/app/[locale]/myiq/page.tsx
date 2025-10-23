import {
  BrainIcon,
  CareerIcon,
  HeroGraphIcon,
  LoveStyleIcon,
  PersonalityIcon,
  ReportCardIcon,
  RocketIcon,
  TestIcon,
} from "@/shared/assets/icons";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { RatingScale } from "@/shared/ui/rating-scale";
import { HeroAvatar } from "@/shared/ui/hero-avatar";
import { HowItWorksCard } from "@/shared/ui/cards/how-it-works.card.component";
import { TestCard } from "@/shared/ui/cards/test-card.component";

import { AbilityCard } from "@/shared/ui/cards/ability-card.component";
export default function MyIQPage() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative flex flex-col lg:flex-row items-center
          justify-center gap-8 lg:gap-4 overflow-hidden bg-gradient-to-b
          from-background via-[#EBF4FF] to-white mx-auto p-4 sm:p-8 lg:p-16
          xl:p-32 font-normal">
        <div
          className="flex flex-col items-center justify-center lg:items-start
            gap-4 sm:gap-6 w-full lg:w-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
            <span
              className="inline-block bg-gradient-to-r from-[#2C3345]
                to-[#424D6A] bg-clip-text text-transparent whitespace-nowrap">
              Want to Know Your
            </span>
            <br />
            <span
              className="bg-gradient-to-r from-[#27415F] via-[#007AFF]
                to-[#007AFF] bg-clip-text pr-2 text-transparent leading-tight">
              Real IQ Score?
            </span>
          </h1>
          <p className="font-normal text-sm sm:text-base lg:text-lg">
            Take our IQ test and unlock your path
            <br className="hidden sm:block" /> to self-discovery and development
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8
              items-center">
            <Button
              color="secondary"
              variant="solid"
              size="lg"
              endContent={<Icon icon="mdi:arrow-right" />}
              className="px-6 sm:px-8 w-full sm:w-auto">
              Start IQ Test Now
            </Button>
            <Button
              color="secondary"
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto">
              How it works
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
            <HeroAvatar></HeroAvatar>

            <div>
              <span className="flex items-center justify-center gap-1">
                <p className="text-sm sm:text-base">Excellent user reviews </p>
                <RatingScale rating={4.2} />
              </span>
              <span className="text-sm sm:text-base">
                12024 IQ tests taken today!
              </span>
            </div>
          </div>
        </div>
        <div
          className="w-full relative flex items-center justify-center
            order-first lg:order-last">
          <HeroGraphIcon />
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-white py-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#2c3345]
              text-center">
            How it Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
            <HowItWorksCard
              icon={<TestIcon />}
              title="Take a Test"
              description="Get an unbiased view of yourself"
            />
            <HowItWorksCard
              icon={<ReportCardIcon />}
              title="Get Your Detailed Report"
              description="Learn your strengths and discover areas for growth"
            />
            <HowItWorksCard
              icon={<RocketIcon />}
              title="Begin Your Journey"
              description="Start improving with expert courses and brain training"
            />
          </div>
        </div>
      </section>

      {/* Available Tests Section */}
      <section className="py-12 bg-[#f6fbff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2c3345] mb-4">
              Available Tests
            </h2>
            <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
              Each test reveals a new part of you. Start with intelligence, with
              more tests coming soon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TestCard
              icon={<BrainIcon />}
              title="IQ / Intelligence Test"
              duration="15 minutes"
              questions="25 questions"
              buttonText="Start IQ Test Now"
              isDisabled={false}
            />
            <TestCard
              icon={<PersonalityIcon />}
              title="Personality Type"
              duration="20 minutes"
              questions="90 questions"
              buttonText="Start Personality Test"
              isDisabled={false}
            />
            <TestCard
              icon={<LoveStyleIcon />}
              title="Love Style"
              duration="30 minutes"
              questions="120 questions"
              buttonText="Start Love Style Test"
              isDisabled={false}
            />
            <TestCard
              icon={<CareerIcon />}
              title="Career"
              duration="25 minutes"
              questions="35 questions"
              buttonText="Coming Soon"
              isDisabled={true}
            />
          </div>
        </div>
      </section>

      {/* Boost your abilities section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2c3345] mb-4">
              Boost your abilities
            </h2>
            <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
              Unlock your potential with our comprehensive training package
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AbilityCard
              number={1}
              title="Expert Video Courses"
              features={[
                "20+ hours of expert training",
                "Easy-to-follow lessons",
                "Learn at your own pace",
                "Track your progress",
              ]}
            />
            <AbilityCard
              number={2}
              title="Brain Training Games"
              features={[
                "Diverse cognitive training exercises",
                "Progressive difficulty levels",
                "Enhance 5 core mental skills: Memory, Logical reasoning, problem-solving mastery, focus and concentration.",
              ]}
            />
            <AbilityCard
              number={3}
              title="Puzzles"
              features={[
                "150+ Intelligence-Boosting Puzzles",
                "Smart Difficulty Progression",
                "Master essential brain functions: Pattern Recognition, Strategic Thinking, Analytical Reasoning.",
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
