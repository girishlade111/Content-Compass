import type { ContentPiece } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Calendar, Users, Linkedin, Twitter, Facebook, Mail, Rss, FileText, Newspaper, Presentation, VideoIcon } from 'lucide-react';
import type { Icon as LucideIcon } from 'lucide-react';

const typeIcons: Record<ContentPiece['type'], LucideIcon> = {
  'Blog Post': FileText,
  'Whitepaper': Newspaper,
  'Case Study': Users,
  'Webinar': Presentation,
  'Social Media': VideoIcon,
};

const channelIcons: Record<string, LucideIcon> = {
  'Blog': Rss,
  'LinkedIn': Linkedin,
  'Twitter': Twitter,
  'Facebook': Facebook,
  'Email': Mail,
};

export function ContentCard({ content }: { content: ContentPiece }) {
    const TypeIcon = typeIcons[content.type];

    return (
        <Card className="mb-4 bg-card hover:shadow-md transition-shadow duration-200">
            <CardHeader>
                <CardTitle className="text-base font-semibold leading-tight">{content.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3 pt-0">
                <div className="flex items-center gap-2">
                    <TypeIcon className="h-4 w-4" />
                    <span>{content.type}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{content.targetAudience}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{format(content.publicationDate, 'MMM dd, yyyy')}</span>
                </div>
            </CardContent>
            <CardFooter>
                 <div className="flex flex-wrap gap-2">
                    {content.channels.map(channel => {
                        const ChannelIcon = channelIcons[channel];
                        return (
                            <Badge key={channel} variant="outline" className="flex items-center gap-1.5 pr-2.5 pl-2 py-1">
                                {ChannelIcon && <ChannelIcon className="h-3.5 w-3.5" />}
                                {channel}
                            </Badge>
                        );
                    })}
                </div>
            </CardFooter>
        </Card>
    )
}
