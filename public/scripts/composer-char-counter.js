$(document).ready(function() {
  $(".new-tweet textarea").on("input", function() {
    const maxChars = 140;
    const charsLeft = maxChars - $(this).val().length;

    const counter = $(this).closest("form").find(".counter");
    counter.text(charsLeft);

    // Turn counter red if characters exceed the limit
    if (charsLeft < 0) {
      counter.addClass("invalid");
    } else {
      counter.removeClass("invalid");
    }
  });
});