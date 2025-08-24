'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  CalendarDays,
  Lightbulb,
  Rocket,
  Users,
  Compass,
  Github,
  Linkedin,
  Instagram,
  Mail,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Code } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/calendar', label: 'Calendar', icon: CalendarDays },
  { href: '/ideation', label: 'Ideation', icon: Lightbulb },
  { href: '/cta-generator', label: 'CTA Generator', icon: Rocket },
  { href: '/audience', label: 'Audience', icon: Users },
];

const socialLinks = [
  { href: 'https://instagram.com/girish_lade_/', label: 'Instagram', icon: Instagram },
  { href: 'https://linkedin.com/in/girish-lade-075bba201/', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://github.com/girishlade111', label: 'GitHub', icon: Github },
  { href: 'https://codepen.io/Girish-Lade-the-looper', label: 'CodePen', icon: Code },
  { href: 'mailto:girishlade111@gmail.com', label: 'Email', icon: Mail },
]

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Compass className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-semibold text-sidebar-foreground">
              Content Compass
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref legacyBehavior>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center justify-center gap-2 group-data-[collapsible=icon]:gap-4 group-data-[collapsible=icon]:flex-col">
            {socialLinks.map(link => (
              <Link href={link.href} key={link.href} target="_blank" rel="noopener noreferrer">
                <SidebarMenuButton tooltip={link.label} size="icon" className="group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8">
                  <link.icon className="h-4 w-4" />
                </SidebarMenuButton>
              </Link>
            ))}
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="p-4 md:p-8 flex flex-col min-h-svh">
          <div className="md:hidden flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
                <Compass className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold">Content Compass</h1>
             </div>
            <SidebarTrigger />
          </div>
          <main className="flex-grow">
            {children}
          </main>
          <footer className="text-center text-sm text-muted-foreground mt-8">
            <div className="md:hidden flex justify-center gap-4 mb-4">
               {socialLinks.map(link => (
                  <Link href={link.href} key={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      <link.icon className="h-5 w-5" />
                  </Link>
               ))}
            </div>
             © {new Date().getFullYear()} Content Compass. All rights reserved.
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
