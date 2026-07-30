import * as sharedTailwindConfig from './../../node_modules/@clay/tailwind-preset/tailwind.config';

export const presets = [sharedTailwindConfig];

export const content = [
  './**/*.{html,scss,ts,css,mjs}',
  './../../node_modules/@clay/app-shell/esm2022/**/*.mjs',
  './../../node_modules/@clay/app-shell/styles/*.{scss,css}',
  './../../node_modules/@clay/ui-commons/esm2022/**/*.mjs',
  './../../node_modules/@clay/ui-commons/styles/*.{scss,css}',
  './../../node_modules/@clay/ui-components/esm2022/**/*.mjs',
];
