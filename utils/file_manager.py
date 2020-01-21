import os
import shutil
import random
import string


def create_directory_if_not_exists(dir_name):

    if not os.path.exists(dir_name):
        upper_dir = os.path.dirname(dir_name)
        if not os.path.exists(upper_dir):
            os.mkdir(upper_dir)
        os.mkdir(dir_name)

    return


def delete_files_in_folder(folder):

    for filename in os.listdir(folder):

        file_path = os.path.join(folder, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))


def random_word():

    letters = string.ascii_lowercase

    return ''.join(random.choice(letters) for i in range(3))


def load_text(filename):

    if os.path.isfile(filename):
        file = open(filename, 'r')
        text = file.read()
        file.close()
    else:
        text = ''

    return text
