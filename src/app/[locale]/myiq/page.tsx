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
import { Link } from "@/shared/lib/i18n/navigation";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { RatingScale } from "@/shared/ui/rating-scale";
import { HeroAvatar } from "@/shared/ui/hero-avatar";
import { HowItWorksCard } from "@/shared/ui/cards/how-it-works.card.component";
import { TestCard } from "@/shared/ui/cards/test-card.component";
import { AbilityCard } from "@/shared/ui/cards/ability-card.component";
import { GetCard } from "@/shared/ui/cards/get-card.component";
import { PricingCard } from "@/shared/ui/cards/pricing-card.component";
import { LatestResultsSection } from "@/shared/ui/cards/latest-results-section.component";

export default function MyIQPage() {
  // Mock data for latest results - 2 whites, 2 blues pattern horizontally
  const latestResults = [
    {
      flagIcon: "flag:pl-4x3",
      name: "Lewandowska Maja",
      iqScore: 102,
      isHighlighted: false,
    },
    {
      flagIcon: "flag:ro-4x3",
      name: "Marin Sofia",
      iqScore: 101,
      isHighlighted: false,
    },
    {
      flagIcon: "flag:ro-4x3",
      name: "Dinu Andreea",
      iqScore: 96,
      isHighlighted: true,
    },
    {
      flagIcon: "flag:by-4x3",
      name: "Новиков Андрей",
      iqScore: 91,
      isHighlighted: true,
    },
    {
      flagIcon: "flag:by-4x3",
      name: "Новиков Александр",
      iqScore: 92,
      isHighlighted: false,
    },
    {
      flagIcon: "flag:pl-4x3",
      name: "Nowak Franciszek",
      iqScore: 103,
      isHighlighted: false,
    },
    {
      flagIcon: "flag:pl-4x3",
      name: "Wójcik Antoni",
      iqScore: 97,
      isHighlighted: true,
    },
    {
      flagIcon: "flag:ua-4x3",
      name: "Бойко Максим",
      iqScore: 107,
      isHighlighted: true,
    },
  ];

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

      {/* What will u get section */}
      <section className="py-12 bg-[#f6fbff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2c3345] mb-4">
              What will you get
            </h2>
          </div>
          <div className="relative">
            {/* Left blur edge */}
            <div
              className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r
                from-[#f6fbff] to-transparent z-10 pointer-events-none
                xl:hidden"
            />

            {/* Scrollable container */}
            <div
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4
                xl:overflow-x-visible xl:justify-center"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              <GetCard
                description="Authenticated intelligence certification validated by cognitive science experts"
                className="flex-shrink-0 w-80 xl:w-auto xl:flex-1 xl:max-w-xs"
              />
              <GetCard
                description="Deep-dive analysis revealing your complete cognitive potential and capabilities"
                className="flex-shrink-0 w-80 xl:w-auto xl:flex-1 xl:max-w-xs"
              />
              <GetCard
                description="Scientifically-calibrated training tools designed by neuroscience specialists"
                className="flex-shrink-0 w-80 xl:w-auto xl:flex-1 xl:max-w-xs"
              />
              <GetCard
                description="Expert-crafted educational content based on leading cognitive research"
                className="flex-shrink-0 w-80 xl:w-auto xl:flex-1 xl:max-w-xs"
              />
              <GetCard
                description="Advanced reasoning exercises designed by neural specialists"
                className="flex-shrink-0 w-80 xl:w-auto xl:flex-1 xl:max-w-xs"
              />
            </div>

            {/* Right blur edge */}
            <div
              className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l
                from-[#f6fbff] to-transparent z-10 pointer-events-none
                xl:hidden"
            />
          </div>
        </div>
      </section>

      {/* Community section */}
      <section className="py-12 bg-[#f6fbff]">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between
            items-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-[#2c3345]">Community</h1>
            <p className="text-md text-[#6b7280]">
              Follow us on social media for daily quizzes, challenges and brain
              teasers to keep your mind sharp
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="https://x.com/MyIQapp"
              className="w-24 h-12 flex items-center justify-center border-1
                border-[#007aff] rounded-lg">
              <Icon icon="ri:twitter-x-fill" className="w-8 h-8" />
            </Link>
            <Link
              href="https://www.instagram.com/myiq_com/#"
              className="w-24 h-12 flex items-center justify-center border-1
                border-[#007aff] rounded-lg">
              <Icon icon="mdi:instagram" className="w-8 h-8" />
            </Link>
            <Link
              href="https://www.facebook.com/MyIQapp"
              className="w-24 h-12 flex items-center justify-center border-1
                border-[#007aff] rounded-lg">
              <Icon icon="mdi:facebook" className="w-8 h-8" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2c3345] mb-4">
              Explore our plans
            </h2>
            <p className="text-lg text-[#6b7280] max-w-3xl mx-auto">
              Discover our flexible offers and choose the one that best suits
              your learning and personal development journey.
            </p>
          </div>

          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="BI-WEEKLY SUBSCRIPTION"
              price="€729.99"
              billingPeriod="/2 weeks"
              features={[
                "7-day trial, auto-renews to bi-weekly plan thereafter",
                "Personalized IQ Certificate",
                "Comprehensive Cognitive Analysis",
                "Full Access to Development Tools",
              ]}
            />

            <PricingCard
              title="MONTHLY EXCELLENCE"
              price="€1459.99"
              billingPeriod="/month"
              features={[
                "Maximum Savings on Long-Term Growth",
                "Complete Cognitive Assessment Suite",
                "20+ Hours of Expert-Led Courses",
                "Personalized Development Path",
              ]}
            />
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-[#6b7280]">
              *Visit our{" "}
              <Link href="/pricing" className="underline">
                pricing_page
              </Link>{" "}
              to find out more details.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#f6fbff]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left side - Title */}
            <div className="lg:w-1/3">
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#2C3345]
                  leading-tight">
                Frequently Asked Questions
              </h2>
            </div>

            {/* Right side - Accordion */}
            <div className="lg:w-2/3">
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-[#2C3345] mb-2">
                    What if I'm not satisfied with the program?
                  </h3>
                  <p className="text-[#6B7280]">
                    We're confident that you'll see the value and benefits of
                    myIQ, but if you're not satisfied or you are experiencing
                    technical issues, you might be eligible for refund. See our{" "}
                    <Link
                      href="/refund-policy"
                      className="text-[#007AFF] underline hover:text-[#0056CC]
                        transition-colors">
                      Refund Policy
                    </Link>{" "}
                    to learn more.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-[#2C3345] mb-2">
                    How do I cancel my subscription?
                  </h3>
                  <p className="text-[#6B7280]">
                    Canceling is simple and takes less than a few minutes. Visit
                    our{" "}
                    <Link
                      href="/help-center"
                      className="text-[#007AFF] underline hover:text-[#0056CC]
                        transition-colors">
                      Help Center
                    </Link>{" "}
                    and follow the instructions. You'll maintain access until
                    the end of your current billing period.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-[#2C3345] mb-2">
                    How long does the IQ test take?
                  </h3>
                  <p className="text-[#6B7280]">
                    Our IQ test takes up to 20 minutes to complete. Each test
                    must be finished in one sitting and cannot be paused, as
                    this ensures the most accurate results. Please plan for
                    uninterrupted time before starting any test.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-[#2C3345] mb-2">
                    Can I retake tests?
                  </h3>
                  <p className="text-[#6B7280]">
                    Yes! You can retake tests after completing recommended
                    training modules to track your progress and improvement over
                    time.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-[#2C3345] mb-2">
                    Can I access myIQ on multiple devices?
                  </h3>
                  <p className="text-[#6B7280]">
                    Absolutely! Your myIQ account works seamlessly across all
                    your devices. Simply log in with your credentials on any
                    device to access your tests, progress, and training
                    materials.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-[#2C3345] mb-2">
                    Is my personal data secure?
                  </h3>
                  <p className="text-[#6B7280]">
                    Yes, we take data security very seriously. All your personal
                    information and test results are encrypted and stored
                    securely. We never share your data with third parties
                    without your explicit consent.
                  </p>
                </div>

                <div className="pb-4">
                  <h3 className="text-lg font-semibold text-[#2C3345] mb-2">
                    What makes your IQ test different from others?
                  </h3>
                  <p className="text-[#6B7280]">
                    Our IQ test is scientifically validated and designed by
                    cognitive science experts. It provides detailed analysis of
                    your cognitive strengths and areas for improvement, along
                    with personalized recommendations for development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Results Section */}
      <LatestResultsSection results={latestResults} />
    </div>
  );
}
