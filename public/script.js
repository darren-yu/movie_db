$(function(){

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

});








