import React from 'react';
import { Clock, Users, Star, ArrowRight } from 'lucide-react';
import { Course } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
  onView?: (courseId: string) => void;
  delay?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll, onView, delay = 0 }) => {
  const getStatusBadge = () => {
    switch (course.status) {
      case 'completed':
        return <span className="status-badge completed">Completed</span>;
      case 'in-progress':
        return <span className="status-badge in-progress">In Progress</span>;
      default:
        return <span className="status-badge not-started">Not Started</span>;
    }
  };

  return (
    <div
      className="course-card opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/90 text-primary-foreground">
            {course.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          {getStatusBadge()}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-display font-semibold mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-warning fill-warning" />
            <span>{course.rating}</span>
          </div>
        </div>

        {/* Progress Bar (if enrolled) */}
        {course.enrolled && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{course.progress}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Instructor */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            By <span className="text-foreground">{course.instructor}</span>
          </p>

          {course.enrolled ? (
            <button
              onClick={() => onView?.(course.id)}
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => onEnroll?.(course.id)}
              className="btn-primary text-sm py-2"
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
