import React from 'react';
import { Calendar, Clock, Users, User } from 'lucide-react';
import { Event } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: Event;
  onRegister?: (id: string) => void;
  delay?: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRegister, delay = 0 }) => {
  const getTypeColor = () => {
    switch (event.type) {
      case 'webinar':
        return 'bg-primary/20 text-primary';
      case 'workshop':
        return 'bg-accent/20 text-accent';
      case 'conference':
        return 'bg-warning/20 text-warning';
      case 'meetup':
        return 'bg-success/20 text-success';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const isPast = new Date(event.date) < new Date();

  return (
    <div
      className={cn(
        'course-card overflow-hidden opacity-0 animate-fade-in',
        isPast && 'opacity-70'
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        <div className="absolute top-4 left-4">
          <span className={cn('px-3 py-1 rounded-full text-xs font-medium capitalize', getTypeColor())}>
            {event.type}
          </span>
        </div>
        {event.registered && (
          <div className="absolute top-4 right-4">
            <span className="status-badge completed">Registered</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-display font-semibold mb-3 line-clamp-2">
          {event.name}
        </h3>

        {/* Meta Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4 text-primary" />
            <span>{event.speaker}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span>{event.attendees.toLocaleString()} attending</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Action Button */}
        {isPast ? (
          <button className="btn-secondary w-full" disabled>
            Event Ended
          </button>
        ) : event.registered ? (
          <button className="btn-secondary w-full">
            View Details
          </button>
        ) : (
          <button
            onClick={() => onRegister?.(event.id)}
            className="btn-primary w-full"
          >
            Register Now
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
