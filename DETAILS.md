# How it works

- On load of the page, I called a function 'loadUsers' which displays a default loading page prior to when users data is being fetched from fetchUsers function.

-After users data has been fetched, I called setUsers function which sets users data to result varialble, current page to pageNumber variable, pageKeys variable holds the two pages in an array since two pages are gotten at a time. pageKey variable keeps track of te data to be displayed.

-checkPrevNext function is called to determine if previous or next button will be disabled based on if they are present in the payload.

-getNextData checks which page is to be displayed by calling getNextPageKey function. If the pageKey is 0 the first item in pageKeys array is displayed. If pageKey is 1 the second item in pageKeys array is displayed. If two, new data is being fetched with the url of the next page

-getPrevData is called when prev button is clicked. It also checkes which page is to be displayed. If pageKey is 2 is displays the first item in pageKeys array else it fetches new data with loadUsers function passing the previos page link as a parameter.

-fillTable function maps through the current data to be shown and displays the users in the innerHTML of tableBody.
