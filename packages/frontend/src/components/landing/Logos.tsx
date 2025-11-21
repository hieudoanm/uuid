// components/Logos.tsx
import alibabaQwen from '@uuid/svg/alibaba-qwen.svg';
import anthropicClaude from '@uuid/svg/anthropic-claude.svg';
import deepseek from '@uuid/svg/deepseek.svg';
import googleGemini from '@uuid/svg/google-gemini.svg';
import metaLlama from '@uuid/svg/meta-llama.svg';
import microsoftCopilot from '@uuid/svg/microsoft-copilot.svg';
import mistral from '@uuid/svg/mistral.svg';
import moonshotAIKimi from '@uuid/svg/moonshootai-kimi.svg';
import nvidia from '@uuid/svg/nvidia.svg';
import openAIChatGPT from '@uuid/svg/openai-chatgpt.svg';
import perplexity from '@uuid/svg/perplexity.svg';
import xGrok from '@uuid/svg/xai-grok.svg';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

type Logo = { id: string; src: string; alt: string; href: string };

const logos: Logo[] = [
  {
    id: 'alibaba-qwen',
    src: alibabaQwen.src,
    alt: 'Alibaba Qwen',
    href: 'https://qwen.aliyun.com',
  },
  {
    id: 'anthropic-claude',
    src: anthropicClaude.src,
    alt: 'Anthropic Claude',
    href: 'https://www.anthropic.com',
  },
  {
    id: 'deepseek',
    src: deepseek.src,
    alt: 'Deepseek',
    href: 'https://deepseek.com',
  },
  {
    id: 'google-gemini',
    src: googleGemini.src,
    alt: 'Google Gemini',
    href: 'https://gemini.google.com',
  },
  {
    id: 'meta-llama',
    src: metaLlama.src,
    alt: 'Meta Llama',
    href: 'https://ai.meta.com/llama/',
  },
  {
    id: 'uuidsoft-copilot',
    src: microsoftCopilot.src,
    alt: 'uuidsoft Copilot',
    href: 'https://copilot.uuidsoft.com',
  },
  {
    id: 'mistral',
    src: mistral.src,
    alt: 'Mistral',
    href: 'https://mistral.ai',
  },
  {
    id: 'nvidia',
    src: nvidia.src,
    alt: 'NVIDIA',
    href: 'https://www.nvidia.com',
  },
  {
    id: 'moonshotai-kimi',
    src: moonshotAIKimi.src,
    alt: 'MoonshotAI Kimi',
    href: 'https://kimi.moonshot.cn',
  },
  {
    id: 'openai-chatgpt',
    src: openAIChatGPT.src,
    alt: 'OpenAI ChatGPT',
    href: 'https://chat.openai.com',
  },
  {
    id: 'perplexity',
    src: perplexity.src,
    alt: 'Perplexity',
    href: 'https://www.perplexity.ai',
  },
  { id: 'xai-grok', src: xGrok.src, alt: 'x.ai Grok', href: 'https://x.ai' },
];

export const Logos: FC = () => {
  return (
    <section className="px-6 py-16">
      <h2 className="mb-6 text-center text-sm tracking-wider text-neutral-400 uppercase">
        Powered by Top Models
      </h2>
      <div className="mx-auto grid max-w-4xl grid-cols-4 items-center justify-center gap-4 md:grid-cols-6 lg:grid-cols-12">
        {logos.map(({ id, src, alt, href }) => (
          <Link
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 items-center justify-center">
            <Image src={src} alt={alt} title={alt} width={32} height={32} />
          </Link>
        ))}
      </div>
    </section>
  );
};
