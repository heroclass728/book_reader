import ntpath
import glob
import os

from settings import DOWNLOAD_TEXT_DIR
from utils.hindi_tokenizer import Tokenizer


class TextAnalysis:

    def __init__(self):

        self.txt_folder = DOWNLOAD_TEXT_DIR
        self.hindi_token = Tokenizer()

    def get_sentence_per_page(self, page_num, search_word):

        sentence_word = []
        text_files = glob.glob(os.path.join(self.txt_folder, "*"))
        for text_file in text_files:

            file_name = ntpath.basename(text_file).replace(".txt", "")
            if int(file_name) == page_num:

                text = self.hindi_token.read_from_file(filename=text_file)
                sentences = self.hindi_token.concordance(word=search_word, text=text)

                for sentence in sentences:

                    sentence = sentence.replace("\n", " ")

                    rep_word = "<b>" + search_word + "</b>"
                    sentence_word.append(sentence.replace(search_word, rep_word))

        return sentence_word
