const Spotify = require("../models/Spotify");
const router = require("express").Router();
const SpotifyWebApi = require("spotify-web-api-node");

/*router.post("/fetchAccessToken", async (req, res) => {
    try {
        // Create the api object with the credentials
        var spotifyApi = new SpotifyWebApi({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET
        });
        spotifyApi.clientCredentialsGrant().then(
            function (data) {
                console.log('The access token expires in ' + data.body['expires_in']);
                console.log('The access token is ' + data.body['access_token']);
            
                // Save the access token so that it's used in future calls
                return res.status(200).json(data.body['access_token']);
            },
            function (err) {
                console.log('Something went wrong when retrieving an access token', err);
                return res.status(500).json(err);
            }
        );
    }
    catch (err) {
        return res.status(500).json(err);
    }
});*/

router.get("/fetchAccessToken", async (req, res) => {
    const spotifyObj = await Spotify.findOne({ client_id: process.env.SPOTIFY_CLIENT_ID });

    // Test endpoint to check whether access token is expired
    var spotifyApiTest = new SpotifyWebApi();
    spotifyApiTest.setAccessToken(spotifyObj.accessToken);
    spotifyApiTest.getMe().then((response) => {
        return res.status(200).json({accessToken: spotifyObj.accessToken});
    })
    .catch((error) => {
    if (error.status === 401)
        console.log("The access token has expired");
        // Refresh token
        var spotifyApi = new SpotifyWebApi({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            refreshToken: spotifyObj.refreshToken
        });
        spotifyApi.refreshAccessToken().then(
            async function(data) {
                console.log('The access token is refreshed!');
                // Store the token in the database
                const updatedSpotify = await Spotify.findOneAndUpdate(
                {
                    client_id: process.env.SPOTIFY_CLIENT_ID
                },
                { 
                    accessToken: data.body['access_token']
                });
                return res.status(200).json({accessToken: data.body['access_token']});
            },
            function(err) {
                return res.status(500).json(err);
            }
        );
    });
});

router.post("/generateAccessToken", async (req, res) => {
    try {       
        var spotifyApi = new SpotifyWebApi({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            redirectUri: 'http://localhost:3000/' //TODO: figure this out
        });
        
        // The code returned in the redirect URI
        var code = req.body.code;
        
        // Retrieve an access token and a refresh token
        spotifyApi.authorizationCodeGrant(code).then(
        async function(data) {
            /*console.log('The token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);
            console.log('The refresh token is ' + data.body['refresh_token']);*/

            // Store the tokens in the database
            const existingSpotify = await Spotify.findOne({ client_id: process.env.SPOTIFY_CLIENT_ID });
        
            if (existingSpotify) {
                const updatedSpotify = await Spotify.findOneAndUpdate(
                {
                    client_id: process.env.SPOTIFY_CLIENT_ID
                },
                { 
                    accessToken: data.body['access_token'],
                    refreshToken: data.body['refresh_token'] 
                });
                return res.status(200).json(updatedSpotify);
            }
            else {
                const newSpotify = new Spotify({
                    client_id: process.env.SPOTIFY_CLIENT_ID,
                    accessToken: data.body['access_token'],
                    refreshToken: data.body['refresh_token'], 
                });
                const returnedSpotify = await newSpotify.save();
                return res.status(200).json(returnedSpotify);
            }
        },
        function(err) {
            //console.log(err); //<-- there's always an error because it tries to authorize twice (no clue why)
        }
        );
    }
    catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router