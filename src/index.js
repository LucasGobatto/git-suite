#!/usr/bin/env node

import runner from './scripts/new-runner.js';

const args = process.argv.slice(2);

runner(args);
