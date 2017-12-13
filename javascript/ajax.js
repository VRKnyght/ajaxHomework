$(document).ready(function() {

	// Initial array of topics.
	var topics = ['Shooting Stars', 'Lightsaber Kid', 'Jackie Chan', 'Doge'];
	var animate = false;
	var aha = false;
	var notAnimated;

	// Function for capturing the new topic from the data-attribute.
	function getGiphy() {

		$('.img-container').empty();

		var apiKey = 'tunoWlePP79yMu8U9ZSMicNhS3InY0LV';
		// The title is collected from this here.
		var title = $(this).attr('data-name');
		
		// The original url to later have the title added to goes here.
		var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + title + '&limit=10&api_key=' + apiKey;

		// Get our data from giphy asynchronously.
		$.ajax({
			url: queryURL,
			method: 'GET',
		}).done(function(response) {
			
			for (var i = 0; i < response.data.length; i++) {
				result = response.data[i];
				
				var topicGifs = $('<img>');

				topicGifs.attr('src', result.images.fixed_height_small_still.url);

				topicGifs.attr('id', result.images.fixed_height_small.url)

				topicGifs.addClass('special img image');

				$('.img-container').append(topicGifs);

			}
		})

	}
	
	// Function to animate the gif
	function animateGiphy() {
		notAnimated = $(this).attr('src');
		var animated = $(this).attr('id');
		$(this).attr('src', animated);
	}

	function stillGiphy() {
		$(this).attr('src', notAnimated);	
	}

	// Function to click on the gif
	function surprise() {
			$(this).attr('src', 'https://media0.giphy.com/media/Vuw9m5wXviFIQ/100.gif')
			$('.container').append();
	}




	// Function to render the data.
	function renderButtons() {

		// Deleting the topics prior to adding new topics.
		$('#buttons-view').empty();

		// Looping through the array of topics.
		for (var i = 0; i < topics.length; i++) {

		// Dynamically generate buttons for each topic in the array.
		var a = $('<button>');
		// Add a Class.
		a.addClass('topic btn btn-success');
		// Give it an data-attribute.
		a.attr('data-name', topics[i]);
		// Provide the initial button text.
		a.text(topics[i]);
		// Serve the buttons into the HTML.
		$('#buttons-view').append(a);
		}
	};

		// This function handles events when the buttons are clicked.
		$('#add-topic').on('click', function(event) {
			event.preventDefault();
			
			// This line grabs the input from the textbox.
			var topic = $('#topic-input').val().trim();

			// The topics from the textbox is then added to the array.
			topics.push(topic);
			// Call the function that renders the buttons.
			renderButtons();

		});

		// Function for mousing over the gifs.
		$(document).on('click', '.topic', getGiphy);

		$(document).on('mouseenter', '.special', animateGiphy);
		$(document).on('mouseleave', '.special', stillGiphy);
		$(document).on('click', '.special', surprise);

		// Function for clicking on the gifs.
	//	$(document).on('click', '.topic', );

		// Call the function that renders buttons the first time.
		renderButtons();
});