const ytsr = require('ytsr');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');

const { youtubeVideoRegex } = require('../constant/regex');

// Tìm video bằng từ khoá và trả về id video nếu tìm thấy hoặc trả về tin nhắn lỗi.
const searchVideo = async (keyword) => {
    try {
        try {
            const result = await ytsr(keyword, { pages: 1 });
            const filteredRes = result.items.filter((e) => e.type === 'video');
            if (filteredRes.length === 0) throw "🔎 Can't find video!";
            const item = filteredRes[0];
            return item.id;
        } catch (error) {
            throw error;
        }
    } catch (e) {
        throw '❌ Invalid params';
    }
};

// Lấy thông tin của 1 video bằng nội dung truyền vào. URL hoặc từ khoá
module.exports = getVideoDetails = async (content) => {
    const parsedContent = content.match(youtubeVideoRegex);
    let id = '';

    if (!parsedContent) {
        id = await searchVideo(content);
    } else {
        id = parsedContent[1];
    }
    const url = `https://www.youtube.com/watch?v=${id}`;

    return ytdl
        .getInfo(url)
        .then((result) => {
            return {
                title: result.videoDetails.title,
                length: parseInt(result.videoDetails.lengthSeconds, 10),
                author: result.videoDetails.author.name,
                thumbnail:
                    result.videoDetails.thumbnails[result.videoDetails.thumbnails.length - 1].url,
                url,
            };
        })
        .catch(() => {
            throw '❌ Error';
        });
};

// Lấy danh sách video và thông tin 1 playlist
module.exports = getPlaylist = async (url) => {
    try {
        const id = url.split('?')[1].split('=')[1];
        const playlist = await ytpl(id);

        const resources = [];
        playlist.items.forEach((item) => {
            resources.push({
                title: item.title,
                thumbnail: item.bestThumbnail.url,
                author: item.author.name,
                url: item.shortUrl,
                length: item.durationSec,
            });
        });

        return {
            title: playlist.title,
            thumbnail: playlist.bestThumbnail.url,
            author: playlist.author.name,
            resources,
        };
    } catch (e) {
        throw '❌ Invalid playlist!';
    }
};
