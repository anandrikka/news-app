'use strict';

var CronJob = require('cron').CronJob;
/*
 # ┌────────────── second - (00-59)
 # │ ┌──────────── minute -  (00-59)
 # │ │ ┌────────── hour -  (00-23)
 # │ │ │ ┌──────── day of month - (01-31)
 # │ │ │ │ ┌────── month - (00-11)
 # │ │ │ │ │ ┌──── day of week -  0-6
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
 ----------------------------------------------
 Examples:

 1. 1-59 * * * * *  - For Every Second
 2. 00 00 00 * * *  - Every Day at 12'o Clock
 3. 30 1-59 * * * * - Every Minute at 30 seconds
 4. 0 *\/1 * * * * -  For Every Minute
------------------------------------------------
 Options:

 cronTime - The time to fire off your job. This can be in the form of cron syntax or a JS Date object
 onTick - The function to fire at the specified time.
 onComplete - A function that will fire when the job is complete, when it is stopped.
 start - Specifies whether to start the job just before exiting the constructor. By default this is set to false
 timeZone - Specify the timezone for the execution
 runOnInit - This will immediately fire your onTick function as soon as the requisit initialization has happened. This option is set to false by default for backwards compatability.

*/
var firebaseDataServices = require('./firebase/firebase-data-service');
var countriesRef = firebaseDataServices.countriesRef;

countriesRef.once('value').then(function (countriesSnapshot) {
    var countries = countriesSnapshot.val();
    var totalCountries = countries.length;
    var newArticleJobs = [];
    var cleanupJobs = [];
    for (var i = 0; i < totalCountries; i++) {
        (function (country) {
            var country = countries[i];
            var newArticleJob = new CronJob({
                cronTime: '0 */25 * * * *',
                onTick: function () {
                    console.log('Job triggered to fetch new articles for country: ' + country.name);
                    firebaseDataServices.loadArticlesByCountry(country.code);
                },
                start: false,
                timeZone: country.tz
            });
            newArticleJobs.push(newArticleJob);
            var cleanupJob = new CronJob({
                cronTime: '00 00 00 * * *',
                onTick: function () {
                    console.log('Job triggered to delete old articles for country: ' + country.name);
                    firebaseDataServices.deleteOldArticlesByTimezone(country.tz);
                },
                start: false,
                timeZone: country.tz
            });
            cleanupJobs.push(cleanupJob);
        })(countries[i]);
    }
    for (var i = 0; i < totalCountries; i++) {
        newArticleJobs[i].start();
        cleanupJobs[i].start();
    }
});



