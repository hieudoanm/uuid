import {
  GeminiRole,
  generateContent,
} from '@editor/clients/gemini/gemini.client';
import { GeminiModel } from '@editor/clients/gemini/gemini.enums';
import {
  complete,
  OpenRouterRole,
} from '@editor/clients/openrouter/openrouter.client';
import { OpenRouterModel } from '@editor/clients/openrouter/openrouter.enums';
import { tryCatch } from '@editor/utils/try-catch';

export const generate = async ({
  messages = [],
  model,
}: {
  messages: { role: 'ai' | 'user'; text: string }[];
  model: GeminiModel | OpenRouterModel;
}): Promise<{ output: string; model: GeminiModel | OpenRouterModel }> => {
  if (Object.values(GeminiModel).includes(model as GeminiModel)) {
    const contents = messages.map((message) => {
      return {
        role: message.role === 'user' ? GeminiRole.User : GeminiRole.Model,
        parts: [{ text: message.text }],
      };
    });
    const { data, error } = await tryCatch(
      generateContent({ contents, model: model as GeminiModel }),
    );
    if (error) {
      console.error('Error generating content:', error);
      return { output: 'An error occurred while generating content.', model };
    }
    if (!data) {
      return { output: 'No response generated.', model };
    }
    const output: string =
      data.candidates.at(0)?.content.parts.at(0)?.text ??
      'No response generated.';
    return { output, model };
  } else if (
    Object.values(OpenRouterModel).includes(model as OpenRouterModel)
  ) {
    const openRouterMessages = messages.map((message) => ({
      role:
        message.role === 'user'
          ? OpenRouterRole.User
          : OpenRouterRole.Assistant,
      content: message.text,
    }));
    const { data, error } = await tryCatch(
      complete({
        messages: openRouterMessages,
        model: model as OpenRouterModel,
      }),
    );
    if (error) {
      console.error('Error generating content:', error);
      return { model, output: 'An error occurred while generating content.' };
    }
    const output: string =
      data.choices.at(0)?.message.content ?? 'No response generated.';
    return { model, output };
  }
  return { model, output: 'Model not supported.' };
};
