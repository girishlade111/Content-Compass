import { PageHeader } from '@/components/page-header';
import { CalendarDays } from 'lucide-react';
import { CalendarClient } from './calendar-client';
import { mockContentPieces } from '@/lib/mock-data';

export default function CalendarPage() {
  return (
    <div>
      <PageHeader
        title="Editorial Calendar"
        description="Plan, schedule, and track your content."
        icon={CalendarDays}
      />
      <CalendarClient initialContent={mockContentPieces} />
    </div>
  );
}
