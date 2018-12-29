$(document).ready(function() {

  $("#newBooking").submit(function(e) {
    e.preventDefault();
    if ($('#newBooking').parsley().isValid()) {
      saveBooking();
    };
  });

  $("#newUser").submit(function(e) {
    e.preventDefault();
    if ($('#newUser').parsley().isValid()) {
      registerUser();
    };
  });

  $("#loginUser").submit(function(e) {
    e.preventDefault();
    if ($('#loginUser').parsley().isValid()) {
      loginUser();
    };
  });

  // showBookings();

  $('.datepicker').pickadate();
  $('#newBooking').parsley();
  $('#newUser').parsley();

});

/*
function showBookings() {
  var Booking = Parse.Object.extend("Booking");
  var query = new Parse.Query(Booking);

  query.descending("createdAt");

  query.find({
    success: function(results) {


      $("#bookingList").html("");
      var template = Handlebars.compile($("#single-booking-template").html());

      $(results).each(function(i,e) {
        // Serialize the PFObject and store it in q
        var q = e.toJSON();
        // Select the DOM element we're appending to,
        // Then append the template, passing in q to
        // provide the values of the template variables
        $("#bookingList").append(template(q));
      });

    },
    error: function(error){
      console.log(error.message);
    }
  });
}
*/

function saveBooking() {
  var Booking = Parse.Object.extend("Booking");
  var booking = new Booking();

  var name    = $("#name").val();
  var email   = $("#email").val();
  var phone   = $("#phone").val();
  var date    = $("#date").val();
  var time    = $("#time").val();

  booking.set("name", name);
  booking.set("email", email);
  booking.set("phone", phone);
  booking.set("date", date);
  booking.set("time", time);

  booking.save(null, {
    success: function() {
      console.log("Saved!");
    },
    error: function(booking, error){
      console.log(error.message);
    }
  })

}


function registerUser() {
  var user        = new Parse.User();

  var username    = $("#email").val();
  var password    = $("#password").val();

  user.set("username", username);
  user.set("password", password);

  user.signUp(null, {
    success: function(user) {
      console.log("User has been created successfully!");
    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.
      console.log("Error: " + error.code + " " + error.message);
      $(".alert-danger").append(error.message);
      $(".alert-danger").removeClass("hidden");
    }
  });

}

function loginUser() {
  var user        = new Parse.User();

  var username    = $("#loginemail").val();
  var password    = $("#loginpassword").val();

  user.set("username", username);
  user.set("username", password);


  Parse.User.logIn("username", "username", {
    success: function(user) {
      console.log("Logged in successfully!")
    },
    error: function(user, error) {
      console.log("Try again!")
    }
  });
}


$(document).ready(function () {
  $('.next').on('click', function () {
    var current = $(this).data('currentBlock'),
      next = $(this).data('nextBlock');

    // only validate going forward. If current group is invalid, do not go further
    // .parsley().validate() returns validation result AND show errors
    if (next > current)
      if (false === $('#newBooking').parsley().validate('block' + current))
        return;

    // validation was ok. We can go on next step.
    $('.block' + current)
      .removeClass('show')
      .addClass('hidden');

    $('.block' + next)
      .removeClass('hidden')
      .addClass('show');

  });
});
