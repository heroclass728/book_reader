import json
import glob
import os
import cv2
import ntpath

from settings import ROOT_DIR
from utils import file_manager


def extract_pages_from_word(json_path_list, word):

    file_manager.delete_files_in_folder(os.path.join(ROOT_DIR, 'static', 'search_tmp'))
    image_names = [ntpath.basename(x) for x in glob.glob(os.path.join(ROOT_DIR, 'static', 'tmp', "*"))]
    image_urls = []
    image_number = []

    for json_path in json_path_list:

        with open(json_path) as json_file:
            json_content = json.load(json_file)

        json_name = ntpath.basename(json_path)
        json_number = int(json_name.replace(".json", ""))
        image_name = ""
        for name in image_names:

            if str(json_number) == str(name.replace("temp_", "")[:-7]):
                image_name = name
                break
        image_path = os.path.join(ROOT_DIR, 'static', 'tmp', image_name)
        image = cv2.imread(image_path)

        ret_change = False
        for json_val in json_content[1:]:

            if json_val['description'] == word:

                ret_change = True
                top_left_x = json_val['boundingPoly']['vertices'][0]['x']
                top_left_y = json_val['boundingPoly']['vertices'][0]['y']
                bottom_right_x = json_val['boundingPoly']['vertices'][2]['x']
                bottom_right_y = json_val['boundingPoly']['vertices'][2]['y']

                image = cv2.rectangle(image, (top_left_x, top_left_y), (bottom_right_x, bottom_right_y), (0, 0, 255), 2)

        if ret_change:

            search_image_name = str(json_number) + file_manager.random_word() + ".jpg"
            image_save_path = os.path.join(ROOT_DIR, 'static', 'search_tmp', search_image_name)
            cv2.imwrite(image_save_path, image)
            search_image_path = "static" + "/search_tmp/" + search_image_name
            image_urls.append(search_image_path)
            image_number.append(json_number)

    return image_number, image_urls
