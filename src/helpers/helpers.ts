import wordList from "../word-list";

export const generateWord = (size: number) => {

    const sizeIndex = size === undefined
        ? Math.floor(Math.random() * wordList.length)
        : size - 3;

    if (sizeIndex < 0 || sizeIndex >= wordList.length) {
        return null;
    }

    const words = wordList[sizeIndex];
    const wordIndex = Math.floor(Math.random() * words.length);
    return words[wordIndex];
}