import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import { defineConfig } from 'eslint/config';
import baseConfig from '../../eslint.config.mjs';

const eslintConfig = defineConfig([...nextVitals, ...nextTs, ...baseConfig]);

export default eslintConfig;
