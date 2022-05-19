# precursor-spc-node-validator

A backup script for the RISC project with Precursor SPC, written in NodeJS in case the existing Python implementation becomes untenable. Handles the reading of earthquake-related data, the posting of said data to a database of user's choice (currently utilizing SQLite3) with checks for minimizing duplicate data, and the tweeting of said data to a Twitter account of the user's choice.

Tools Used:
- NodeJS
- PrismaJS
- DotEnv
- Twitter-API-v2 JS
- SQLite3
