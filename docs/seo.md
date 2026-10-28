# SEO plan

Approved by the user on 2026-10-28. Every phrase below appeared in Google's autocomplete on that day (people really type it). Titles, descriptions, headings and copy are built on these intents. Rules: honest content only, no keyword stuffing, no competitor brand names in titles, no reviews or ratings.

| Page | Main intent | Related phrases |
|---|---|---|
| Home | free tools for content creators | free software for content creation · free video creator tools · free editing software for content creators |
| Captions | free auto caption generator (no watermark) | free auto captions for videos · auto subtitle generator free without watermark · srt generator from video free · auto caption offline |
| Cutout | remove background from image free | background remover offline for PC · remove background free no sign up · remove background batch free |
| Clips | turn long video into shorts free | podcast to clips free · long video to shorts converter free · video to shorts converter free without watermark |
| Voice | remove background noise from audio free | remove background noise from video free · clean up audio recording free · noise remover free download |
| Rec | free screen recorder no watermark | screen recorder with webcam and microphone · free screen recorder no sign up · free screen recorder for Windows / Mac |
| Install | windows protected your pc run anyway | mac open anyway · how to run appimage on ubuntu |

## Left out on purpose

- "online": the apps are desktop apps, not web apps.
- "AI clip maker" for Clips: its moment finder uses transparent rules, not AI ranking (Whisper and face detection are AI and are described as such).
- "no time limit" for Rec: nothing in the docs states it.
- "HD / high resolution" for Cutout: it exports at the original size, and the page says exactly that.
- Competitor names (they appear in the suggestions, but never in our titles or copy).

## Checks

`npm run check-seo` (after `npm run build`) checks every page: title ≤ 60 characters, meta description ≤ 155, exactly one h1, no skipped heading levels, canonical URL, alt text on every image, Open Graph and Twitter tags, and that the JSON-LD parses and has the required fields.
