const {TwitterApi} = require('twitter-api-v2');
const movieQuotes = require('movie-quotes');
require('dotenv/config');


const client = new TwitterApi({
    appKey : process.env.apikey,
    appSecret : process.env.apikeysecret,
    accessToken : process.env.accesstoken,
    accessSecret : process.env.accesstokensecret,
});

const appOnlyClient = new TwitterApi(process.env.bearertoken);

//user = client.v2.me();

async function getUserByUsername(name){
    return await client.v2.userByUsername(name).then(token => {return token});
}

async function likedTweets(id){
    const likedTweets = await client.v2.userLikedTweets(id);
    await console.log(likedTweets.tweets[0].text);

    await likedTweets.fetchNext();
}

function tweetText(text){
    client.v2.tweet(text).then((val) => {
        console.log(val)
        console.log("success")
    }).catch((err) => {
        console.log(err)
    })
}

/*let user = getUserByUsername('theneedledrop');
console.log(user);
user.then(function(result) {
    console.log(result.data.id);
    likedTweets(result.data.id);
})*/

let quote = movieQuotes.random();

console.log(quote);

tweetText(quote);