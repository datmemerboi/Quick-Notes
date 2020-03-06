Quick Notes
=
## Electron.js | MongoDB

A desktop software which works with Electron and data storage in MongoDB.

Built on Linux Environment (elementaryOS)

### Requirements
**Electronjs**, **MongoDB**, **MongoClient** module

Default Mongo connection:`mongodb://localhost:27017`

Database: `Quick`

Collection: `Notes`

### Note
The files `src/createBackup` and `src/manualBackup` are meant to be run from current directory of entire app & navigating inside /src would further spawn child /backup folders. Running it from within the app is most advisable.