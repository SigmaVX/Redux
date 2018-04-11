$(document).ready(function(){

	// Initial Page Display Settings
	$("#moment-count-area").hide();
	$("#results").hide();
	init();
	
	// Keep Track Of Sections For Fullwidth JS
	var slideCount = 0;

	// Arrays
	var datesDisplay = ["10/25/55"];
	var dates = ["10/25/55"];
	var movieArtOne = ["./assets/images/test-poster.jpg"];
    var movieArtTwo = ["./assets/images/test-poster.jpg"];
    var movieArtThree = ["./assets/images/test-poster.jpg"];
    var tvArtOne = ["./assets/images/test-tv.jpg"];
    var tvArtTwo = ["./assets/images/test-tv.jpg"];
    var tvArtThree = ["./assets/images/test-tv.jpg"];
    var newsTextOne = ["Some Text For A News Headline"];
    var newsTextTwo = ["Some Text For A News Headline"];
    var newsTextThree = ["Some Text For A News Headline"];
    var newsArtOne = ["./assets/images/test-news.jpg"];
    var newsArtTwo = ["./assets/images/test-news.jpg"];
    var newsArtThree = ["./assets/images/test-news.jpg"];
    var musicArtOne=["./assets/images/test-music.jpg"];
    var musicArtTwo = ["./assets/images/test-music.jpg"];
    var musicArtThree = ["./assets/images/test-music.jpg"];
    var musicTextOne = ["Some Text For A Music Headline"];
    var musicTextTwo = ["Some Text For A Music Headline"];
    var musicTextThree = ["Some Text For A Music Headline"]; 



    // Adds date from user input to array if passes validation
    function addDate() {  
		var newDate = $("#dateInput").val().trim();
		console.log(newDate);
		var timeSpan = (moment().format("YYYY"))-(moment(newDate).format("YYYY"));
		console.log("Time Span: "+ timeSpan);

		if(newDate === ""){
			$("#noInputModal").modal('show');
			return console.log("Date Missing");
		};
		
		if(parseInt(timeSpan) > 100){
			$("#badDateModal").modal('show');
			return console.log("Bad Date");  
		} else{
			// Add date to array
			dates.push(newDate);
			console.log(dates);
			// Reset Box
			$("#dateInput").val("");
			// Increase Slide Counter
			slideCount++;
			// Display Updated Count
			$("#moment-count-area").show();
			// $("#moment-counter").empty();
			$("#moment-counter").text(slideCount); 
			
			// Gets Day, Month, & Year From Date
			var newMoment = moment(newDate, "MM DD YYYY");
			var month = newMoment.format('M');
			var day   = newMoment.format('D');
			var year  = newMoment.format('YYYY');
			
			console.log("Test Dates:" + month, day, year);
		};
	};
	
        // var queryMonth = $("#userMonth").val().trim();
        // var queryYear = $("#userYear").val().trim();
        // var addedDate = new Searchdate(queryMonth, queryYear);
       
  
	function Searchdate(month, year) {  
        this.month = month;
        this.year = year;
	}
	
	
    

// +++++++++++++++++++++++  API Work ++++++++++++++++++++++++++++

    //builds the search array using the variables declared in the next function querySearch
    //${x} = template literals(aka "varible"+)

    function movieQueryCall(a, b) {
        $.ajax({
            url: `https://api.themoviedb.org/3/discover/movie?primary_release_date.lte=${a}-${b}&primary_release_date.gte=${a}-${b}&page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=cfa5e4068ccc1d88d711e2257e1e0ec5`,
			method: "GET",
			async: false ,
            success: function (res) {
                movieArtOne.push("https://image.tmdb.org/t/p/w600_and_h900_bestv2" + res.results[
                    0].poster_path);
                movieArtTwo.push("https://image.tmdb.org/t/p/w600_and_h900_bestv2" + res.results[
                    1].poster_path);
                movieArtThree.push("https://image.tmdb.org/t/p/w600_and_h900_bestv2" + res.results[
					2].poster_path);
				movieArtFour.push("https://image.tmdb.org/t/p/w600_and_h900_bestv2" + res.results[
					3].poster_path);
				movieArtFive.push("https://image.tmdb.org/t/p/w600_and_h900_bestv2" + res.results[
					4].poster_path);
             }
        })


        $.ajax({
            url: `https://api.themoviedb.org/3/discover/tv?include_null_first_air_dates=false&timezone=America%2FNew_York&page=1&air_date.lte=${a}-${b}&air_date.gte=${a}-${b}&sort_by=popularity.desc&language=en-US&api_key=cfa5e4068ccc1d88d711e2257e1e0ec5`,
			method: "GET",
			async: false ,
            success: function (res) {
                tvArtOne.push("https://image.tmdb.org/t/p/w600_and_h900_bestv2" + res.results[
                    0].poster_path);
                tvArtTwo.push("https://image.tmdb.org/t/p/w600_and_h900_bestv2" + res.results[
                    1].poster_path);
                tvArtThree.push("https://image.tmdb.org/t/p/w600_and_h900_bestv2" + res.results[
                    2].poster_path);
            }
        })
    }

    function nyTimesQueryCall(a, b) {
        var newsArr = [];
        $.ajax({
            url: `https://cors-anywhere.herokuapp.com/http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=6bbf303c1d5f47a8b9b82a475fe15fe7&q=national%20news&begin_date=${a}${b}01&sort=oldest&page=1&facet_filter=true`,
			method: "GET",
			async: false,
            success: function (res) {
                newsTextOne.push(res.response.docs[0].headline.print_headline);
                newsTextTwo.push(res.response.docs[1].headline.print_headline);
                newsTextThree.push(res.response.docs[2].headline.print_headline);
                
                
                for (var n = 0; n <= 3; n++) {
                    var artArr = res.response.docs[n].multimedia;
                    if (artArr.length < 1) {
                        newsArr.push(movieArtFour);
                    } else {
                        newsArr.push("https://static01.nyt.com/" + artArr[0].url);
                    }
                                  console.log('newsarr:',newsArr);     
                }
                
                newsArtOne.push(newsArr[0]);
                newsArtTwo.push(newsArr[1]);
                newsArtThree.push(newsArr[2]);
                console.log('newsartone', newsArtOne);
                console.log('newsarttwo', newsArtTwo);
                console.log('newsart3', newsArtThree);
            }
        })
    }
    //this function is the forloop that 
    function querySearch() {
        for (var i = 0; i < dates.length; i++) {
            var x = dates[i].year;
			var y = dates[i].month;
			dateDisplayCall(x, y);
            movieQueryCall(x, y);
            nyTimesQueryCall(x, y);
        }

    }
function dateDisplayCall(x, y){
	var dateD = y + "/" + x ;
	datesDisplay.push(dateD);
	// console.log('datedispay=', datesDisplay);

}

// +++++++++++++++++++++ Tony Work +++++++++++++++++++++++++++++++++

	// Initializes Fullwidth JS
	function init(){
		$('#fullpage').fullpage({
		//Navigation
			menu: '#menu',
			lockAnchors: false,
			anchors:['firstPage', 'secondPage', 'thirdPage'],
			navigation: false,
			navigationPosition: 'center',
			showActiveTooltip: false,
			
			//Scrolling
			css3: true,
			scrollingSpeed: 1000,
			autoScrolling: true,
			fitToSection: true,
			fitToSectionDelay: 1000,
			scrollBar: false,
			easing: 'easeInOutCubic',
			easingcss3: 'ease',
			loopBottom: true,
			loopTop: false,
			loopHorizontal: true,
			continuousVertical: false,
			scrollHorizontally: false,
			interlockedSlides: false,
			dragAndMove: false,
			offsetSections: false,
			resetSliders: true,
			fadingEffect: false,
			normalScrollElements: '#element1, .element2',
			scrollOverflow: false,
			scrollOverflowReset: false,
			scrollOverflowOptions: null,
			touchSensitivity: 15,
			normalScrollElementTouchThreshold: 5,
			bigSectionsDestination: null,

			//Accessibility
			keyboardScrolling: true,
			animateAnchor: true,

			//Design
			controlArrows: false,
			verticalCentered: true,
			sectionsColor : ['#BFCDE0', '#A1B0AB', '#929487', '#A9B3CE', '#FEFCFD'],
			paddingTop: '1em',
			paddingBottom: '1em',
			responsiveWidth: 0,
			responsiveHeight: 0,
			responsiveSlides: false,
			parallax: false,
			parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},

			//Custom selectors
			sectionSelector: '.section',
			slideSelector: '.slide',

		});
	}

	// Generates Moments Pages Based On Array Data Loop
	function makeMoments(){

		for(var i=0; i<dates.length; i++){
			console.log('movieart1', movieArtOne);
			console.log('movieart2', movieArtTwo);
			console.log('movieart3', movieArtThree);
			console.log('tvart1', tvArtOne);
			console.log('tvart2', tvArtTwo);
			console.log('tvart3', tvArtThree);
			console.log('newstext1', newsTextOne);
			console.log('newstext2', newsTextTwo);
			console.log('newstext3', newsTextThree);
			console.log('newsart1', newsArtOne);
			console.log('newsart2', newsArtTwo);
			console.log('newsart3', newsArtThree);
			

			slideCount++;
			console.log("Slide Count: " + slideCount);
			
			var newSection = $("<div>").attr("class", "section slide");
				newSection.attr("style", "padding-top: 0px;")
				newSection.attr("data-anchor", "slide" + slideCount);
				$("#fullpage").prepend(newSection);
			
			var newContainer = $("<div>").attr("class", "container wrapper");
				newSection.append(newContainer);
			
			// Row 1
			var newRowOne = $("<div>").attr("class", "row no-gutters text-center align-items-end");
				newContainer.append(newRowOne);
				
				// Div 1
				var movieDivOne = $("<div>").attr("class", "col-2 card animated flipInX");
					movieDivOne.attr("style", "animation-delay: 1s");
					newRowOne.append(movieDivOne);
					var moviePosterOne = $("<img>").attr({
							class: "img-fluid",
							alt: "movie-poster",
							src: movieArtOne[i] 
							});
							movieDivOne.append(moviePosterOne);
					
				
				// Div 2 
				var newsCardOne = $("<div>").attr("class", "card col-2 news-card animated flipInY");
					newsCardOne.attr("style", "animation-delay: 0.2s")		
					newRowOne.append(newsCardOne);
						var newsImgOne = $("<img>").attr({
							class: "card-img-top img-fluid",
							alt: "news-image",
							src: newsArtOne[i]
							});
							newsCardOne.append(newsImgOne);
						
						var newsBodyOne = $("<div>").attr("class", "card-body text-center");
							newsCardOne.append(newsBodyOne);

							var headlineOne = $("<h5>").html(newsTextOne[i]);
								headlineOne.attr("class", "card-title headline-text" );
								newsBodyOne.append(headlineOne);

				// Div 3
				var tvDivOne = $("<div>").attr("class", "card col-2 animated flipInX");
					tvDivOne.attr("style", "animation-delay: 0.6s")
					newRowOne.append(tvDivOne);
					var tvPosterOne = $("<img>").attr({
							class: "img-fluid",
							alt: "tv-poster",
							src: tvArtOne[i]
							});
							tvDivOne.append(tvPosterOne);
							console.log("tv art 1 = " , tvArtOne);

				// Div 4
				var movieDivTwo = $("<div>").attr("class", "card col-2 animated flipInY");
					movieDivTwo.attr("style", "animation-delay: 1.2s");
					newRowOne.append(movieDivTwo);
					var moviePosterTwo = $("<img>").attr({
							class: "img-fluid",
							alt: "movie-poster",
							src: movieArtTwo[i]
							});
							movieDivTwo.append(moviePosterTwo);

				// Div 5
				var musicCardOne = $("<div>").attr("class", "card col-2 music-card animated flipInX");
					musicCardOne.attr("style", "animation-delay: 0.4s")
					newRowOne.append(musicCardOne);
						var musicImgOne = $("<img>").attr({
							class: "card-img-top img-fluid",
							alt: "music-image",
							src: musicArtOne
							});
							musicCardOne.append(musicImgOne);
						
						var musicBodyOne = $("<div>").attr("class", "card-body text-center");
							musicCardOne.append(musicBodyOne);

							var musicHeadlineOne = $("<h5>").html(musicTextOne[i]);
								musicHeadlineOne.attr("class", "card-title headline-text" );
								musicBodyOne.append(musicHeadlineOne);


				// Div 6
				var tvDivTwo = $("<div>").attr("class", "card col-2 animated flipInY");
					tvDivTwo.attr("style", "animation-delay: 0.8s")
					newRowOne.append(tvDivTwo);
					var tvPosterTwo = $("<img>").attr({
							class: "img-fluid",
							alt: "tv-poster",
							src: tvArtTwo[i]
							});
							tvDivTwo.append(tvPosterTwo);
			
			// Row 2
			var newRowTwo = $("<div>").attr("class", "row no-gutters text-center align-items-start");
			newContainer.append(newRowTwo);
				
				// Div 1
				var musicCardTwo = $("<div>").attr("class", "card col-2 music-card animated flipInY");
					musicCardTwo.attr("style", "animation-delay: 0.1s");
					newRowTwo.append(musicCardTwo);
						var musicImgTwo = $("<img>").attr({
							class: "card-img-top img-fluid",
							alt: "music-image",
							src: musicArtTwo
							});
							musicCardTwo.append(musicImgTwo);
						
						var musicBodyTwo = $("<div>").attr("class", "card-body text-center");
							musicCardTwo.append(musicBodyTwo);

							var musicHeadlineTwo = $("<h5>").html(musicTextTwo[i]);
								musicHeadlineTwo.attr("class", "card-title headline-text" );
								musicBodyTwo.append(musicHeadlineTwo);

				// Div 2
				var tvDivThree = $("<div>").attr("class", "card col-2 animated flipInX");
					tvDivThree.attr("style", "animation-delay: 0.9s");
					newRowTwo.append(tvDivThree);
					var tvPosterThree = $("<img>").attr({
						class: "img-fluid",
						alt: "tv-poster",
						src: tvArtThree[i]
						});
						tvDivThree.append(tvPosterThree);

				// Div 3
				var newsCardTwo = $("<div>").attr("class", "card col-2 news-card animated flipInY");
					newsCardTwo.attr("style", "animation-delay: 0.3s")
					newRowTwo.append(newsCardTwo);
						var cardImgTwo = $("<img>").attr({
							class: "card-img-top img-fluid",
							alt: "news-image",
							src: newsArtTwo[i]
							});
							newsCardTwo.append(cardImgTwo);
						
						var newsBodyTwo = $("<div>").attr("class", "card-body text-center");
							newsCardTwo.append(newsBodyTwo);

							var headlineTwo = $("<h5>").html(newsTextTwo[i]);
								headlineTwo.attr("class", "card-title headline-text" );
								newsBodyTwo.append(headlineTwo);

				// Div 4
				var musicCardThree = $("<div>").attr("class", "card col-2 music-card animated flipInX");
					musicCardThree.attr("style", "animation-delay: 0.7s");
					newRowTwo.append(musicCardThree);
						var musicImgThree = $("<img>").attr({
							class: "card-img-top img-fluid",
							alt: "music-image",
							src: musicArtThree
							});
							musicCardThree.append(musicImgThree);
						
						var musicBodyThree = $("<div>").attr("class", "card-body text-center");
							musicCardThree.append(musicBodyThree);

							var musicHeadlineThree = $("<h5>").html(musicTextThree[i]);
								musicHeadlineThree.attr("class", "card-title headline-text" );
								musicBodyThree.append(musicHeadlineThree);
					
				// Div 5
				var movieDivThree = $("<div>").attr("class", "card col-2 animated flipInY");
					movieDivThree.attr("style", "animation-delay: 0.5s")
					newRowTwo.append(movieDivThree);
					var moviePosterThree = $("<img>").attr({
							class: "img-fluid",
							alt: "movie-poster",
							src: movieArtThree[i]
							});
							movieDivThree.append(moviePosterThree);

				
				// Div 6
				var newsCardThree = $("<div>").attr("class", "card col-2 news-card animated flipInX");
					newsCardThree.attr("style", "animation-delay: 1.1s");	
					newRowTwo.append(newsCardThree);
						var cardImgThree = $("<img>").attr({
							class: "card-img-top img-fluid",
							alt: "news-image",
							src: newsArtThree[i]
							});
							newsCardThree.append(cardImgThree);
						
						var newsBodyThree = $("<div>").attr("class", "card-body text-center"); 
							newsCardThree.append(newsBodyThree);

							var headlineThree = $("<h5>").html(newsTextThree[i]);
								headlineThree.attr("class", "card-title headline-text" );
								newsBodyThree.append(headlineThree);
						
				// Date Overlay
				var dateOverlay = $("<h2>").html(datesDisplay[i]);
					dateOverlay.attr("class", "col-12 date-overlay");
					newSection.append(dateOverlay);
			
			}
	}

	// Resets All Data In Arrays 
	function reset(){
		datesDisplay = []; 
		dates = [];
		 movieArtOne = [];
		 movieArtTwo = [];
		 movieArtThree = [];
		 tvArtOne = [];
		 tvArtTwo = [];
		 tvArtThree = [];
		 newsTextOne = [];
		 newsTextTwo = [];
		 newsTextThree = [];
		 newsArtOne = [];
		 newsArtTwo = [];
		 newsArtThree = [];
		 musicArtOne=[];
		 musicArtTwo = [];
		 musicArtThree = [];
		 musicTextOne = [];
		 musicTextTwo = [];
		 musicTextThree = []; 
	}

	// Adding Dates Into Array
	$("#add").on("click", function (event) {
		// Prevents default page load
        event.preventDefault();
		addDate();
	})
	
	// Runs the JQ to Display Images and Start Annimation 
	$("#start").on("click", function(event){
		event.preventDefault();

		console.log("click OK");
		console.log("Dates Length:" + dates.length);
		
		if(dates.length > 0){
			console.log("Dates Added:" + dates);
			slideCount = 0;	
			$.fn.fullpage.destroy('all');	
			querySearch();
			makeMoments();
			$("#start-section").hide();
			$("#videoHolder").hide();
			$("footer").hide();
			$("#results").show();
			init();
			} else {
			$("#noDatesModal").modal('show');
		}
	});




//Keep This Closing Bracket For jQuery Load Function 
});