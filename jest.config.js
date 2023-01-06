const { COVERAGE_LOCAL } = process.env;

module.exports = COVERAGE_LOCAL === '1' ? {} : {
  coverageReporters: [
    "text",
    "cobertura"
  ]
};
