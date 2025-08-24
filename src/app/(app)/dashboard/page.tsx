import { PageHeader } from '@/components/page-header';
import { LayoutDashboard } from 'lucide-react';
import { DashboardClient } from './dashboard-client';
import { mockPerformanceData, mockContentPieces } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function DashboardPage() {
  const totalViews = mockPerformanceData.reduce((acc, item) => acc + item.views, 0);
  const totalShares = mockPerformanceData.reduce((acc, item) => acc + item.shares, 0);
  const totalConversions = mockPerformanceData.reduce((acc, item) => acc + item.conversions, 0);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Your content performance at a glance."
        icon={LayoutDashboard}
      />
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalViews.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Shares</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalShares.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalConversions.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />
      
      <DashboardClient 
        performanceData={mockPerformanceData}
        contentPieces={mockContentPieces} 
      />
    </div>
  );
}
