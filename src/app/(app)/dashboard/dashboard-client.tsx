'use client';

import { Bar, BarChart } from 'recharts';
import type { PerformanceMetric, ContentPiece } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import type { ChartConfig } from '@/components/ui/chart';

interface DashboardClientProps {
  performanceData: PerformanceMetric[];
  contentPieces: ContentPiece[];
}

const chartConfig = {
  views: { label: 'Views', color: 'hsl(var(--primary))' },
  shares: { label: 'Shares', color: 'hsl(var(--accent))' },
  conversions: { label: 'Conversions', color: 'hsl(var(--chart-3))' },
} satisfies ChartConfig;

export function DashboardClient({ performanceData, contentPieces }: DashboardClientProps) {
  const recentlyPublished = contentPieces
    .filter(p => p.status === 'Published')
    .sort((a, b) => b.publicationDate.getTime() - a.publicationDate.getTime())
    .slice(0, 5);

  return (
    <div className="grid gap-8">
       <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
            <BarChart
              accessibilityLayer
              data={performanceData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <cartesianGrid vertical={false} />
              <xAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <yAxis
                 tickFormatter={(value) => `${value / 1000}k`}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="views" fill="var(--color-views)" radius={4} />
              <Bar dataKey="shares" fill="var(--color-shares)" radius={4} />
              <Bar dataKey="conversions" fill="var(--color-conversions)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recently Published Content</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Published On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentlyPublished.map((piece) => (
                <TableRow key={piece.id}>
                  <TableCell className="font-medium">{piece.title}</TableCell>
                  <TableCell><Badge variant="secondary">{piece.type}</Badge></TableCell>
                  <TableCell>{format(piece.publicationDate, 'MMM d, yyyy')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
