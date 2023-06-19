$(document).ready(function () {
  
  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    // loops through tweets
    for (let tweet = tweets.length - 1; tweet >= 0; tweet--) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweets[tweet]);
      // takes return value and appends it to the tweets container
      $("#tweets-container").append($tweet);
    }
  };
  // takes object and return HTML code
  const createTweetElement = function (tweetObject) {
    const $tweet = `<article class="tweet">
  <header>
    <div>
      <img src="${
        tweetObject.user.avatars
      }" alt="working on it" title="avatar"/>
      <h3>${tweetObject.user.name}</h3>
      </div>
      <h5>${tweetObject.user.handle}</h5>
  </header>
  <p>${tweetObject.content.text}</p>
  <footer>
    <time datetime="${tweetObject.created_at}">${timeago.format(
      tweetObject.created_at
    )}</time>
    <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
  </article>`;
    return $tweet;
  };

  $("form").on("submit", function (event) {
    event.preventDefault();
    $("#error_messge").css("visibility", "hidden");
    let text = $("#tweet-text").val();
    text = text.trim();
    let info = $(this).serialize();
    // safely render insecure text
    $("<div>").text(info);
    const validateTweet = info.length;
    //validating the tweet
    if (validateTweet <= 5 || text.length === 0) {
      // show error message
      $("#error_messge").slideDown("slow");
      $("#error_messge").css("visibility", "visible");
      $("#error_messge").html("sorry the tweet shuoldn't be empty!");
    } else if (validateTweet > 145) {
      // show error message
      $("#error_messge").slideDown("slow");
      $("#error_messge").html("sorry the tweet is too long!");
      $("#error_messge").css("visibility", "visible");
    } else {
      // hide error message and post the tweet
      $("#error_messge").slideUp("slow");
      $.ajax({
        method: "POST",
        url: "/tweets/",
        data: info,
      }).then(function () {
        loadTweets();
      });
    }
  });

  const loadTweets = function () {
    $.ajax({
      method: "GET",
      url: `/tweets/`,
    }).then(function (data) {
      renderTweets(data);
    });
  };

  loadTweets();
});
