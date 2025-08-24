import { PageHeader } from '@/components/page-header';
import { Users } from 'lucide-react';
import { AudienceClient } from './audience-client';

export default function AudiencePage() {
    return (
        <div>
            <PageHeader
                title="Audience Profiles"
                description="Define and manage your target customer personas."
                icon={Users}
            />
            <AudienceClient />
        </div>
    )
}
