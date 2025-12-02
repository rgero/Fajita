# Fajita
Fajita is a project that a friend and I have been working on together. Its purpose is to be a tool that our friends use during our weekly hang outs to manage a queue of YouTube videos. 

This repository is specifically for Nacho, which is the web app that people use to manipulate the queue. This web app communicates to a custom service which also commits to a Player website. Nacho is written in Typescript, utilizing React and MaterialUI. 

Nacho has the following functionality:
- Ability to join an existing queue
- Switch between queues
- Search for videos
- Add videos to the queue they are connected to
-- Users can add videos in a variety of ways, such as marking it as secret, shouting to the audience, or making it the next video to be played.
- Delete videos from the queue
- Skip to a different video
-- This can be done with the "Skip" functionality which just goes to the next video or by selecting a video from the queue and skipping to it.
- Control playback - Currently this is only toggling the play status of the video, the ability to skip to a specific point in the video is being investigated
- Adding videos to their personal stash, which in essence is a "Save for Later".
- Share videos outside of Nacho

### Important Dates
- 2024-12-12 - Incrementing version release to 0.5
- 2024-12-21 - Enchilada Branch merged
- 2025-01-06 - Incrementing the version to 0.6
- 2025-01-17 - Added the Stash, which allows people to save things from/for the queue.
- 2025-05-15 - Incremented the version to 0.7
- 2025-12-02 - Incrementing the version to 0.8.5, will need to document the changes further.