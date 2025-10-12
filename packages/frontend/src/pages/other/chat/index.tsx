import { GeminiModel } from '@editor/clients/gemini/gemini.enums';
import { OpenRouterModel } from '@editor/clients/openrouter/openrouter.enums';
import { Message, Messages } from '@editor/components/apps/chat/Messages';
import { Glass } from '@editor/components/shared/Glass';
import { APP_NAME } from '@editor/constants/app';
import { MODELS } from '@editor/constants/models';
import { groupBy } from '@editor/utils/group-by';
import { scrollToBottom } from '@editor/utils/scroll';
import { trpcClient } from '@editor/utils/trpc';
import { tryCatch } from '@editor/utils/try-catch';
import { NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { PiPaperclipBold, PiPaperPlaneRightFill } from 'react-icons/pi';
import Tesseract from 'tesseract.js';

const ChatPage: NextPage = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const onInputPaste = () => {
    const ta = textareaRef.current!;
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  };

  const [
    {
      message = 'Explain GenAI in a few words',
      messages = [],
      model = OpenRouterModel.Deepseek_R1,
    },
    setState,
  ] = useState<{
    message: string;
    messages: Message[];
    model: GeminiModel | OpenRouterModel;
  }>({
    message: 'Explain GenAI in a few words',
    messages: [],
    model: OpenRouterModel.Deepseek_R1,
  });

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (loading) return;
    if (!message) return;
    const oldMessages = [
      ...messages,
      { text: message, role: 'user', loading: false },
    ]
      .filter(({ loading }) => !loading)
      .map(({ role, text }) => ({ role: role as 'user' | 'ai', text }));
    setState((previous) => {
      const newUserMessage: Message = {
        text: previous.message,
        role: 'user',
        loading: false,
        model,
      };
      const newAiMessage: Message = {
        text: '',
        role: 'ai',
        loading: true,
        model,
      };
      const newMessages = [...previous.messages, newUserMessage, newAiMessage];
      return { ...previous, message: '', messages: newMessages };
    });
    const { data, error } = await tryCatch(
      trpcClient.genai.generate.mutate({ messages: oldMessages, model }),
    );
    let text = '';
    if (error) {
      console.error('Error generating content:', error, data);
      text = 'An error occurred while generating content.';
    }
    if (!data) {
      console.error('No data returned from the server.');
      text = 'No response generated.';
    }
    const { text: newText = '' } = data!;
    text = newText;
    setState((previous) => {
      const newMessages = previous.messages.map((message) => {
        if (message.role === 'ai' && message.loading) {
          return { ...message, text, loading: false };
        }
        return message;
      });
      return { ...previous, messages: newMessages };
    });
  };

  const loading: boolean = messages.some((message) => message.loading);

  return (
    <div className="h-screen w-screen bg-neutral-900 text-neutral-100">
      <div className="container mx-auto flex h-full flex-col space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <Link href="/">
            <h1 className="text-xl font-black">{APP_NAME}</h1>
          </Link>
          <div className="flex items-center justify-between gap-x-2 md:gap-x-4">
            {messages.length > 0 && (
              <Glass.Button
                type="button"
                onClick={() => {
                  setState((previous) => ({
                    ...previous,
                    message: '',
                    messages: [],
                  }));
                  scrollToBottom('messages');
                }}>
                New Chat
              </Glass.Button>
            )}
          </div>
        </div>
        <Messages messages={messages} />
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center rounded-2xl bg-neutral-800 p-2">
          <textarea
            autoComplete="off"
            id="message"
            name="message"
            placeholder="Ask anything ..."
            className="w-full resize-none overflow-hidden p-2 focus:outline-none"
            ref={textareaRef}
            onInput={onInputPaste}
            onPaste={onInputPaste}
            rows={1}
            value={message}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              const message: string = event.target.value;
              setState((previous) => ({ ...previous, message }));
            }}></textarea>
          <div className="flex w-full items-center justify-between gap-x-2 p-2">
            <div className="w-full max-w-sm truncate overflow-hidden">
              <select
                id="model"
                name="model"
                className="w-full appearance-none font-black focus:outline-none"
                value={model}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  setState((previous) => ({
                    ...previous,
                    model: event.target.value as GeminiModel,
                  }));
                }}>
                {Object.entries(groupBy(MODELS, 'company')).map(
                  ([company, models]) => {
                    return (
                      <optgroup key={company} label={company}>
                        {models.map(({ label, value }) => {
                          return (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          );
                        })}
                      </optgroup>
                    );
                  },
                )}
              </select>
            </div>
            <div className="flex items-center gap-x-2 md:gap-x-4">
              <label
                htmlFor="file-upload"
                className="cursor-pointer rounded-full text-neutral-100">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  disabled={loading}
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      // Run OCR with Tesseract
                      const {
                        data: { text },
                      } = await Tesseract.recognize(
                        file, // file or URL or blob
                        'eng', // language
                        {
                          logger: (m) => console.log(m), // progress logs
                        },
                      ); // Handle upload logic here
                      setState((previous) => ({ ...previous, message: text }));
                      onInputPaste();
                    }
                  }}
                />
                <PiPaperclipBold className="text-xl" />
              </label>
              <button
                type="submit"
                className="cursor-pointer rounded-full bg-neutral-100 p-2 text-neutral-900"
                disabled={loading}>
                <PiPaperPlaneRightFill />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
