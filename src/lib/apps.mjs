// What each app does, in plain words. Taken from each app's README, CLAUDE.md and release
// notes: describe only what the released version really does, no claims beyond them.
// Titles, descriptions and h1s follow the search intents in docs/seo.md.
// Release tags and file names live in data/apps.json (updated after every release), not here.
import releases from "../../data/apps.json" with { type: "json" };

const copy = [
  {
    slug: "captions",
    title: "Free Auto Caption Generator, No Watermark | KreoKit",
    description: "Free auto caption generator for Windows, Mac and Linux. Captions your videos offline with Whisper, word-by-word highlight, SRT export. No watermark.",
    h1: "Free auto captions for your videos, no watermark",
    name: "Captions",
    short: "Auto-captions for your videos, with word-by-word highlight for Reels, TikTok and Shorts.",
    what: [
      "Drop in a video and KreoKit Captions transcribes it on your own computer with Whisper: English first, plus 90+ other languages, with custom words for names and brands.",
      "Fix any word on a timeline with the audio waveform, choose a style, and export an MP4 with burned-in captions or a subtitle file. No watermark, no account, no upload.",
    ],
    who: "For creators making Reels, TikToks and Shorts who want captions on every video, and for NGOs and small businesses that need subtitles without a subscription. It's a desktop app, so long videos and private footage stay on your computer.",
    features: [
      ["Auto-transcription", "Whisper runs locally and detects the language by itself. Add custom words so names and brands come out right."],
      ["Caption editor", "Fix words, split and merge captions, and drag them on a timeline with the audio waveform."],
      ["Styles", "Presets (Clean subtitle, Bold highlight, One-word pop) or your own font, size, colours, outline, position and line layout, with word-by-word highlight."],
      ["Export", "An MP4 with the captions burned in, or .srt, .vtt and styled .ass subtitle files."],
    ],
    steps: [
      ["Drop in a video", "It's transcribed on your computer. Pick a fast or a more accurate speech model."],
      ["Edit and style", "Fix words, split and merge captions, and pick a preset or your own font, colours, outline and position, with word-by-word highlight."],
      ["Export", "An MP4 with the captions burned in, or .srt, .vtt or styled .ass subtitles."],
    ],
    requirements: [
      "macOS 12 Monterey or later, Windows 10 / 11 (64-bit), or Linux with glibc 2.35+ (e.g. Ubuntu 22.04+).",
      "On Intel / AMD computers, a processor with AVX2 (most Intel CPUs from 2013 and AMD from 2015 on). The app tells you if yours isn't supported.",
      "A speech model, downloaded once on first use: 150 MB (fast) to 1.6 GB (most accurate).",
    ],
    privacy: "Your video never leaves your computer. Transcription, editing and export all happen locally; the only time the app goes online is to download the speech model you choose, once. There are no accounts and no telemetry.",
    faq: [
      ["Is KreoKit Captions really free?", "Yes. It's open source (MIT / Apache-2.0), with no watermark, no account and no paid tier."],
      ["Does it work offline?", "Yes. After the one-time speech model download (150 MB to 1.6 GB, depending on the model), captioning works without internet."],
      ["Which languages does it support?", "English first, plus the 90+ other languages Whisper supports. The language is detected automatically."],
      ["Can I export an SRT file?", "Yes: .srt, .vtt or styled .ass subtitles, or an MP4 with the captions burned in."],
      ["Can it highlight each word as it's spoken?", "Yes. Word-by-word highlight is built in, for the caption style used on Reels, TikTok and Shorts."],
      ["Why does my computer warn me when I open it?", "The alpha isn't signed with paid developer certificates yet. The install guide shows how to open it safely."],
    ],
  },
  {
    slug: "cutout",
    title: "Remove Background from Image Free, Offline | KreoKit",
    description: "Remove the background from images for free, offline on your PC or Mac. Fast and Best AI models, edge refine, new backgrounds, batch export. No sign-up.",
    h1: "Remove the background from images, free and offline",
    name: "Cutout",
    short: "One-click background removal for your images, one photo or a whole batch.",
    what: [
      "Drop in a photo and KreoKit Cutout removes the background in seconds with an AI model that runs on your own computer: Fast for quick results, Best for hair, fur and fine details.",
      "Refine the edges, pick a new background and export, one image or a whole batch. No watermark, no account, no upload.",
    ],
    who: "For creators making thumbnails, product photos, social posts and profile pictures. Cut out one image or a folder of them, without signing up anywhere and without sending your photos to a server.",
    features: [
      ["AI cutout on your computer", "Fast for quick results, Best for hair, fur and fine details. Best adapts to how much memory your computer has."],
      ["Refine", "Feather or shift the edges, and erase or restore areas with a brush."],
      ["Backgrounds", "Transparent, a solid colour, a blurred version of the original, or your own image."],
      ["Export and batch", "PNG, WebP or JPG at the original size or a social size, with Fit or Fill framing that never cuts off the subject. Check a whole batch in a grid and export it to a folder."],
    ],
    steps: [
      ["Drop in images", "One photo or many. The cutout is made on your computer."],
      ["Refine and pick a background", "Feather or shift the edges, erase or restore with a brush, then choose transparent, a solid colour, a blurred version of the original or your own image."],
      ["Export", "PNG, WebP or JPG at the original size or a social size (1080×1080, 1080×1350, 1080×1920, 1280×720). Batches go to a folder, never overwriting files without asking."],
    ],
    requirements: [
      "macOS 12 Monterey or later, Windows 10 (version 1903 or later) / 11 (64-bit), or Linux with glibc 2.35+ (e.g. Ubuntu 22.04+).",
      "On Intel / AMD computers, a processor with SSE4.2 and POPCNT (almost every Intel CPU since 2009 and AMD since 2011).",
      "AI models, downloaded once on first use: Fast 176 MB, Best about 200 MB.",
    ],
    privacy: "Your images never leave your computer. The AI models (U²-Net for Fast, BiRefNet_lite for Best, both open source) are downloaded once from this project's own releases; after that, Cutout works offline. No account, no telemetry.",
    faq: [
      ["Is KreoKit Cutout free?", "Yes. It's open source (MIT / Apache-2.0), with no watermark, no sign-up and no paid tier."],
      ["Does it work offline?", "Yes. After the one-time model download (Fast 176 MB, Best about 200 MB), it works without internet."],
      ["Can I get a transparent PNG?", "Yes. PNG and WebP keep the transparent background. JPG can't be transparent, so a transparent cutout is saved on white; or pick a colour, blurred or custom background."],
      ["Can I remove the background from many images at once?", "Yes. Batch mode cuts out many images, lets you check each one in a grid, and exports them all to a folder without overwriting files unless you say so."],
      ["Should I use Fast or Best?", "Fast is quicker; Best is better at hair, fur and fine details, and adapts to your computer's memory."],
      ["Does it work on videos?", "Not yet. Cutout is for images; video background removal is planned for later."],
    ],
  },
  {
    slug: "clips",
    title: "Turn Long Videos into Shorts Free, Offline | KreoKit",
    description: "Turn long videos and podcasts into vertical shorts with captions, free and offline. Finds the best moments, follows the speaker, exports 1080×1920 MP4s.",
    h1: "Turn long videos into shorts with captions, free",
    name: "Clips",
    short: "Turn long videos into vertical short clips with captions.",
    what: [
      "Drop in a podcast, interview, talk or livestream and KreoKit Clips finds the best moments: clips that start and end on a full sentence, with a strong hook, and it shows you why each one was picked.",
      "It reframes them to 9:16 following the speaker's face, adds captions, and exports them all for TikTok, Reels and Shorts. Your video never leaves your computer.",
    ],
    who: "For podcasters, streamers, speakers and anyone who repurposes long videos into short ones. Instead of scrubbing through an hour of footage, you start from a list of candidate clips and decide which to keep.",
    features: [
      ["Transcribe", "The whole video, locally with Whisper, with word-by-word timings. Cancel any time and resume later."],
      ["Find the best moments", "Clips that start and end on a full sentence, with a strong hook, scored by transparent rules so you can see why each was picked. No AI ranking in this version."],
      ["Reframe to 9:16", "Follows the speaker's face, or use center crop, fit with a blurred background, or place it by hand."],
      ["Captions and export all", "Caption styles from KreoKit Captions with word-by-word highlight, and every clip exported as a 1080×1920 MP4 (plus SRT if you want)."],
    ],
    steps: [
      ["Drop in a long video", "It's transcribed on your computer with Whisper, word by word. Cancel any time and resume later."],
      ["Review the best moments", "Keep or discard each clip, move its start and end on a timeline, or add your own. Presets for TikTok Rewards (61–90 s) and Shorts / Reels (20–60 s)."],
      ["Reframe and export all", "9:16 that follows the speaker's face, captions with word-by-word highlight, and 1080×1920 MP4s (plus SRT if you want)."],
    ],
    requirements: [
      "macOS 12 Monterey or later, Windows 10 (version 1903 or later) / 11 (64-bit), or Linux with glibc 2.35+ (e.g. Ubuntu 22.04+).",
      "On Intel / AMD computers, a processor with AVX2, FMA and F16C (most Intel CPUs since 2013 and AMD since 2015).",
      "AI models, downloaded once on first use: the speech model you pick (148 MB to 1.6 GB) and the face model (2 MB).",
    ],
    privacy: "Your videos never leave your computer. Transcription, face tracking and export run locally; the app only goes online to download the speech and face models once. No account, no upload, no telemetry.",
    faq: [
      ["Is KreoKit Clips free, without a watermark?", "Yes. It's open source (MIT / Apache-2.0), with no watermark, no account and no paid tier."],
      ["How does it choose the best moments?", "With transparent rules: clips start and end on a full sentence and open with a strong hook. Each clip shows its score breakdown, so you can see why it was picked and change anything."],
      ["Which clip lengths can I make?", "Presets for TikTok Rewards (61–90 s) and Shorts / Reels (20–60 s), or your own lengths."],
      ["Does it keep the speaker in frame?", "Yes. Reframing to 9:16 follows the speaker's face. You can also use center crop, fit with a blurred background, or position it by hand."],
      ["Does it work offline?", "Yes. After the one-time model download, everything runs on your computer."],
    ],
  },
  {
    slug: "voice",
    title: "Remove Background Noise from Audio Free | KreoKit",
    description: "Remove background noise from audio and video for free, offline. Clean up voice recordings and set the right loudness for social video or podcasts.",
    h1: "Remove background noise from audio and video, free",
    name: "Voice",
    short: "Remove background noise and polish your voice to the right loudness.",
    what: [
      "Drop in a podcast, voice-over or talking-head video and KreoKit Voice removes the background noise, then polishes the sound to the right loudness for TikTok, Reels, Shorts, YouTube or podcasts.",
      "For videos, the picture stays untouched and only the sound is replaced. No watermark, no account, no upload.",
    ],
    who: "For podcasters, voice-over artists and anyone who records talking-head videos or TikToks on a phone, in a room with fans, air conditioning, hum, traffic or keyboard clicks.",
    features: [
      ["Remove background noise", "Fast (RNNoise, built in) or Best (DPDFNet, a one-time 10.5 MB download, which also takes some room echo away), with a Strength slider for a natural sound."],
      ["Polish", "Remove low rumble, soften harsh S sounds, even out the level, and set the loudness: Social video (−14 LUFS), Podcast (−16 LUFS) or your own. Peaks stay under −1 dBTP."],
      ["Compare", "Switch between Original and Cleaned at the same moment (key B), loudness-matched so “louder” doesn't fool your ear."],
      ["Export and batch", "WAV, FLAC, M4A or MP3, each file measured after writing. Clean many files with the same settings and Export all."],
    ],
    steps: [
      ["Drop in audio or video", "One file, or several to clean them all with the same settings."],
      ["Clean and polish", "Remove noise with Fast or Best and a Strength slider, take out low rumble and harsh S sounds, and set the loudness: Social video (−14 LUFS) or Podcast (−16 LUFS). Press B to compare before and after."],
      ["Export", "WAV, FLAC, M4A or MP3, each file checked after writing, or the video with its new sound. Nothing is overwritten without asking."],
    ],
    requirements: [
      "macOS 12 Monterey or later, Windows 10 (version 1903 or later) / 11, or Linux with glibc 2.35+ (e.g. Ubuntu 22.04+).",
      "Fast works on any 64-bit computer. Best needs SSE4.2 and POPCNT on Intel / AMD and downloads its model (10.5 MB) once.",
    ],
    privacy: "Your recordings never leave your computer. Fast is built into the app; the Best model is downloaded once (10.5 MB) from this project's releases and checked. That download is the app's only internet use.",
    faq: [
      ["Is KreoKit Voice free?", "Yes. It's open source (MIT / Apache-2.0), with no watermark, no account and no paid tier."],
      ["Can it remove background noise from a video?", "Yes. The picture is copied untouched, bit for bit, and only the sound is replaced, in the same container (MP4, MOV, MKV, WebM). Or save just the cleaned sound."],
      ["Which loudness should I use?", "Social video (−14 LUFS) for TikTok, Reels, Shorts and YouTube; Podcast (−16 LUFS) for podcasts. You can also set your own target or keep the original level."],
      ["What's the difference between Fast and Best?", "Fast (RNNoise) is built in and works on any 64-bit computer. Best (DPDFNet) sounds clearer and also takes some room echo away."],
      ["Does it remove echo?", "Not fully yet. There's no dedicated room-echo removal in this version, but Best takes some echo away."],
      ["Does it work offline?", "Yes. Fast works offline from the start; Best needs a one-time 10.5 MB download."],
    ],
  },
  {
    slug: "rec",
    title: "Free Screen Recorder with Webcam, No Watermark | KreoKit",
    description: "Free screen recorder with webcam and microphone for Windows, Mac and Linux. Trim, add a camera bubble, clean up your voice and export an MP4. No sign-up.",
    h1: "Free screen recorder with webcam, no watermark",
    name: "Rec",
    short: "Record your screen, camera and mic, then trim, add a camera bubble and export an MP4.",
    what: [
      "Record your screen, camera and microphone for tutorials, demos and reaction videos, then trim the ends, place your camera bubble, clean up your voice and export a ready-to-share MP4.",
      "Every source is recorded as its own crash-safe track: if something crashes, everything up to the last second or two is kept, and Rec offers to recover it. No watermark, no account, no upload.",
    ],
    who: "For creators and anyone making tutorials, demos, reaction videos and quick explainers. Rec is built around one promise: never lose a recording, so it keeps v0.1 small and solid rather than full of features.",
    features: [
      ["Record", "The whole screen, a region or a window, with your camera and microphone (and the computer's sound on macOS 13+, Windows and Linux), at 1080p or 720p, 30 fps."],
      ["While recording", "A 3-2-1 countdown, a small floating control (time, level, pause, stop), your camera in a bubble, and a stop shortcut from any app. Rec keeps its own windows out of the video where the system allows it."],
      ["Never lose a recording", "Crash-safe tracks with recovery, low-disk warnings, and an automatic stop before the disk is full. Picture and sound are checked after every recording."],
      ["Finish", "Trim the start and end; choose screen only, screen + camera bubble (circle or rounded, any corner, three sizes) or camera only; clean up your voice and set the loudness."],
    ],
    steps: [
      ["Choose what to record", "The whole screen, a region or a window, with your camera and microphone (and the computer's sound on macOS 13+, Windows and Linux), at 1080p or 720p."],
      ["Record", "A 3-2-1 countdown, a small floating control and your camera in a bubble. Stop from any app with ⌥⇧⌘S (Mac) or Ctrl+Alt+Shift+S."],
      ["Finish and export", "Trim the ends, choose screen only, screen + camera bubble or camera only, clean up your voice, set the loudness and export an MP4."],
    ],
    requirements: [
      "macOS 12 Monterey or later (recording a window needs 12.3, the computer's sound needs macOS 13), Windows 10 (version 1903 or later) / 11, or Linux with PipeWire 0.3.53 or later (e.g. Ubuntu 24.04).",
      "Rec asks for Screen Recording, Microphone and Camera permission the first time it needs them.",
      "This alpha has been measured on one Mac so far; the release notes say what is only informally tested.",
    ],
    privacy: "Your recordings stay on your computer. Rec doesn't upload anything, needs no account and has no telemetry; voice cleanup (RNNoise) is built in, so Rec needs no downloads at all.",
    faq: [
      ["Is KreoKit Rec free, without a watermark?", "Yes. It's open source (MIT / Apache-2.0), with no watermark, no account and no paid tier."],
      ["Can I record my webcam and microphone with my screen?", "Yes. Camera, microphone and screen are recorded together, each as its own track, and your camera can appear in a bubble in the corner you choose."],
      ["Can it record the computer's sound?", "Yes on Windows, Linux and macOS 13 or later. On macOS 12, Rec records screen, camera and microphone."],
      ["What happens if my computer crashes while recording?", "Each source is written as its own crash-safe track, so everything up to the last second or two is kept, and Rec offers to recover it next time."],
      ["What format does it export?", "An MP4 (H.264 video, AAC audio), checked after writing, at 1080p or 720p and 30 frames a second."],
      ["How well tested is it?", "It's an alpha measured on one Mac (macOS 12) so far. Windows and Linux pass automated tests and friends' informal tries; the release notes list exactly what."],
    ],
  },
];

export const apps = copy.map((app) => {
  const release = releases[app.slug];
  if (!release) throw new Error(`data/apps.json has no entry for "${app.slug}". Run: npm run sync-releases -- ${app.slug}`);
  return { ...app, fullName: `KreoKit ${app.name}`, ...release };
});

export const ORG_URL = "https://github.com/kreokit";
