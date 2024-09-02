
# Telegram feed bot

A telegram robot that send Feed on a specific time to specific channel or chat. You can set custom source and config robot to get news from that source.


## Installation

Install this project with npm

```bash
  npm install my-project
  cd my-project
```
And then set telegram channel id and telegram bot token in .env file
```bash
  TELEGRAM_TOKEN = "YOUR BOT TOKEN"
  TELEGRAM_CHANNEL = "YOUR TELERAM CHANNEL"
```
For database you must use mongodb database and add this to .env file
```bash
  DATABASE_URL="Your MONGODB database connection string"
```
Project Works with cron-job and run checking feed for getting update in every day/hour/min that you set. default is 1 day which i set.
```bash
  CHECK_INTERVAL = 2
```
And for last, you must set source. for now these sources are static but i will fix that to be dynamic in furthur updates.
```bash
  ## DEV.TO Api Key
  DEVTO_KEY="YOUR DEV.TO API KEY"
  DEVTO_URL="https://dev.to/api/"

  ## Medium Api Key
  MEDIUM_URL="https://medium.com/"

  ## Science Api Key
  SCIENCE_URL="https://www.science.org/"

  ## Science Daily Api Key
  SCIENCEDAILY_URL="https://www.sciencedaily.com/"
```


## Usage/Examples

For runing in dev mode
```bash
  npm run dev
```

For executing with nodemon
```bash
  npm run exec
```

## TODO

- Dynamic configuration
- Advance Exception handler
- JSON/XML Selector
- etc...
## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors

- [@maziyar-redox](https://github.com/maziyar-redox)