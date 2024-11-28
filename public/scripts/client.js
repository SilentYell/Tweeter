/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Wait until the DOM is fully loaded
$(document).ready(function() {

  // Add focus and blur behavior for the placeholder
  const $textarea = $('textarea[name="text"]');
  $textarea.on('focus', function () {
    $(this).attr('placeholder', ''); // Clear the placeholder
  });

  $textarea.on('blur', function () {
    if ($(this).val().trim() === '') {
      $(this).attr('placeholder', 'What\'s happening?'); // Restore default placeholder
    }
  });

  // Function to handle tweet form submission
  $('form').on('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Hide any existing error messages
    const $errorMessage = $('.error-message');
    // Use slideUp for smooth hiding
    $errorMessage.slideUp();
  
    const serializedData = $(this).serialize();
    const tweetContent = $('textarea[name="text"]').val().trim();
  
    // Validation
    if (!tweetContent) {
      // Show error message
      $errorMessage.text('⚠️Tweet cannot be empty⚠️').slideDown();
      return;
    }
    if (tweetContent.length > 140) {
      $errorMessage.text('⚠️Tweet exceeds the 140-character limit⚠️').slideDown(); // Show error message
      return;
    }
  
    // Proceed with submission if no validation errors
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: serializedData,
    })
      .done((newTweet) => {
        console.log('Tweet submitted successfully!');
        // Clear the form and reset character counter
        $('textarea[name="text"]').val('');
        $('.counter').text(140);
        const $tweet = createTweetElement(newTweet);
        // Add the new tweet to the top of the feed
        $('#tweets-container').prepend($tweet);
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
    
    // Use .text() to escape user content
    $tweet.find('.tweet-content').text(tweet.content.text);

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