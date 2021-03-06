$(document).ready(function() { // ideas from https://scotch.io/tutorials/submitting-ajax-forms-with-jquery

		// process the form
		$('form').submit(function(event) {

			$('#message').text(""); // clear message text
			$('.error').text(""); // clear error text

			// get data from form
			var formData = $(this).serialize();
			// post to location designated in form
			var postURL = $(this).attr('action');

			// process the form
			$.ajax({
				type 		: 'POST', // post request
				url 		: postURL, // php file to handle the post
				data 		: formData, // data to be sent
				dataType 	: 'json', // data type expected back
				encode		: true
			})
				.done(function(data) { //on ajax success
					// if validation error
					if(data.success){
						$('#message').text("Challenge created!");
						// add challenge to profile page
						var challengeData = "creator="+data.username+"&title="+data.title
						$.ajax({
							type 		: 'POST', // post request
							url 		: 'bindChallenge.php', // php file to handle the post
							data 		:  challengeData, // data to be sent
							dataType 	: 'json', // data type expected back
							encode		: true
						});
					}
					else{
						console.log(data.error);
						$('p.error').text("Error creating challenge.");
					}
				});
			// stop the form from submitting the normal way and refreshing the page
			event.preventDefault();
		});

});