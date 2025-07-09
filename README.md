# 🧥👗 AI Stylist – Your Smart Wardrobe Assistant

**AI Stylist** is a smart wardrobe and outfit recommendation web app built with **Next.js**. Users can save their wardrobe, scan their face, and get personalized outfit suggestions based on **color harmony**. It even includes a **real-time lens feature** so you can try on outfits virtually.

> ⚠️ **Note:**  
> The core features are functional, but the **frontend UI is currently distorted and not production-ready**. We're actively working on design improvements.

---

## 🌐 Live Demo

🚀 Try it out now: [https://ai-stylist-umber.vercel.app/](https://ai-stylist-umber.vercel.app/)

Feel free to explore — the experience is rough, but the logic and features are working under the hood.

---

## ✨ Key Features

- **👚 Wardrobe Manager**  
  Add your clothing items to create a virtual closet.

- **🎨 Color Harmony Outfit Suggestions**  
  Recommendations based on color theory (complementary, analogous, triadic schemes).

- **📸 Face Scan & Personalization**  
  Scan your face to customize outfit suggestions and styles.

- **👁️‍🗨️ Real-Time Lens Preview**  
  Use your camera to preview how clothing combinations would look on you.

---

## 🧱 Tech Stack

- **Frontend**: Next.js, Tailwind CSS (WIP)
- **Backend**: Node.js, Express (or API Routes)
- **Face Detection**: (e.g., TensorFlow.js / MediaPipe / custom logic)
- **Storage**: Cloudinary / Firebase / local
- **Color Matching Logic**: Custom algorithm based on color harmony theory

---

## 🚧 Known Issues

- The **UI is currently distorted** and lacks proper styling and responsiveness.
- Real-time lens preview is **experimental** and may behave unpredictably across devices.
- Minimal error handling and user feedback in some flows.

---

## 🧪 Local Development

To run the project locally:

```bash
git clone https://github.com/yourusername/ai-stylist.git
cd ai-stylist
npm install
npm run dev
