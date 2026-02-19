module.exports = {
  default: {
    require: ['src/step-definitions/**/*.js', 'src/hooks/**/*.js'],
    requireModule: ['@babel/register'],
    format: [
      'progress-bar',
      'html:test-results/cucumber-report.html',
      'json:test-results/cucumber-report.json',
      '@cucumber/pretty-formatter',
    ],
    formatOptions: { snippetInterface: 'async-await' },
    parallel: process.env.PARALLEL ? parseInt(process.env.PARALLEL) : 1,
    dryRun: false,
    failFast: process.env.FAIL_FAST === 'true',
    strict: true,
    tags: process.env.TAGS || '',
  },
};
