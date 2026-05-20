module.exports = {
  default: {
    require: ["step_definitions/**/*.ts", "support/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: [
      "@cucumber/pretty-formatter",
      "html:cucumber-report.html",
      "allure-cucumberjs/reporter",
    ],
    paths: ["features/**/*.feature"],
    publishQuiet: true,
    timeout: 30000,
  },
};
