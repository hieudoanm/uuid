import { CallToAction } from '@editor/components/landing/CallToAction';
import { Features } from '@editor/components/landing/Features';
import { Footer } from '@editor/components/landing/Footer';
import { Hero } from '@editor/components/landing/Hero';
import { Logos } from '@editor/components/landing/Logos';
import { Divider } from '@editor/components/shared/Divider';
import { Linear } from '@editor/components/shared/Linear';
import { Navbar } from '@editor/components/shared/Navbar';
import { FC } from 'react';

const content = {
  landing: {
    hero: {
      headline: 'The Ultimate In-Browser Toolkit for Devs & Makers',
      tagline:
        'Generate UUIDs, and more — all locally, instantly, and without signups.',
      action: 'Go to Pomodoro',
      href: '/clock/pomodoro',
    },
    features: {
      title: 'Blazing-Fast Tools — All in Your Browser',
      subtitle:
        'From clock utilities to text converters, calculators — every feature works offline, with privacy built-in. No accounts. No uploads.',
      // List of features with descriptions and links
      // Each feature has an id, href, title, and description
      features: [
        // Clock
        {
          id: 'pomodoro-timer',
          title: '⏳ Pomodoro Timer',
          description:
            'Boost focus and productivity with guided Pomodoro sessions.',
          href: '/clock/pomodoro',
        },
        {
          id: 'timezone-viewer',
          title: '🌍 Timezone Viewer',
          description: 'Compare global timezones at a glance.',
          href: '/clock/timezones',
        },
        // Dev
        {
          id: 'dev-manifest',
          title: '📘 Manifest Editor for PWA & Extensions',
          description:
            'Edit and validate manifest.json files for Progressive Web Apps and browser extensions with intelligent suggestions and structure-aware editing.',
          href: '/dev/manifest',
        },
        {
          id: 'dev-uuid',
          title: '🆔 UUID Generator',
          description: 'Generate secure UUIDs locally with zero tracking.',
          href: '/dev/uuid',
        },
        // Other
        {
          id: 'doi-tool',
          title: '🔗 DOI Reference Lookup',
          description:
            'Retrieve and format scholarly references from DOI links in APA style.',
          href: '/other/doi',
        },
        {
          id: 'football-tool',
          title: '🔗 Football Formation',
          description: 'Football Formation tools for Liverpool',
          href: '/other/football',
        },
        {
          id: 'status-dashboard',
          title: '📊 Status Monitor',
          description: 'Check the current system status and service uptime.',
          href: '/other/status',
        },
      ],
    },
    callToAction: {
      title: 'All-in-One Productivity & Dev Suite — No Installs Required',
      subtitle:
        'Whether you’re editing code, converting formats, or generating visuals — do it all, instantly, right in your browser.',
      action: 'Go to Status',
      href: '/other/status',
    },
  },
};

export const Landing: FC = () => {
  return (
    <div className="min-h-screen w-full bg-neutral-900 text-neutral-100">
      <Linear.Background />
      <div className="relative z-10">
        <Navbar />
        <Divider />
        <Hero
          headline={content.landing.hero.headline}
          tagline={content.landing.hero.tagline}
          action={content.landing.hero.action}
          href={content.landing.hero.href}
        />
        <Divider />
        <Features
          title={`${content.landing.features.title} (${content.landing.features.features.length})`}
          subtitle={content.landing.features.subtitle}
          features={content.landing.features.features}
        />
        <Divider />
        <Logos />
        <Divider />
        <CallToAction
          title={content.landing.callToAction.title}
          subtitle={content.landing.callToAction.subtitle}
          action={content.landing.callToAction.action}
          href={content.landing.callToAction.href}
        />
        <Divider />
        <Footer />
      </div>
    </div>
  );
};
