import React, { useState } from 'react';
import { Search, Briefcase, Filter } from 'lucide-react';
import InternshipCard from '@/components/internships/InternshipCard';
import { internships } from '@/data/mockData';
import { toast } from 'sonner';

const Internships: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch = internship.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || internship.applicationStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleApply = (id: string) => {
    toast.success('Application submitted successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 opacity-0 animate-fade-in">
        <h1 className="text-3xl font-display font-bold mb-2">Internships</h1>
        <p className="text-muted-foreground">Discover opportunities at top companies</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by role, company..."
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
          <option value="all">All Status</option>
          <option value="not-applied">Not Applied</option>
          <option value="applied">Applied</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="selected">Selected</option>
        </select>
      </div>

      {/* Stats */}
      <div className="flex gap-6 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Briefcase className="w-5 h-5 text-primary" />
          <span>{filteredInternships.length} opportunities</span>
        </div>
        <div className="text-muted-foreground">
          {internships.filter((i) => i.applicationStatus !== 'not-applied').length} applications
        </div>
      </div>

      {/* Internship Grid */}
      {filteredInternships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInternships.map((internship, index) => (
            <InternshipCard
              key={internship.id}
              internship={internship}
              onApply={handleApply}
              delay={300 + index * 100}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No internships found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Internships;
