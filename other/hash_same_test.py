from ultraxrcrypt import hash

counter = 0

history = []

hashed = hash(str(counter), alphabet="0123456abcdef", length=15)
history.append(hashed)
while True:
    counter += 1
    hashed = hash(str(counter), alphabet="0123456abcdef", length=15)
    if hashed in history:
        print(f"Collision found at {counter}!")
        found = hashed
        print("index: ", history.index(hashed))
        break
    if counter % 10000 == 0:
        print(f"Checked {counter} hashes. Latest: {hashed}")
    history.append(hashed)
