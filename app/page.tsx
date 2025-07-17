"use client";
import Image from "next/image";
import Name from "./Name";
import Cards from "./Cards";
import { useEffect, useRef, useState } from "react";
import Medal from "./Medal";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function Home() {
    const cardsRef = useRef<HTMLDivElement>(null);
    function fixScrollVtoH(event: any) {
        event.preventDefault();
        if (cardsRef.current) {
            cardsRef.current.scrollLeft += event.deltaY / 2 + event.deltaX / 2;
        }
    }
    const words = ["SCULPTOR", "STORYTELLER", "PRODUCER", "DREAMER", "COLLABORATOR", "PLACE MAKER", "RESEARCHER"];

    const [randomWordsWithPosition, setRandomWordsWithPosition] = useState(words.map((word) => ({
        word,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        key: Math.random(),
    })));
    const cards = new Array(15).fill(null).map((_, index) => ({
        id: index,
        title: `Image ${index + 1}`,
        url: `/cards/${index + 1}.png`,
    })).splice(1, 15);
    const [open, setOpen] = useState(-1);

    useEffect(() => {
        const checkWordsPosition = () => {
            const words = document.querySelectorAll('.background-word');
            words.forEach((word, index) => {
                const rect = word.getBoundingClientRect();
                if (rect.top > window.innerHeight) {
                    setRandomWordsWithPosition(prev => {
                        const newArray = [...prev];
                        newArray[index] = {
                            ...prev[index],
                            left: `${Math.random() * 100}%`,
                            animationDelay: '0s',
                            key: Math.random(),
                        };
                        return newArray;
                    });
                }
            });
        };

        const interval = setInterval(checkWordsPosition, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <main onWheel={fixScrollVtoH}>
                <Lightbox
                    open={open !== -1}
                    close={() => setOpen(-1)}
                    slides={cards.map((card) => ({
                        src: card.url,
                        title: card.title,
                    }))}
                    index={open}
                ></Lightbox>
                <nav>
                    <Name />
                    <div className="nav-buttons">
                        <button className="red-btn">BIO</button>
                        <button className="red-btn">PROD.</button>
                        <button className="red-btn">ART</button>
                    </div>
                </nav>
                <div className="main-content" ref={cardsRef}>
                    <Cards setOpen={setOpen} cards={cards} />
                </div>
                <div className="final-content">
                    <div className="final-left">
                        <Medal height={'40px'} color={'red'} />
                        <Medal height={'40px'} color={'red'} />
                    </div>
                    <div className="final-right">
                        <span>email: <span className="red">hi@example.com</span></span>
                        <span>instagram: <span className="red">@example_insta</span></span>
                        <span>linkedin: <span className="red">example_linkedin</span></span>
                    </div>
                </div>
            </main><div className="background-words">
                {randomWordsWithPosition.map((item, index) => (
                    <span
                        key={item.key}
                        data-index={index}
                        className="background-word"
                        style={{
                            left: item.left,
                            animationDelay: item.animationDelay,
                        }}
                    >
                        {item.word}
                    </span>
                ))}
            </div>
        </>
    );
}
