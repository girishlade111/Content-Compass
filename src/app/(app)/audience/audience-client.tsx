'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { AudienceProfile } from '@/lib/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Edit2, UserPlus, Trash2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Profile name is required.'),
  demographics: z.string().min(10, 'Demographics are required.'),
  painPoints: z.string().min(10, 'Pain points are required.'),
  goals: z.string().min(10, 'Goals are required.'),
});

const mockProfiles: AudienceProfile[] = [
    {
        name: 'Project Managers',
        demographics: 'Ages 30-50, working in mid-to-large tech companies. Tech-savvy and responsible for team performance.',
        painPoints: 'Inefficient workflows, poor team communication, missing deadlines, budget overruns.',
        goals: 'Improve team productivity, deliver projects on time and within budget, streamline processes.'
    }
];

export function AudienceClient() {
  const [profiles, setProfiles] = useState<AudienceProfile[]>(mockProfiles);
  const [editingProfile, setEditingProfile] = useState<AudienceProfile | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      demographics: '',
      painPoints: '',
      goals: '',
    },
  });

  function handleEdit(profile: AudienceProfile) {
    setEditingProfile(profile);
    form.reset(profile);
  }

  function handleCancelEdit() {
    setEditingProfile(null);
    form.reset({ name: '', demographics: '', painPoints: '', goals: '' });
  }
  
  function handleDelete(profileName: string) {
    setProfiles(profiles.filter(p => p.name !== profileName));
    toast({
        title: 'Profile Deleted',
        description: `The "${profileName}" profile has been removed.`,
    });
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (editingProfile) {
      setProfiles(profiles.map(p => p.name === editingProfile.name ? values : p));
      toast({
        title: 'Profile Updated',
        description: `The "${values.name}" profile has been saved.`,
      });
    } else {
      if (profiles.some(p => p.name === values.name)) {
        form.setError('name', { message: 'A profile with this name already exists.' });
        return;
      }
      setProfiles([...profiles, values]);
      toast({
        title: 'Profile Created',
        description: `The "${values.name}" profile has been added.`,
      });
    }
    handleCancelEdit();
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-1">
        <Card>
            <CardHeader>
                <CardTitle>{editingProfile ? 'Edit Profile' : 'Create Profile'}</CardTitle>
                <CardDescription>{editingProfile ? 'Modify the details of your audience profile.' : 'Add a new audience profile to tailor content.'}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Profile Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Startup Founders" {...field} disabled={!!editingProfile} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="demographics"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Demographics</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Describe their age, role, industry, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="painPoints"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Pain Points</FormLabel>
                        <FormControl>
                            <Textarea placeholder="What problems do they face?" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="goals"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Goals</FormLabel>
                        <FormControl>
                            <Textarea placeholder="What are they trying to achieve?" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className="flex gap-2">
                        {editingProfile && (
                            <Button type="button" variant="outline" onClick={handleCancelEdit}>
                                Cancel
                            </Button>
                        )}
                        <Button type="submit" className="flex-1">
                            {editingProfile ? 'Save Changes' : 'Create Profile'}
                        </Button>
                    </div>
                </form>
                </Form>
            </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2 space-y-4">
        {profiles.map(profile => (
            <Card key={profile.name}>
                <CardHeader className="flex flex-row items-start justify-between">
                    <div>
                        <CardTitle>{profile.name}</CardTitle>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(profile)}><Edit2 className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(profile.name)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div>
                        <h4 className="font-semibold mb-1">Demographics</h4>
                        <p className="text-muted-foreground">{profile.demographics}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-1">Pain Points</h4>
                        <p className="text-muted-foreground">{profile.painPoints}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-1">Goals</h4>
                        <p className="text-muted-foreground">{profile.goals}</p>
                    </div>
                </CardContent>
            </Card>
        ))}
        {profiles.length === 0 && (
            <Card className="flex flex-col items-center justify-center h-full text-center p-8 border-dashed min-h-[300px]">
                <UserPlus className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No Audience Profiles Yet</h3>
                <p className="text-muted-foreground text-sm">Create your first profile to get started.</p>
            </Card>
        )}
      </div>
    </div>
  );
}
