import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { relativeTime } from "@/lib/helpers";
import { supabase } from "@/integrations/supabase/client";
import type { Profile, Video } from "@/lib/types";

const PlayerProfile = () => {
  const { username } = useParams();
  const [player, setPlayer] = useState<Profile | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

      if (!profile) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const { data: vids } = await supabase
        .from("videos")
        .select("*")
        .eq("player_id", profile.id)
        .order("created_at", { ascending: false });

      setPlayer(profile as unknown as Profile);
      setVideos((vids as unknown as Video[]) ?? []);
      setLoading(false);
    };
    load();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse" style={{ color: "#888" }}>Laden…</div>
      </div>
    );
  }

  if (notFound || !player) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-5xl">🤷</p>
        <h1 className="font-display text-3xl" style={{ color: "#fff" }}>SPIELER NICHT GEFUNDEN</h1>
        <Link to="/" className="text-sm hover:underline" style={{ color: "#00C853" }}>Zur Startseite</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="container max-w-2xl pt-8 px-4">
        <div className="text-center mb-10">
          <div
            className="w-28 h-28 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl overflow-hidden"
            style={{ background: "#1a1a1a", border: "2px solid #1f1f1f" }}
          >
            {player.avatar_url ? (
              <img src={player.avatar_url} alt={player.display_name || ""} className="w-full h-full object-cover" />
            ) : (
              "⚽"
            )}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl" style={{ color: "#fff" }}>
            {(player.display_name || "").toUpperCase()}
          </h1>
          <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
            {player.club_name && (
              <span className="px-3 py-1 rounded-full text-xs" style={{ background: "#1a1a1a", color: "#888" }}>
                {player.club_name}
              </span>
            )}
            {player.position && (
              <span className="px-3 py-1 rounded-full text-xs" style={{ background: "#1a1a1a", color: "#888" }}>
                {player.position}
              </span>
            )}
          </div>
          {player.bio && (
            <p className="mt-4 max-w-md mx-auto text-sm leading-relaxed" style={{ color: "#888" }}>{player.bio}</p>
          )}
        </div>

        <h2 className="font-display text-2xl mb-4" style={{ color: "#fff" }}>HIGHLIGHTS</h2>
        {videos.length === 0 ? (
          <div className="rounded-xl p-8 text-center" style={{ background: "#111", border: "1px solid #1f1f1f" }}>
            <p className="text-4xl mb-2">🎥</p>
            <p className="text-sm" style={{ color: "#888" }}>Noch keine Videos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {videos.map((v) => (
              <Link
                key={v.id}
                to={`/v/${v.id}`}
                className="rounded-xl overflow-hidden transition-colors group"
                style={{ background: "#111", border: "1px solid #1f1f1f" }}
              >
                <div className="aspect-video flex items-center justify-center overflow-hidden" style={{ background: "#1a1a1a" }}>
                  {v.thumbnail_url ? (
                    <img src={v.thumbnail_url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  ) : (
                    <video src={v.video_url} muted playsInline preload="metadata" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium line-clamp-1" style={{ color: "#fff" }}>{v.title}</p>
                  <p className="text-xs mt-1" style={{ color: "#888" }}>{relativeTime(v.created_at)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerProfile;
