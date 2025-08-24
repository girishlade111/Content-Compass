'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { suggestCtaAction } from '../actions';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2, Lightbulb, Rocket } from 'lucide-react';
import type { SuggestCTAOutput } from '@/ai/flows/cta-suggestion';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  contentTopic: z.string().min(3, 'Content topic is required.'),
  targetAudience: z.string().min(3, 'Target audience is required.'),
  productDescription: z.string().min(10, 'Product description must be at least 10 characters.'),
});

export function CtaClient() {
  const [result, setResult] = useState<SuggestCTAOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contentTopic: '',
      targetAudience: '',
      productDescription: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await suggestCtaAction(values);
      setResult(response);
    } catch (error) {
      console.error('Failed to generate CTA:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate CTA. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle>CTA Context</CardTitle>
          <CardDescription>Provide details to generate a tailored call-to-action.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="contentTopic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Improving Team Productivity'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Audience</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Project Managers in Tech'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your SaaS product briefly." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Suggest CTA
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {isLoading && (
            <div className="flex justify-center items-center h-full min-h-[300px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )}
        {result ? (
          <>
            <Card className="bg-primary/10 border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Rocket className="h-5 w-5" /> Suggested CTA</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-primary">"{result.callToAction}"</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5" /> Reasoning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{result.reasoning}</p>
              </CardContent>
            </Card>
          </>
        ) : !isLoading && (
            <Card className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-8 border-dashed">
                <Rocket className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">Your AI-generated CTA will appear here.</h3>
                <p className="text-muted-foreground text-sm">Fill out the form to get started.</p>
            </Card>
        )}
      </div>
    </div>
  );
}
