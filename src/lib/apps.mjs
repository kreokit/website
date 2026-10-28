// What each app does, in plain words. Taken from each app's README and release notes:
// describe only what the released version really does. Release tags and file names live
// in data/apps.json (updated after every release), not here.
import releases from "../../data/apps.json";

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
      "For videos, the picture stays untouched and only the sound is replaced. No account, no upload.",
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
      "Every source is recorded as its own crash-safe track: if something crashes, everything up to the last second or two is kept, and Rec offers to recover it. No account, no upload.",
    ],
    steps: [
      ["Choose what to record", "The whole screen, a region or a window, with your camera and microphone (and the computer's sound on macOS 13+, Windows and Linux), at 1080p or 720p."],
      ["Record", "A 3-2-1 countdown, a small floating control and your camera in a bubble. Stop from any app with ⌥⇧⌘S (Mac) or Ctrl+Alt+Shift+S."],
      ["Finish and export", "Trim the ends, choose screen only, screen + camera bubble or camera only, clean up your voice, set the loudness and export an MP4."],
    ],
    requirements: [
      "macOS 12 Monterey or later (recording a window needs 12.3, the computer's sound needs macOS 13), Windows 10 (version 1903 or later) / 11, or Linux with PipeWire 0.3.53 or later (e.g. Ubuntu 24.04).",
      "This alpha has been measured on one Mac so far; the release notes say what is only informally tested.",
    ],
  },
];

export const apps = copy.map((app) => {
  const release = releases[app.slug];
  if (!release) throw new Error(`data/apps.json has no entry for "${app.slug}". Run: npm run sync-releases -- ${app.slug}`);
  return { ...app, fullName: `KreoKit ${app.name}`, ...release };
});

export const ORG_URL = "https://github.com/kreokit";
