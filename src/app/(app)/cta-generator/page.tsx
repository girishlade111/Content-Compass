import { PageHeader } from '@/components/page-header';
import { Rocket } from 'lucide-react';
import { CtaClient } from './cta-client';

export default function CtaGeneratorPage() {
    return (
        <div>
            <PageHeader
                title="CTA Generator"
                description="Create compelling calls-to-action with AI."
                icon={Rocket}
            />
            <CtaClient />
        </div>
    )
}
