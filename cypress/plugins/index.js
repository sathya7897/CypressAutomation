/// <reference types="cypress" />

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const fs = require('fs');
const XLSX = require('xlsx');

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  const getDataFromExcel = (specName) => {
    console.log(specName);
    const buf = fs.readFileSync('cypress/fixtures/Data.xls');
    const workbook = XLSX.read(buf, {
      type: 'buffer'
    });
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[specName]);
    console.log(rows.length, rows);
    return rows;
  }

  const getDateString = (serial) => {
    console.log(serial);
    let utc_days = Math.floor(serial - 25569);
    let utc_value = utc_days * 86400;
    let date_info = new Date(utc_value * 1000);
    let fractional_day = serial - Math.floor(serial) + 0.0000001;
    let total_seconds = Math.floor(86400 * fractional_day);
    let seconds = total_seconds % 60;
    total_seconds -= seconds;
    let hours = Math.floor(total_seconds / (60 * 60));
    let minutes = Math.floor(total_seconds / 60) % 60;
    let DateObj = new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
    let dd = DateObj.getDate();
    let mm = DateObj.getMonth() + 1;
    let yyyy = DateObj.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    return dd + '/' + mm + '/' + yyyy;
  }

  on('task', {
    getDataFromExcel: getDataFromExcel,
    getDateString: getDateString
  })
}