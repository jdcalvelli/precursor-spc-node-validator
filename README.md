# precursor-spc-node-validator

A backup script for the Center for RISC at UChicago's project with Precursor SPC, written in NodeJS in case the existing Python implementation becomes untenable. The Center for RISC is building out the infrastructure to serve as an independent validator of Precursor SPC's novel earthquake prediction algorithm. As such, the script handles the reading of earthquake-related data, the posting of said data to a database of user's choice (currently utilizing SQLite3) with checks for minimizing duplicate data, and the tweeting of said data to a Twitter account of the user's choice.

Tools Used:
- NodeJS
- PrismaJS
- DotEnv
- Twitter-API-v2 JS
- SQLite3
