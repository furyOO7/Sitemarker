document.getElementById("myform").addEventListener('submit', savebookmark);

function savebookmark(e){
	var siteName = document.getElementById('siteName').value
	var siteUrl = document.getElementById('siteUrl').value

	if(!validiateForm(siteName, siteUrl))
	{
		return false;
	}

	var bookmark = {
		name : siteName,
		url : siteUrl
	}

	if(localStorage.getItem('bookmarks')=== null){
		var bookmarks = [];
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));	

	}
	else
	{
		var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	}
	document.getElementById("myform").reset();

	fetchBookmarks();

	e.preventDefault();
}


//removing bookmarks

function removeBookmark(url){
	
	var bookmarks= JSON.parse(localStorage.getItem('bookmarks'))
	for(i=0;i<bookmarks.length;i++)
	{
		if(bookmarks[i].url==url)
		{
			bookmarks.splice(i ,1);

		}
	}
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	// Re-fetching bookmarks
	fetchBookmarks();
}

// displaying bookmark
function fetchBookmarks(){
	var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
	var bookmarksResults = document.getElementById("bookmarksResult")

	bookmarksResults.innerHTML= '';
	for(i=0; i< bookmarks.length;i++)
	{

		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="well">'+
										'<h3>'+name+
										' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
										' <a onclick="removeBookmark(\''+url+'\')" class="btn btn-danger" href="#">Remove</a> '+
										'</h3>'+
										'</div>'
	}

}// Validation form 

function validiateForm(siteName,siteUrl){
	if(!siteName || !siteUrl){
		alert('Please fill in the details')
		return false;
	}
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	if (!siteUrl.match(regex)){
		alert("Invalid URL");
		return false;
	}
	 return true;
}
