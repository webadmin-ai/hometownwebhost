#!/usr/bin/env node
import { GoogleGenAI } from '@google/genai';
import fs from 'node:fs';
import path from 'node:path';

process.loadEnvFile(new URL('../.env', import.meta.url));

const [, , prompt, outputPath] = process.argv;

if (!prompt) {
  console.error('Usage: node scripts/generate-image.mjs "<prompt>" [output-path]');
  process.exit(1);
}

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY is not set in .env');
  process.exit(1);
}

const model = process.env.GEMINI_IMAGE_MODEL || 'gemini-3.1-flash-image-preview';

const ai = new GoogleGenAI({ apiKey });

const response = await ai.models.generateContent({
  model,
  contents: prompt,
  config: { responseModalities: ['TEXT', 'IMAGE'] },
});

const parts = response.candidates?.[0]?.content?.parts ?? [];
const imagePart = parts.find((part) => part.inlineData?.data);

if (!imagePart) {
  console.error('No image was returned. Full response:');
  console.error(JSON.stringify(response, null, 2));
  process.exit(1);
}

const ext = imagePart.inlineData.mimeType?.split('/')[1] ?? 'png';
const dest = outputPath || path.join('generated', `${Date.now()}.${ext}`);

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, Buffer.from(imagePart.inlineData.data, 'base64'));

console.log(`Saved image to ${dest}`);
