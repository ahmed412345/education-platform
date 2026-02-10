import "plyr/dist/plyr.css";
import { Plyr } from "plyr-react";

type YoutubePlayerProps = {
    videoId: string;
};

const YoutubePlayer = ({ videoId }: YoutubePlayerProps) => {
    const videoSource: any = {
        type: "video",
        sources: [
            {
                src: videoId,
                provider: "youtube",
            },
        ],
    };

    const plyrOptions = {
        // يمكنك إضافة خيارات التحكم هنا
        controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "fullscreen"],
        // لإخفاء لوجو يوتيوب قدر الإمكان
        youtube: { noCookie: true, rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1 },
    };

    return (
        <div className="rounded-xl overflow-hidden shadow-xl custom-plyr-wrapper">
            <Plyr source={videoSource} options={plyrOptions} />
        </div>
    );
};

export default YoutubePlayer;
