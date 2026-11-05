module.exports = {
    default: {
        paths: ['cucumber_Features/**/*.feature'],
        require: ['cucumber_Features/step_definitions/**/*.js'],
        format: ['progress-bar', 'html:cucumber-report.html'],
        parallel: 2,
        publishQuiet: true,
    },
};
