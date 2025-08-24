'use client';

import { useState } from 'react';
import type { ContentPiece, ContentStatus } from '@/lib/types';
import { ContentCard } from '@/components/content-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CalendarClientProps {
  initialContent: ContentPiece[];
}

const statuses: ContentStatus[] = ['Backlog', 'Scheduled', 'In Progress', 'Published'];

export function CalendarClient({ initialContent }: CalendarClientProps) {
  const [contentPieces, setContentPieces] = useState<ContentPiece[]>(initialContent);

  const contentByStatus = (status: ContentStatus) => {
    return contentPieces.filter((p) => p.status === status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
      {statuses.map((status) => (
        <div key={status} className="flex flex-col gap-4">
          <Card className="bg-muted/50 h-full">
            <CardHeader>
              <CardTitle className="text-lg">{status} ({contentByStatus(status).length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contentByStatus(status).length > 0 ? (
                contentByStatus(status).map((piece) => (
                  <ContentCard key={piece.id} content={piece} />
                ))
              ) : (
                <div className="text-center text-muted-foreground py-10">No content in this stage.</div>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
