import React from 'react';
import { Calendar, Clock, Users, User, CheckCircle } from 'lucide-react';
import { Workshop } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface WorkshopCardProps {
  workshop: Workshop;
  onRegister?: (id: string) => void;
  delay?: number;
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({ workshop, onRegister, delay = 0 }) => {
  const getAttendanceBadge = () => {
    switch (workshop.attendanceStatus) {
      case 'attended':
        return (
          <span className="status-badge completed flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Attended
          </span>
        );
      case 'upcoming':
        return <span className="status-badge in-progress">Upcoming</span>;
      default:
        return null;
    }
  };

  const spotsLeft = workshop.capacity - workshop.enrolled;
  const isFull = spotsLeft === 0;

  return (
    <div
      className="course-card p-6 opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-display font-semibold mb-1">
            {workshop.topic}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4 text-primary" />
            <span>by {workshop.trainer}</span>
          </div>
        </div>
        {workshop.registered && getAttendanceBadge()}
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {workshop.description}
      </p>

      {/* Meta Info */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 text-primary" />
          <span>{workshop.schedule}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4 text-primary" />
          <span>{workshop.duration}</span>
        </div>
      </div>

      {/* Capacity */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground flex items-center gap-1">
            <Users className="w-4 h-4" />
            Capacity
          </span>
          <span className={cn('font-medium', isFull ? 'text-destructive' : 'text-foreground')}>
            {workshop.enrolled}/{workshop.capacity}
          </span>
        </div>
        <div className="progress-bar">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              isFull ? 'bg-destructive' : ''
            )}
            style={{
              width: `${(workshop.enrolled / workshop.capacity) * 100}%`,
              background: isFull ? undefined : 'var(--gradient-primary)',
            }}
          />
        </div>
        {!isFull && (
          <p className="text-xs text-muted-foreground mt-1">
            {spotsLeft} spots left
          </p>
        )}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {workshop.skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 rounded-lg text-xs bg-secondary text-secondary-foreground"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Action Button */}
      {workshop.registered ? (
        <button className="btn-secondary w-full">
          {workshop.attendanceStatus === 'attended' ? 'View Certificate' : 'View Details'}
        </button>
      ) : isFull ? (
        <button className="btn-secondary w-full" disabled>
          Workshop Full
        </button>
      ) : (
        <button
          onClick={() => onRegister?.(workshop.id)}
          className="btn-primary w-full"
        >
          Register Now
        </button>
      )}
    </div>
  );
};

export default WorkshopCard;
