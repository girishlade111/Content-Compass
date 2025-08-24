import { PageHeader } from '@/components/page-header';
import { Lightbulb } from 'lucide-react';
import { IdeationClient } from './ideation-client';

export default function IdeationPage() {
    return (
        <div>
            <PageHeader
                title="Content Ideation"
                description="Generate content ideas and titles with AI."
                icon={Lightbulb}
            />
            <IdeationClient />
        </div>
    )
}
