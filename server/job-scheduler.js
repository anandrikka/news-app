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
var timezone = 'Asia/Kolkata'

/**
 * Job to load new articles - runs for every 30min
 */
var loadNewArticles = new CronJob({
    cronTime: '0 */30 * * * *',
    onTick: function () {
        console.log('Job triggered to fetch new articles');
        firebaseDataServices.loadNewArticles();
    },
    start: false,
    timeZone: timezone
});


/**
 * Job to clean up old articles - run at mid night every day
 */
var cleanUpJob = new CronJob({
    cronTime: '00 00 00 * * *',
    onTick: function () {
        console.log('Job triggered to delete old articles at mid-night');
        firebaseDataServices.deleteOldArticles();
    },
    start: false,
    timeZone: timezone
});

loadNewArticles.start();
cleanUpJob.start();


var test = new CronJob({
    cronTime: '0-59 * * * * *',
    onTick: function () {
        console.log('Job triggered every second');
    },
    start: false,
    timeZone: timezone
});
//test.start();



