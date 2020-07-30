import os
import json

def getFilePaths(currPath):
    info = []
    
    files = os.listdir(currPath)
    for f in files:
        fpath = currPath + "/" + f
        if os.path.isdir(fpath):
            info += getFilePaths(fpath)
        elif f[-4::] in [".png", ".jpg", ".gif", ".mp4"]:
            info += [fpath]
        

    return info


if __name__ == "__main__":
    if 'info.json' in os.listdir('../src'):
        print("Found Old Json")
        with open('../src/info.json') as fh:
            info = json.load(fh)
    else:
        print("New Json Created")
        info = {
            "Images": [],
            "Tags": []
        }
    
    files = getFilePaths("./assets")
    knownImages = [i["Path"] for i in info["Images"]]
    for file in files:
        if file not in knownImages:
            info["Images"].append({
                'Name': "",
                'Girl': "",
                'Path': file.replace('\\', '/'),
                'Tags': [],
                'Game': ""
            })
        else:
            idx = knownImages.index(file)
            if "Name" not in info["Images"][idx]:
                info["Images"][idx]["Name"] = ""

            if "Girl" not in info["Images"][idx]:
                info["Images"][idx]["Girl"] = ""

            if "Tags" not in info["Images"][idx]:
                info["Images"][idx]["Tags"] = []
            else:
                oldTags = info["Images"][idx]["Tags"]
                info["Images"][idx]["Tags"] = []
                for tag in oldTags:
                    if tag in info["Tags"]:
                        info["Images"][idx]["Tags"].append(tag)

            if "Game" not in info["Images"][idx]:
                info["Images"][idx]["Game"] = ""

    
    with open('../src/info.json', 'w') as fh:
        json.dump(info, fh, indent=4)