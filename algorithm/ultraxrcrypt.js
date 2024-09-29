const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
const startMarker = "{~xr~}+";
const endMarker = "-{~xr~}";

// Custom modulo function to mimic Python's behavior
function mod(n, m) {
    return ((n % m) + m) % m;
}

// Hash function
function hash(key, customAlphabet, length = 64) {
    const alphabetToUse = customAlphabet || alphabet;
    key = key.toString();
    let result = "";
    let keysum = Array.from(key).reduce((acc, c) => acc + c.charCodeAt(0), 0);

    for (let i = 0; i < length; i++) {
        let keyitem = key.charCodeAt(i % key.length);

        let hasheditem = mod((keyitem * keyitem + Math.sin(keyitem * i * i - 29) * 110 + 401), 1000);
        hasheditem += mod((keyitem * 2 + Math.sin(keyitem * i * 91 - keysum * 7) * 160 + 301), 1000);
        hasheditem += mod((keyitem * 5 + Math.sin(i * 13 * keysum * 3) * 102 + 201), 777);
        hasheditem += Math.sin(keyitem * i + keysum * keyitem) * keysum + 101;
        hasheditem += keyitem * i + 77 * (i % key.length);

        let index = mod(Math.floor(hasheditem), alphabetToUse.length);
        result += alphabetToUse[index];
    }

    return result;
}

// Generate noise
function generateNoise(minLength = 1, maxLength = 16, context = alphabet) {
    if (context.length === 0) {
        context = alphabet;
    }

    let noise = "";
    let length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    for (let i = 0; i < length; i++) {
        noise += context[Math.floor(Math.random() * context.length)];
    }

    return startMarker + noise + endMarker;
}

// Add noise to text
function addNoise(text, count, minLength = 1, maxLength = 16, context = alphabet) {
    let selected = [];
    let textlen = text.length;

    for (let i = 0; i < count; i++) {
        selected.push(Math.floor(Math.random() * textlen));
    }
    selected.sort((a, b) => a - b);

    let result = "";
    let indexInSelected = 0;
    for (let i = 0; i < text.length; i++) {
        result += text[i];
        if (indexInSelected < selected.length && i === selected[indexInSelected]) {
            let noiseToAdd = generateNoise(minLength, maxLength, context);
            result += noiseToAdd;
            indexInSelected++;
        }
    }

    return result;
}

// Remove noise from text
function noiseRemover(text) {
    return text.replace(/\{~xr~\}\+.*?\-\{~xr~\}/g, '');
}

// Encryption function
function uxrcrypt(text, key, padding = 16) {
    let encryptedResult = "";

    // Add noise to the text
    text = addNoise(text, 5 + Math.floor(Math.random() * 11), 1, 16, alphabet);

    // Add padding noise
    text = generateNoise(1, padding, alphabet) + text + generateNoise(1, padding, alphabet);

    let keylen = key.length;
    let textlen = text.length;
    let keysum = Array.from(key).reduce((acc, c) => acc + c.charCodeAt(0), 0);

    for (let i = 0; i < textlen; i++) {
        let keyitem = key.charCodeAt(i % keylen);
        let encryptedChar = text.charCodeAt(i);

        // Encryption formula
        encryptedChar += mod((keylen * keylen + keyitem * keyitem), 111);
        encryptedChar += mod((37 * keyitem), 31);
        encryptedChar += mod(((textlen * textlen + 7) * keylen), 222);
        encryptedChar += mod((keylen * textlen - 1), 333);
        encryptedChar += mod((keysum * textlen + keysum * keylen - (keysum ^ keyitem)), 255);
        encryptedChar -= mod(((2 * textlen) % 8 + 1), 33);
        encryptedChar += mod(((i % keylen * 3) % 37), 555);
        encryptedChar += ((keyitem * 11) % 5) * 1001 + 777;

        encryptedResult += String.fromCharCode(encryptedChar);
    }

    return encryptedResult;
}

// Decryption function
function deuxrcrypt(text, key) {
    let decryptedResult = "";

    let keylen = key.length;
    let textlen = text.length;
    let keysum = Array.from(key).reduce((acc, c) => acc + c.charCodeAt(0), 0);

    for (let i = 0; i < textlen; i++) {
        let keyitem = key.charCodeAt(i % keylen);
        let decryptedChar = text.charCodeAt(i);

        // Decryption formula (reversing encryption logic)
        decryptedChar -= ((keyitem * 11) % 5) * 1001 + 777;
        decryptedChar -= mod(((i % keylen * 3) % 37), 555);
        decryptedChar += mod(((2 * textlen) % 8 + 1), 33);
        decryptedChar -= mod((keysum * textlen + keysum * keylen - (keysum ^ keyitem)), 255);
        decryptedChar -= mod((keylen * textlen - 1), 333);
        decryptedChar -= mod(((textlen * textlen + 7) * keylen), 222);
        decryptedChar -= mod((37 * keyitem), 31);
        decryptedChar -= mod((keylen * keylen + keyitem * keyitem), 111);

        decryptedResult += String.fromCharCode(decryptedChar);
    }

    // Remove noise from the decrypted text
    return noiseRemover(decryptedResult);
}

// Testing function
function testingFailed() {
    const text = "Hello, World! This is a test text to check the encryption and decryption.";
    let key = "This is a key to test the encryption and decryption.";

    // Test with original key
    let encryptedText = uxrcrypt(text, key);
    let decryptedText = deuxrcrypt(encryptedText, key);

    if (decryptedText !== text) {
        return true;
    }

    // Test with hashed key
    key = hash(key);
    encryptedText = uxrcrypt(text, key);
    decryptedText = deuxrcrypt(encryptedText, key);

    if (decryptedText !== text) {
        return true;
    }

    return false;
}

// Run the test
if (testingFailed()) {
    console.error("ENCRYPTION AND DECRYPTION DOESN'T WORK PROPERLY. FIX ultraxrcrypt.js!");
    throw new Error("Encryption/Decryption failed.");
} else {
    console.log("ultraxrcrypt.js verified and ready to use.");
}
