"use strict";

// Import helper functions for user-related utilities
const userHelper    = require("../lib/util/user-helper");

// Import the Express module
const express       = require('express');

// Create a new router instance for tweet-related routes
const tweetsRoutes  = express.Router();

// Export a function that takes DataHelpers as an argument
module.exports = function(DataHelpers) {

  // Define a GET route for the root path ("/") of tweetsRoutes
  tweetsRoutes.get("/", function(req, res) {
    // Use the DataHelpers' getTweets method to fetch all tweets
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        // If there's an error, respond with a 500 status code and error message
        res.status(500).json({ error: err.message });
      } else {
        // Otherwise, respond with the fetched tweets in JSON format
        res.json(tweets);
      }
    });
  });

  // Define a POST route for the root path ("/") of tweetsRoutes
  tweetsRoutes.post("/", function(req, res) {
    // Check if the request body contains a text property
    if (!req.body.text) {
      // Respond with a 400 status code and an error message if text is missing
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }
  
    // Use the provided user or generate a random user if none is provided
    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();

    // Create a tweet object with user, content, and timestamp
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now() // Current timestamp
    };
  
    // Use the DataHelpers' saveTweet method to save the tweet to the database
    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        // If there's an error, respond with a 500 status code and error message
        res.status(500).json({ error: err.message });
      } else {
        // Respond with the newly created tweet and a 201 status code
        res.status(201).json(tweet);
      }
    });
  });

  // Return the tweetsRoutes router for use in the application
  return tweetsRoutes;

};