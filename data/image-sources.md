# Free Image Sources for Profile Photos

For this Tinder clone app, you can use the following free image sources for profile photos:

## Free Stock Photo Websites

1. **Unsplash** (https://unsplash.com/)
   - High-quality free images
   - Search for "portrait" or "headshot"
   - No attribution required

2. **Pexels** (https://www.pexels.com/)
   - Free stock photos and videos
   - Search for "portrait" or "people"
   - No attribution required

3. **Generated.photos** (https://generated.photos/)
   - AI-generated faces that don't belong to real people
   - Perfect for demo apps
   - Some free options available

4. **This Person Does Not Exist** (https://thispersondoesnotexist.com/)
   - AI-generated faces
   - One random face per page refresh
   - Completely free to use
   - No real people are involved

## How to Use These Images in the App

1. Download images from these sources
2. Place them in the `/public/images/` directory
3. Name them according to the structure in the profiles data (e.g., alice1.jpg, bob1.jpg)
4. Replace the path in the profiles object:

```javascript
{
  id: 1,
  name: "Alice",
  age: 28,
  bio: "Loves hiking, coffee, and great conversations.",
  images: ["/images/alice1.jpg", "/images/alice2.jpg"]
}
```

## Important Note on Using AI-Generated Images

When building demo applications, it's often best to use AI-generated faces like those from "This Person Does Not Exist" or "Generated.photos". This avoids potential privacy concerns with using photos of real people in a dating-app demo.

## Additional Tips

- Try to maintain consistent image dimensions (e.g., 400x600px)
- Select diverse images to represent different users
- For a realistic dating app feel, choose clear facial portraits rather than group shots