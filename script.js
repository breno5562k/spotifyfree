
window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'YOUR_ACCESS_TOKEN'; 
    const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); }
    });

    
    player.addListener('initialization_error', e => console.error(e));
    player.addListener('authentication_error', e => console.error(e));
    player.addListener('account_error', e => console.error(e));
    player.addListener('playback_error', e => console.error(e));

    
    player.addListener('player_state_changed', state => console.log(state));


    player.addListener('ready', data => {
        console.log('Ready to play');
        player.togglePlay().then(() => {
            console.log('Toggled play!');
        });
    });

    
    player.addListener('not_ready', data => {
        console.log('Device ID has gone offline');
    });

   
    player.connect();

   
    document.getElementById('play-btn').addEventListener('click', () => {
        player.togglePlay().then(() => {
            console.log('Toggled play!');
        });
    });

    document.getElementById('pause-btn').addEventListener('click', () => {
        player.pause().then(() => {
            console.log('Paused');
        });
    });
};


document.getElementById('search-btn').addEventListener('click', () => {
    const url = document.getElementById('playlist-url').value;
    const playlistId = extractPlaylistId(url);
    if (playlistId) {
        const iframeSrc = `https://open.spotify.com/embed/playlist/${playlistId}`;
        document.getElementById('spotify-player').src = iframeSrc;
    } else {
        alert('Invalid Spotify URL');
    }
});


function extractPlaylistId(url) {
    const match = url.match(/playlist\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
}
