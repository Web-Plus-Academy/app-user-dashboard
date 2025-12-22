import React, { useState } from 'react';
import { Search, Wrench, Filter } from 'lucide-react';
import WorkshopCard from '@/components/workshops/WorkshopCard';
import { workshops } from '@/data/mockData';
import { toast } from 'sonner';

const Workshops: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredWorkshops = workshops.filter((workshop) => {
    const matchesSearch = workshop.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workshop.trainer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workshop.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'registered' && workshop.registered) ||
      (statusFilter === 'available' && !workshop.registered);

    return matchesSearch && matchesStatus;
  });

  const handleRegister = (id: string) => {
    toast.success('Successfully registered for the workshop!');
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 opacity-0 animate-fade-in">
        <h1 className="text-3xl font-display font-bold mb-2">Workshops</h1>
        <p className="text-muted-foreground">Hands-on learning sessions with industry experts</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search workshops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-12 w-full"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input-field w-48"
        >
          <option value="all">All Workshops</option>
          <option value="registered">Registered</option>
          <option value="available">Available</option>
        </select>
      </div>

      {/* Stats */}
      <div className="flex gap-6 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Wrench className="w-5 h-5 text-primary" />
          <span>{filteredWorkshops.length} workshops</span>
        </div>
        <div className="text-muted-foreground">
          {workshops.filter((w) => w.registered).length} registered
        </div>
      </div>

      {/* Workshops Grid */}
      {filteredWorkshops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredWorkshops.map((workshop, index) => (
            <WorkshopCard
              key={workshop.id}
              workshop={workshop}
              onRegister={handleRegister}
              delay={300 + index * 100}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <Wrench className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No workshops found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Workshops;
