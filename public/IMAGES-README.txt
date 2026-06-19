Put your image files in THIS folder (public/). The site references them by these exact names:

  profile.jpg   →  your photo (About section).      Path set in src/data.js → profile.photo
  grocery.jpg   →  Grocery Store project screenshot. Path set in src/data.js → projects[0].image
  dsa.png       →  DSA Project screenshot.           Path set in src/data.js → projects[1].image

Notes:
- File names must match exactly (case-sensitive on most hosts). If you save with a different
  name/extension, just update the matching path in src/data.js.
- Until a file is present, the site fails gracefully: project cards simply hide the image area,
  and the About section shows your initials instead of a photo.
- You can also use an online image URL instead of a local file — paste the full https URL
  into the same field in src/data.js (e.g. profile.photo = "https://...").

You can delete this file once your images are in.
