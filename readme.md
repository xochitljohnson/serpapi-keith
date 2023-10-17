# Extract Van Gogh Paintings Code Challenge - Keith Tovar

*To see it in action*: [Watch Loom here](https://www.loom.com/share/76eb401239d640c6aae4b06a06217b9e?sid=6efcec06-e255-4257-85b2-bb2e0b723c84)

Built using Node/Express. To start server: 

First install dependencies

`npm install`

Then start the server 

`npm run dev`

A server will start at  `localhost:3000`

The challenge consisted of the following tasks. Using a single HTTP request:

1. Parse the HTML results page.
2. Extract the following fields from the response: `name`, `extensions`, and `link` into an array. (In this case, the `extensions` consisted of the year when a painting by Van Gogh was completed. The link consisted of a Google search result link).
3. Add the painting thumbnails present in the results page into the array mentioned above.

## How I completed the challenge

Following the documentation, I discovered that SerpApi had just released a JavaScript library to work with their API [link](https://serpapi.com/blog/announcing-our-new-library-for-javascript-and-typescript/). This made things easier for me. I found it while searching for the correct URL to send the GET request to. In the npm library page, I discovered that there were two methods that can accomplish the task at hand: `getJson` and `getHtml`. I used [Express](https://github.com/expressjs/express) to create a simple web server that sends a single GET request. 

Next, I created two functions, one to return HTML and the other to return JSON. From there, I used the Express method `res.send()` to parse the HTML file returned by SerpApi. Then I created an initial array with the fields required for the challenge, (`name, extensions, link`). Then I mapped over the `inline_images` array in the original response to grab the thumbnails from the results page. I also included the title for each thumbnail to add a description and to be able to distinguish each value. Finally, I pushed the thumbnails into my array with the fields requested.

For the next step, I took this array and used the Node core module `fs.writeFile` to create a JSON file with the data requested.

My main point of reference was the array data found in the SerpApi playground. From there, I was able to determine where the values where that I needed and how I could access them.

*** Update ***

Collaborative version control isn't my forte. I believe I have already tried to fork the main serpapi repository and failed to do it correctly. My apologies.


*Total time spent: ~3 hours.*
