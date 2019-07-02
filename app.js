document.querySelector('.get-jokes').addEventListener('click', getJokes);
//add and event listern to the button with class="get-jokes"

function getJokes(e){
    console.log('get joke');
    const number = document.querySelector('input[type="number"]').value;
    //we get the user input of how many jokes he wants to fetch.

    const xhr = new XMLHttpRequest();
    //instentiated a new XMLHTTPreq object


    xhr.open('GET',`http://api.icndb.com/jokes/random/${number}`, true)
    //called the open method of xhr object and passed the type of reqeust (GET) and the api url and the type of communication synchrounus or asynchrounus. 

    //the onload method is a way that let us proccess the data we receive from the api. 
    xhr.onload = function (){
        if(this.status === 200)
        // this check if the status is 200. 200 means the response went ok. 404 measn something went wrong
        {
            const response = JSON.parse(this.responseText);
            // parse the JSON string from response and turn it into an object so we can loop thru it.

            let output = '';
            // we will later append the response from the api to this var

            if(response.type === 'success'){
                response.value.forEach(function(joke){
                    output += `<li>${joke.joke}</li>`

                });

            } else {
                output += '<li>Something went wrong</li>'
            }
            //the if statment above checks of the type of the returnted response is success before we can insert the data into the DOM

            document.querySelector('.jokes').innerHTML = output;
            //insert the data into the dom
        }
    }

    xhr.send();
    // i don't know what this does exactly 

    e.preventDefault();
    // this prevent the deafult behaviou of an event which is to reload the page or somthing like that
}