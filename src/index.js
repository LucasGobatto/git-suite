#!/usr/bin/env node

import runner from "./scripts/runner.js";

const args = process.argv.slice(2);

runner(args);
