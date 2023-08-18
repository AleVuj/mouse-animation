'use client';
import styles from './page.module.css';
import { useRef } from 'react';

export default function Home() {
  let currentIndex = 0;
  let refs = [];
  let step = 0;
  let maxImages = 6;
  let nbOfItems = 0;

  const manageMouseMove = (e) => {
    const { clientX, clientY, movementX, movementY } = e;

    step += Math.abs(movementX) + Math.abs(movementY);

    if (step >= 200 * currentIndex) {
      mouseMove(clientX, clientY);

      if (nbOfItems == maxImages) {
        //remove
        removeImage();
      }
    }

    if (currentIndex == refs.length) {
      currentIndex = 0;
      step = -200;
    }
  };

  const removeImage = () => {
    const images = getImages();
    images[0].style.display = 'none';
    nbOfItems--;
  };

  const mouseMove = (x, y) => {
    const targetImage = refs[currentIndex].current;
    targetImage.style.display = 'block';
    targetImage.style.left = x + 'px';
    targetImage.style.top = y + 'px';
    currentIndex++;
    nbOfItems++;
    resetZIndex();
  };

  const resetZIndex = () => {
    const images = getImages();
    images.forEach((image, index) => {
      image.style.zIndex = index;
    });
  };

  const getImages = () => {
    let images = [];
    const indexOfFirstImage = currentIndex - nbOfItems;
    for (let i = indexOfFirstImage; i < currentIndex; i++) {
      let targetIndex = i;
      if (targetIndex < 0) targetIndex += refs.length;
      images.push(refs[targetIndex].current);
    }
    return images;
  };

  return (
    <main
      onMouseMove={(e) => {
        manageMouseMove(e);
      }}
      className={styles.main}
    >
      {[...Array(19).keys()].map((_, index) => {
        const ref = useRef(null);
        refs.push(ref);

        return (
          <img
            ref={ref}
            key={index}
            src={`/images/${index}.jpg`}
            alt="random"
          ></img>
        );
      })}
    </main>
  );
}
