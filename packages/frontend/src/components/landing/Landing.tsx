import { CallToAction } from '@micro/components/landing/CallToAction';
import { Features } from '@micro/components/landing/Features';
import { Footer } from '@micro/components/landing/Footer';
import { Hero } from '@micro/components/landing/Hero';
import { Logos } from '@micro/components/landing/Logos';
import { Divider } from '@micro/components/shared/Divider';
import { Linear } from '@micro/components/shared/Linear';
import { Navbar } from '@micro/components/shared/Navbar';
import { FC } from 'react';

const content = {
  landing: {
    hero: {
      headline: 'The Ultimate In-Browser Toolkit for Devs & Makers',
      tagline:
        'Generate UUIDs, and more — all locally, instantly, and without signups.',
      action: 'Go to Pomodoro',
      href: '/apps/pomodoro',
    },
    features: {
      title: 'Blazing-Fast Tools — All in Your Browser',
      subtitle:
        'From pomodoro to text converters, calculators — every feature works offline, with privacy built-in. No accounts. No uploads.',
      // List of features with descriptions and links
      // Each feature has an id, href, title, and description
      features: [
        {
          id: 'doi',
          title: '🔗 DOI Reference Lookup',
          description:
            'Retrieve and format scholarly references from DOI links in APA style.',
          href: '/apps/doi',
        },
        {
          id: 'pomodoro',
          title: '⏳ Pomodoro Timer',
          description:
            'Boost focus and productivity with guided Pomodoro sessions.',
          href: '/apps/pomodoro',
        },
        {
          id: 'uuid',
          title: '🆔 UUID Generator',
          description: 'Generate secure UUIDs locally with zero tracking.',
          href: '/apps/uuid',
        },
      ],
    },
    callToAction: {
      title: 'All-in-One Productivity & Dev Suite — No Installs Required',
      subtitle:
        'Whether you’re editing code, converting formats, or generating visuals — do it all, instantly, right in your browser.',
      action: 'Go to Pomodoro',
      href: '/apps/pomodoro',
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
