import random
import re
from math import sin

alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
start_marker = "{~xr~}+"
end_marker = "-{~xr~}"

def hash(key, alphabet=alphabet, length=64):
    key = str(key)
    result = ""
    keysum = sum([ord(c) for c in key])
    for i in range(length):
        keyitem = ord(key[i % len(key)])
        
        hasheditem = (keyitem*keyitem + sin(keyitem * i * i - 29) * 110 + 401) % 1000
        hasheditem += (keyitem*2 + sin(keyitem * i * 91 - keysum * 7) * 160 + 301) % 1000
        hasheditem += (keyitem*5 + sin(i * 13 * keysum * 3) * 102 + 201) % 777
        hasheditem += sin(keyitem * i + keysum * keyitem) * keysum + 101
        hasheditem += keyitem * i + 77 * (i % len(key))
        
        result += alphabet[int(hasheditem) % len(alphabet)]
    
    return result

def generate(length, limits):
    result = ""
    for i in range(length):
        result += chr(random.randint(limits[0], limits[1]))
    return result

def generate_noise(min_length=1, max_length=16, context=alphabet):
    if len(context) == 0:
        context = alphabet

    noise = ""
    length = random.randint(min_length, max_length)
    for i in range(length):
        noise += context[random.randint(0, len(context) - 1)]

    return start_marker + noise + end_marker

def add_noise(text, count, min_length=1, max_length=16, context=alphabet):
    selected = []
    textlen = len(text)
    for i in range(count):
        selected.append(random.randint(0, textlen - 1))
    selected.sort()
    result = ""
    length = len(text)
    for i in range(length):
        result += text[i]
        if i in selected:
            noise_to_add = generate_noise(min_length, max_length, context)
            result += noise_to_add
            length += len(noise_to_add)

    return result    

def noise_remover(text):
    return re.sub(r"\{~xr~\}\+.*?\-\{~xr~\}", "", text)

def uxrcrypt(text, key, padding=16):
    encrypted_result = ""

    text = add_noise(text, 5 + random.randint(1,11), 1, 16, alphabet)

    text = generate_noise(1, padding, alphabet) + text + generate_noise(1, padding, alphabet)

    keylen = len(key)
    textlen = len(text)
    keysum = sum([ord(c) for c in key])

    for i in range(textlen):
        keyitem = ord(key[i % keylen])
        encrypted_char = ord(text[i])
        
        encrypted_char += (keylen * keylen + keyitem * keyitem) % 111
        encrypted_char += (37 * keyitem) % 31
        encrypted_char += ((textlen * textlen + 7) * keylen) % 222
        encrypted_char += (keylen * textlen - 1) % 333
        encrypted_char += (keysum * textlen + keysum * keylen - keysum ^ keyitem) % 255
        encrypted_char -= ((2 * textlen)%8 + 1) % 33
        encrypted_char += ((int(i % keylen) * 3) % 37) % 555
        encrypted_char += ((keyitem * 11) % 5) * 1001 + 777
        
        try:
            encrypted_result += chr(int(encrypted_char))
        except:
            print("Couln't add character: " + str(encrypted_char))
            exit(1)

    return encrypted_result

def deuxrcrypt(text, key):
    decrypted_result = ""

    keylen = len(key)
    textlen = len(text)
    keysum = sum([ord(c) for c in key])

    for i in range(textlen):
        keyitem = ord(key[i % keylen])
        textitem = ord(text[i])
        decrypted_char = ord(text[i])
        
        decrypted_char -= ((keyitem * 11) % 5) * 1001 + 777
        decrypted_char -= ((int(i % keylen) * 3) % 37) % 555
        decrypted_char += ((2 * textlen)%8 + 1) % 33
        decrypted_char -= (keysum * textlen + keysum * keylen - keysum ^ keyitem) % 255
        decrypted_char -= ((keylen * textlen - 1) % 333)
        decrypted_char -= ((textlen * textlen + 7) * keylen) % 222
        decrypted_char -= (37 * keyitem) % 31
        decrypted_char -= (keylen * keylen + keyitem * keyitem) % 111
        
        try:
            decrypted_result += chr(decrypted_char)
        except:
            print("Couln't add character: " + str(decrypted_char))
            exit(1)

    return noise_remover(decrypted_result)

def testing_failed():
    text = "Hello, World! This is a test text to check the encryption and decryption."
    key = "This is a key to test the encryption and decryption."
    if deuxrcrypt(uxrcrypt(text, key), key) != text:
        return True
    key = hash(key)
    if deuxrcrypt(uxrcrypt(text, key), key) != text:
        return True
    return False

if testing_failed():
    print("ENCRYPTION AND DECRYPTION DOESN'T WORK PROPERLY. FIX ultraxrcrypt.py!")
    exit(1)
else:
    print("ultraxrcrypt.py verified and ready to use.")
