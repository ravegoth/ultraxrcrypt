from ultraxrcrypt import *

distribution = {}

print("<-- often                                             rare -->")
for i in range(100):
    counter = 0
    while counter < 10:
        item = generate(64, (ord('a'), ord('z')))
        hasheditem = hash(item + str(counter), length=64)
        
        # letter distribution to check if the encryption is uniform
        for letter in hasheditem:
            if letter in distribution:
                distribution[letter] += 1
            else:
                distribution[letter] = 1
        
        counter += 1
    # sort by frequency
    distribution = dict(sorted(distribution.items(), key=lambda item: item[1], reverse=True))
    for key in distribution:
        print(key,end="")
    print("")