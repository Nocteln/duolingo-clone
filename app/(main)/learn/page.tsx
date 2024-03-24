import { FeedWrapper } from "@/components/FeedWrapper";
import { StickyWrapper } from "@/components/StickyWrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/UserProgress";
import {
  getCourseProgress,
  getCourses,
  getLessonPercentage,
  getUnits,
  getUserProgress,
} from "@/db/queries";
import { redirect } from "next/navigation";
import { Unit } from "./unit";

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const unitsData = getUnits();
  const courseProgressData = getCourseProgress();
  const LessonPercentageData = getLessonPercentage();

  const [userProgress, units, courseProgress, LessonPercentage] =
    await Promise.all([
      userProgressData,
      unitsData,
      courseProgressData,
      LessonPercentageData,
    ]);

  if (!userProgress || !userProgress.activeCourse || !courseProgress) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6 ">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson}
              activeLessonPercentage={LessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};
export default LearnPage;
