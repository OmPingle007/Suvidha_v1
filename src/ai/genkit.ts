import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import { gemini15Flash, geminiPro } from 'genkitx-googleai';


if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'PASTE_YOUR_GEMINI_API_KEY_HERE' || !process.env.GEMINI_API_KEY.startsWith('AIza')) {
  throw new Error(
    'CRITICAL ERROR: Your Gemini API Key is missing or invalid.\n\nPlease get your API key from Google AI Studio (https://aistudio.google.com/app/apikey) and paste it into the .env file.\n\nThe key should start with "AIza".'
  );
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
  models: [
    geminiPro,
    gemini15Flash,
  ],
});
