import React from 'react';
import { MapPin, Clock, DollarSign, Calendar } from 'lucide-react';
import { Internship } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface InternshipCardProps {
  internship: Internship;
  onApply?: (id: string) => void;
  delay?: number;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship, onApply, delay = 0 }) => {
  const getStatusBadge = () => {
    switch (internship.applicationStatus) {
      case 'applied':
        return <span className="status-badge applied">Applied</span>;
      case 'shortlisted':
        return <span className="status-badge shortlisted">Shortlisted</span>;
      case 'selected':
        return <span className="status-badge selected">Selected</span>;
      case 'rejected':
        return <span className="status-badge bg-destructive/20 text-destructive">Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div
      className="course-card p-6 opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-display font-semibold mb-1">
            {internship.role}
          </h3>
          <p className="text-primary font-medium">{internship.company}</p>
        </div>
        {getStatusBadge()}
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {internship.description}
      </p>

      {/* Meta Info */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          <span>{internship.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4 text-primary" />
          <span>{internship.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <DollarSign className="w-4 h-4 text-primary" />
          <span>{internship.stipend}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 text-primary" />
          <span>Due: {new Date(internship.deadline).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {internship.skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 rounded-lg text-xs bg-secondary text-secondary-foreground"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Action Button */}
      {internship.applicationStatus === 'not-applied' ? (
        <button
          onClick={() => onApply?.(internship.id)}
          className="btn-primary w-full"
        >
          Apply Now
        </button>
      ) : (
        <button className="btn-secondary w-full" disabled>
          {internship.applicationStatus === 'selected'
            ? 'Congratulations! 🎉'
            : 'Application Submitted'}
        </button>
      )}
    </div>
  );
};

export default InternshipCard;
