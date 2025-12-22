import React from 'react';
import { BookOpen, Briefcase, Calendar, Wrench, Award, Clock, TrendingUp } from 'lucide-react';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import StatCard from '@/components/dashboard/StatCard';
import CourseCard from '@/components/courses/CourseCard';
import { courses, userStats } from '@/data/mockData';
import { toast } from 'sonner';

const Dashboard: React.FC = () => {
  const enrolledCourses = courses.filter((c) => c.enrolled);

  const handleContinueCourse = (courseId: string) => {
    toast.info('Opening course...');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <WelcomeSection />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 mb-8">
        <StatCard
          title="Courses Enrolled"
          value={userStats.enrolledCourses}
          icon={BookOpen}
          trend={{ value: 0, isPositive: true }}
          delay={100}
        />
        <StatCard
          title="Internships Done"
          value={userStats.registeredInternships}
          icon={Briefcase}
          trend={{ value: 25, isPositive: true }}
          delay={200}
        />
        <StatCard
          title="Events Attended"
          value={userStats.eventsAttended}
          icon={Calendar}
          trend={{ value: 50, isPositive: true }}
          delay={300}
        />
        <StatCard
          title="Workshops Attended"
          value={userStats.workshopsRegistered}
          icon={Wrench}
          trend={{ value: 60, isPositive: false }}
          delay={400}
        />
        {/* <StatCard
          title="Certificates Earned"
          value={userStats.certificatesEarned}
          icon={Award}
          delay={500}
        /> */}
      </div>

      {/* Secondary Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <StatCard
          title="Hours Learned"
          value={`${userStats.hoursLearned}h`}
          icon={Clock}
          delay={600}
        />
        <StatCard
          title="Skills Gained"
          value={userStats.skillsGained}
          icon={TrendingUp}
          delay={700}
        />
      </div> */}

      {/* Continue Learning Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-display font-bold">Continue Learning</h2>
            <p className="text-muted-foreground">Pick up where you left off</p>
          </div>
          <a href="/courses" className="text-primary hover:underline flex items-center gap-1">
            View all courses
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.slice(0, 3).map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              onView={handleContinueCourse}
              delay={800 + index * 100}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0 animate-fade-in" style={{ animationDelay: '1100ms' }}>
        <div className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold">Explore Internships</h3>
              <p className="text-sm text-muted-foreground">Find your dream role at top companies</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-display font-semibold">Upcoming Events</h3>
              <p className="text-sm text-muted-foreground">Join live sessions with industry experts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
