/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Wait until the DOM is fully loaded
$(document).ready(function() {
  const maxTweetLength = 140;

  // Function to validate tweet content
  const isTweetValid = (tweetContent) => {
    if (!tweetContent) {
      alert('Error: Your tweet cannot be empty!');
      return false;
    }
    if (tweetContent.length > maxTweetLength) {
      alert(`Error: Your tweet exceeds the maximum limit of ${maxTweetLength} characters.`);
      return false;
    }
    return true;
  };

  // Function to handle tweet form submission
  $('form').on('submit', function(event) {
    // Prevent default form submission
    event.preventDefault();

    // Get and trim tweet content
    const tweetContent = $('textarea[name="text"]').val().trim();

    // Validate tweet content
    if (!isTweetValid(tweetContent)) {
      // Stop if validation fails
      return;
    }

    // Serialize form data for POST request
    const serializedData = $(this).serialize();

    // Send the POST request
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: serializedData,
    })
      .done(() => {
        console.log('Tweet submitted successfully!');
        // Reload tweets
        loadTweets();
        // Clear the textarea
        $('textarea[name="text"]').val('');
        // Reset the character counter
        $('.counter').text(maxTweetLength);
      })
      .fail(() => {
        console.log('Error submitting tweet.');
      });
  });

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

  // Function to fetch and load tweets from the server
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        // Render fetched tweets
        renderTweets(tweets);
      },
      error: (err) => {
        console.error('Failed to fetch tweets:', err);
      },
    });
  };

  // Load tweets on page load
  loadTweets();
});