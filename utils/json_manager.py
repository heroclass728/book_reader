import json
import ntpath
import collections
import glob
import os

from core.settings import DOWNLOAD_JSON_DIR


def extract_pages_from_word(word):

    page_numbers = []
    boxes = {}

    json_files = glob.glob(os.path.join(DOWNLOAD_JSON_DIR, "*"))
    for json_path in json_files:

        with open(json_path) as json_file:
            json_content = json.load(json_file)

        json_name = ntpath.basename(json_path)
        json_number = int(json_name.replace(".json", ""))
        boxes_per_page = []
        for json_val in json_content[1:]:

            if word in json_val['description']:

                if json_number not in page_numbers:
                    page_numbers.append(json_number)
                tmp_dict = collections.defaultdict(dict)

                tmp_dict["l"] = json_val['boundingPoly']['vertices'][0]['x']
                tmp_dict["t"] = json_val['boundingPoly']['vertices'][0]['y']
                tmp_dict["r"] = json_val['boundingPoly']['vertices'][2]['x']
                tmp_dict["b"] = json_val['boundingPoly']['vertices'][2]['y']
                tmp_dict["page"] = json_number - 1

                boxes_per_page.append(tmp_dict)

        if boxes_per_page:
            boxes[json_number] = boxes_per_page

    return page_numbers, boxes
