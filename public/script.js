$(function(){

	// delete button
	$(".deleteAdded").on("click", function(event){
		// alert("I hear you!");
		// prevents the link from being clicked again.
		event.preventDefault();
	// alert($(this).data("myparam"));
		var thisDeleteButton = $(this);

		$.ajax({
			url: "/added/" + $(this).data("myparam"),
			type: "DELETE",
			success:function(result){
				thisDeleteButton.closest("tr").fadeOut("slow", function() {
					$(this).remove();
				})
			}

		})

	})


	$(".addButton").on("click", function(event) {
		// alert("add click on!!");

		var myAdd = $(this);

		$.post("/added", {
			title_name: $(this).data("title"),
			year: $(this).data("year"),
			imdb_code: $(this).data("imdb")
			},
			// parameters of the function is passed in from the app.post res.send(objects) from index.js
			function(data,created){
			// alert('Added!!!')
				myAdd.fadeOut("slow");
		})


	})


});

		







