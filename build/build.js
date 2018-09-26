process.env.NODE_ENV = 'production'
const os = require('os');
const chalk = require('chalk')
const works = os.cpus().length - 1;
const run = require('parallel-webpack').run;
const configPath = require.resolve('./webpack.prod.js');

run(configPath, {
  watch: false,
  maxRetries: 1,
  stats: {
    colors: true,
    errors: true,
    warnings: false,
    modules: false,
    chunks: false
  },
  maxConcurrentWorkers: works  // 最小取2
}, (err, stats) => {
  if (err) {
    throw err.message || err.stack
  }

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
})
