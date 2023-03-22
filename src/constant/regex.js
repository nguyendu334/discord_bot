module.exports = youtubeVideoRegex = new RegExp(
    /(?:youtube\.com\/(?:[^\\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\\/\s]{11})/,
);

module.exports = youtubePlaylistRegex = new RegExp(
    /(?!.*\?.*\bv=)https:\/\/www\.youtube\.com\/.*\?.*\blist=.*/,
);
