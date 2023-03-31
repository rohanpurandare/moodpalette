

import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Multiselect from 'multiselect-react-dropdown';
import SpotifyWebApi from 'spotify-web-api-js';
import { useEffect, useContext, useState } from "react";

const spotifyApi = new SpotifyWebApi();

function SpotifyGenres() {
    const { user } = useContext(AuthContext);
    const [ preSelected, setPreselected ] = useState([]);
    const [ options, setOptions ] = useState([]);
    useEffect(() => {
        fetchUserGenres();
        fetchSpotifyGenres();
    }, []);

    async function fetchSpotifyGenres() {
        const res = await axios.get("/spotify/fetchAccessToken", {})
        .then((res1) => {
            spotifyApi.setAccessToken(res1.data.accessToken);
            spotifyApi.getAvailableGenreSeeds().then((res2) => {
                var returnedGenres = res2.genres;
                var dropDownGenres = [];
                for (let i = 0; i < returnedGenres.length; i++) {
                    if (!dropDownGenres.includes({"key": returnedGenres[i], "val": returnedGenres[i]})) {
                        dropDownGenres.push({"key": returnedGenres[i], "val": returnedGenres[i]});
                    }
                }
                setOptions(dropDownGenres);
            })
            .catch((err) => {
                console.log(err);
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    async function fetchUserGenres() {
        const res = await axios.get(`/users/pullGenres/${user.username}`)
        .then((res) => {
            var returnedGenres = res.data;
            var preChosenGenres = [];
            for (let i = 0; i < returnedGenres.length; i++) {
                if (!preChosenGenres.includes({"key": returnedGenres[i], "val": returnedGenres[i]})) {
                    preChosenGenres.push({"key": returnedGenres[i], "val": returnedGenres[i]});
                }
            }
            setPreselected(preChosenGenres);

            if (preChosenGenres.length == 5) {
                document.getElementById("genreLimitError").innerHTML = "You can only add up to 5 preferred genres";
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    async function onSelect(selectedList, selectedItem) {
        const addGenre = {
            username: user.username,
            genre: selectedItem.key,
        };

        if (selectedList.length == 5) {
            document.getElementById("genreLimitError").innerHTML = "You can only add up to 5 preferred genres";
        }
      
        await axios.post("/users/addGenre", addGenre);
    }
    
    async function onRemove(selectedList, removedItem) {
        const deleteGenre = {
            username: user.username,
            genre: removedItem.key,
        };
      
        document.getElementById("genreLimitError").innerHTML = "";

        await axios.post("/users/deleteGenre", deleteGenre);
    }

    return (
        <div>
        <div id="genreLimitError" style={{ color: "red" }}></div>
        <br/>
        <Multiselect
                options={options}
                selectedValues={preSelected}
                displayValue="key"
                selectionLimit={5}
                onKeyPressFn={function noRefCheck(){}}
                onRemove={onRemove}
                onSearch={function noRefCheck(){}}
                onSelect={onSelect}
            />
        </div>
    )
}
export default SpotifyGenres