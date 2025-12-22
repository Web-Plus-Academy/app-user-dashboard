import React, { useState } from 'react';
import { Search, Calendar, Filter } from 'lucide-react';
import EventCard from '@/components/events/EventCard';
import { events } from '@/data/mockData';
import { toast } from 'sonner';

const Events: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [timeFilter, setTimeFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const now = new Date();

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || event.type === typeFilter;
    
    const eventDate = new Date(event.date);
    const matchesTime = timeFilter === 'all' ||
      (timeFilter === 'upcoming' && eventDate >= now) ||
      (timeFilter === 'past' && eventDate < now);

    return matchesSearch && matchesType && matchesTime;
  });

  const handleRegister = (id: string) => {
    toast.success('Successfully registered for the event!');
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 opacity-0 animate-fade-in">
        <h1 className="text-3xl font-display font-bold mb-2">Events</h1>
        <p className="text-muted-foreground">Join live sessions, webinars, and networking events</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-12 w-full"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as 'all' | 'upcoming' | 'past')}
            className="input-field w-36"
          >
            <option value="all">All Events</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="input-field w-36"
          >
            <option value="all">All Types</option>
            <option value="webinar">Webinar</option>
            <option value="workshop">Workshop</option>
            <option value="conference">Conference</option>
            <option value="meetup">Meetup</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-6 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-5 h-5 text-primary" />
          <span>{filteredEvents.length} events</span>
        </div>
        <div className="text-muted-foreground">
          {events.filter((e) => e.registered).length} registered
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={handleRegister}
              delay={300 + index * 100}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No events found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Events;
