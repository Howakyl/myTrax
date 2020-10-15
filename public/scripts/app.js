/* <iframe src="https://open.spotify.com/embed/album/3P9Pzn7O4Zsr3tsCSsx7Uk" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>

"https://open.spotify.com/album/3P9Pzn7O4Zsr3tsCSsx7Uk?si=RtqBk9PWTAyXq4P8O_BljA"




<iframe src="https://open.spotify.com/embed/track/10vkYRKw6Jjr7try1ir50G" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>


watch = watch.slice() */







var a = "https://open.spotify.com/track/10vkYRKw6Jjr7try1ir50G?si=aEjK7D2LTLO1G-okZ_HVqA";
var b = "embed/";
var position = 25;
var spotify = [a.slice(0, position), b, a.slice(position)].join('');

if(spotify.includes('spotify')){
    console.log(spotify);
    
} else {
    console.log("not a spotify link")
}