import { GeminiModel } from '@editor/clients/gemini/gemini.enums';
import { OpenRouterModel } from '@editor/clients/openrouter/openrouter.enums';
import { generate } from '@editor/services/genai.service';
import { tryCatch } from '@editor/utils/try-catch';
import { z } from 'zod';
import { procedure, router } from '../trpc';
import { summariseTranscript } from '@editor/services/youtube.service';

export const appRouter = router({
  genai: {
    generate: procedure
      .input(
        z.object({
          messages: z
            .object({
              role: z.enum(['ai', 'user']).default('user'),
              text: z.string().default(''),
            })
            .array()
            .default([]),
          model: z
            .enum([
              GeminiModel.Gemini_2_5_Flash,
              GeminiModel.Gemini_2_0_Flash,
              GeminiModel.Gemini_2_0_Flash_Lite,
              GeminiModel.Gemini_1_5_Flash,
              GeminiModel.Gemini_1_5_Flash_8B,
              OpenRouterModel.Deepseek_R1,
              OpenRouterModel.Deepseek_V3,
              OpenRouterModel.Google_Gemma_3_27B,
              OpenRouterModel.Google_Gemma_3_12B,
              OpenRouterModel.Google_Gemma_3_4B,
              OpenRouterModel.Google_Gemma_3n_4B,
              OpenRouterModel.Google_Gemma_2_9B,
              OpenRouterModel.Meta_Llama_4_Maverick,
              OpenRouterModel.Meta_Llama_4_Scout,
              OpenRouterModel.Meta_Llama_3_3_70B_Instruct,
              OpenRouterModel.Meta_Llama_3_3_11B_Vision_Instruct,
              OpenRouterModel.Meta_Llama_3_3_8B_Instruct,
              OpenRouterModel.Meta_Llama_3_3_1B_Instruct,
              OpenRouterModel.Microsoft_MAI_DS_R1,
              OpenRouterModel.Mistral_AI_7B_Instruct,
              OpenRouterModel.Mistral_AI_Nemo,
              OpenRouterModel.Mistral_AI_Small_3_2,
              OpenRouterModel.Mistral_AI_Small_3_1,
              OpenRouterModel.Mistral_AI_Small_24B,
              OpenRouterModel.Moonshot_AI_Kimi_Dev_72b,
              OpenRouterModel.Moonshot_AI_Kimi_VL_A3B_Thinking,
              OpenRouterModel.NVIDIA_3_1_Nemotron_Ultra_253B_V1,
              OpenRouterModel.NVIDIA_3_3_Nemotron_Super_49B_V1,
              OpenRouterModel.Qwen_3_235B_A22B,
              OpenRouterModel.Qwen_3_32B,
              OpenRouterModel.Qwen_3_30B_A3B,
              OpenRouterModel.Qwen_3_14B,
              OpenRouterModel.Qwen_3_8B,
              OpenRouterModel.Qwen_3_4B,
              OpenRouterModel.Qwen_2_5_VL_72B_Instruct,
              OpenRouterModel.Qwen_2_5_VL_32B_Instruct,
            ])
            .default(GeminiModel.Gemini_2_5_Flash),
        }),
      )
      .mutation(async (options): Promise<{ text: string }> => {
        const { messages = [], model = GeminiModel.Gemini_2_5_Flash } =
          options.input;
        const { data, error } = await tryCatch(
          generate({ messages, model: model as GeminiModel | OpenRouterModel }),
        );
        if (error) {
          console.error('Error generating content:', error);
          return { text: 'An error occurred while generating content.' };
        }
        if (!data) {
          return { text: 'No response generated.' };
        }
        const output: string = data.output ?? 'No response generated.';
        return { text: output };
      }),
  },
  youtube: {
    transcript: {
      summarise: procedure
        .input(z.object({ videoId: z.string().default('') }))
        .mutation(async (options) => {
          const { videoId } = options.input;
          const { data, error } = await tryCatch(
            summariseTranscript({ videoId }),
          );
          if (error) {
            return { summary: error.message };
          }
          if (!data) {
            return { summary: 'No Summary.' };
          }
          return { summary: data.summary ?? 'No Summary.' };
        }),
    },
  },
});
// export type definition of API
export type AppRouter = typeof appRouter;
