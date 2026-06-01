#!/usr/bin/env node

import { config } from 'dotenv';

config();

import runner from './scripts/runner.js';

const args = process.argv.slice(2);

runner(args);
