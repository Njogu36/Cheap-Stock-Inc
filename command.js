#!/usr/bin/env node

// Import libraries.

const program = require('commander');
const csv = require('csvtojson')
const request = require('request');
const { args } = require('commander');

// Requere the cheap stock supported currencies data:

const url = 'https://focusmobile-interview-materials.s3.eu-west-3.amazonaws.com/Cheap.Stocks.Internationalization.Currencies.csv';

// Console error & success colors:

const error_color = "\x1b[31m";
const success_color = "\x1b[32m";

// A function find_currency that has arguement name:

const find_currency = (currency) => {

    // Convert the csv data into json data:

    csv()
        .fromStream(request.get(url))
        .then((results) => {

            // Conditions

            if (results.length > 0) {
                // Filter the results
                const find_currency = results.filter((item) => {
                    // The filter will return an array.
                    
                    return item['ISO 4217 Code'] === currency
                })

                if (find_currency.length > 0) {
                    console.info( `Currency ${currency} is supported.`);
                }

                else if (find_currency.length < 1) {
                    console.error(error_color, 'Currency is not supported! Please try again later.');
                }

            }
            else if (results.length < 1) {
                console.error(error_color, 'Cheap Stock currency data is currently unavailable. Please try again later.');
            }


        }).catch((error) => {
            // Network error
            console.error(error_color,'Network error! Please try again later.');
        })

}

// Program version & description:

program
    .version('1.0.0')
    .description('Cheap Stock Command Line Application.')

// Describe the program commands *Flags* here and the callback functions:

program
    .command('find <currency>')
    .alias('f')
    .description('Find a supported currency.')
    .action((currency) => {
        find_currency(currency)  // Callback function:
    })

program.parse(args) // Explicit, node conventions
