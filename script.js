// The mixer
var mixerDocs;

// get the mixer-rest-docs.html file and get all the endpoints.
$.get("mixer-rest-docs.html", function(data)
{
	mixerDocs = $(data);

	// Fill up the selection box with each endpoint from the mixer docs.
	mixerDocs.find(".rest-sidebar").find("li").each(function(index)
	{
		var endpoint = $(this).find("a").attr("href");
		$("#endpoints").append("<option>" + endpoint + "</option>");
	});

	// If there is a hash, change to it.
	if(window.location.hash)
		HashChanged();
	else
		updateIndex("types");
});

// Update the index table for this endpoint.
function updateIndex(value)
{
	var indexBody;
	if(value == "types")
	{
		// Create the table body.
    	indexBody = $("<tbody>");

    	// Foreach .panel-rest after the title that says 'Models & Types'.
    	mixerDocs.find("h2:contains('Models & Types')").nextUntil(".col-md-9", ".panel-rest").each(function()
    	{
    		var href = $(this).find("a.panel-reference");
    		var modal = $(href).parent();
    		var name = modal.find("a").first().attr("name");
    		var desc = modal.find(".top-resource-description").next().text();

    		var tr = indexBody.append("<tr class=\"rest-endpoint\" onclick=\"window.location.href = '" + href.attr("href") + "'\">"+
    		"<td class=\"rest-endpoint-method\">none</td>"+
    		"<td class=\"rest-endpoint-path\">" + name + "</td>"+
    		"<td class=\"rest-endpoint-description hidden-xs\">" + desc + "</td>");
    	});
	}
	else
	{	
		indexBody = mixerDocs.find(value).parent().find("table tbody").clone();
	}
	$("#index tbody").replaceWith(indexBody);
}

// The hash has changed, let's update the modala.
function HashChanged()
{
	// Remove the old modal content.
	$(".details").empty();

	// Get a clone of the new modal from the mixer docs.
	var modal = mixerDocs.find(location.hash + " .modal-content").clone();

	// It's not a modal? Let's get a panel instead.
	if(modal.length == 0)
		modal = mixerDocs.find(location.hash).parent().clone();

	// Update the link to view at mixer.com.
	$("#view-link").attr("href","https://dev.mixer.com/rest/index.html" + location.hash);

	// Add the detail from the mixer docs to the details div.
	$(".details").append(modal);
}

window.onhashchange = HashChanged;