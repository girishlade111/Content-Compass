'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateContentIdeasAction } from '../actions';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  keywords: z.string().min(3, { message: 'Please enter at least 3 characters.' }),
});

export function IdeationClient() {
  const [ideas, setIdeas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keywords: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setIdeas([]);
    try {
      const result = await generateContentIdeasAction(values);
      if (result.ideas) {
        setIdeas(result.ideas);
      }
    } catch (error) {
      console.error('Failed to generate ideas:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate content ideas. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8">
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keywords</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., SaaS productivity, remote collaboration, project management"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Ideas
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
         <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
         </div>
      )}

      {ideas.length > 0 && (
        <Card>
            <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Generated Ideas</h3>
                <ul className="space-y-3 list-decimal list-inside">
                    {ideas.map((idea, index) => (
                        <li key={index} className="bg-muted/50 p-3 rounded-md">{idea}</li>
                    ))}
                </ul>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
