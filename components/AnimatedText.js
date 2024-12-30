'use client'
import { useEffect, useState } from "react"

const phrases = [
    "Your Fashion Assitant",
    "Wardrobe Suggester",
    "Have a look",
]

export default function AnimatedText() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const nextPhrase = () => {
        setIsAnimating(true)
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length)
            setIsAnimating(false)
        }, 1000) // This should match the CSS transition duration
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsAnimating(true)
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length)
                setIsAnimating(false)
            }, 500) // Match the CSS transition duration
        }, 3000) // Adjust the interval as needed

        return () => clearInterval(intervalId)
    })
    return (
            <h5
                className={`text-4xl font-bold text-white mb-8 transition-all duration-500 ease-in-out ${isAnimating ? 'opacity-0 transform translate-y-[-20px]' : 'opacity-100 transform translate-y-0'
                    }`}
            >
                {phrases[currentIndex]}
            </h5>


    )
}