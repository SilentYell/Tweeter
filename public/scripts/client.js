/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Wait until the DOM is fully loaded
$(document).ready(function() {

  // Function to create a tweet element using a template literal
  const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="avatar">
            <img src="${tweet.user.avatars}" alt="${tweet.user.name}'s avatar">
          </div>
          <div class="user-info">
            <h3>${tweet.user.name}</h3>
            <p>${tweet.user.handle}</p>
          </div>
        </header>
        <p class="tweet-content">${tweet.content.text}</p>
        <footer>
          <div class="time-ago">${timeago.format(tweet.created_at)}</div>
          <div class="tweet-actions">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
    // Return the jQuery object representing the tweet element
    return $tweet;
  };

  // Function to render multiple tweets
  const renderTweets = function(tweets) {
    // Clear the tweets container
    $('#tweets-container').empty();
    // Iterate over each tweet
    for (const tweet of tweets) {
      // Create a tweet element for the current tweet
      const $tweet = createTweetElement(tweet);
      // Append the tweet element to the tweets container with newer tweets added at the top
      $('#tweets-container').prepend($tweet);
    }
  };

  // Sample tweet data
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  // Render the sample tweet data
  renderTweets(data);
});