import ntpath
import glob
import os

from core.settings import DOWNLOAD_TEXT_DIR
from utils.hindi_tokenizer import Tokenizer


class TextAnalysis:

    def __init__(self):

        self.txt_folder = DOWNLOAD_TEXT_DIR
        self.hindi_token = Tokenizer()

    def get_sentence_per_page(self, page_num, srh_word):

        sentence_word = []
        text_files = glob.glob(os.path.join(self.txt_folder, "*"))
        for text_file in text_files:

            file_name = ntpath.basename(text_file).replace(".txt", "")
            if int(file_name) == page_num:

                text = self.hindi_token.read_from_file(filename=text_file)
                sentences = self.hindi_token.concordance(word=srh_word, text=text)

                for sentence in sentences:

                    sentence = sentence.replace("\n", " ")
                    word_count = sentence.count(srh_word)
                    rep_word = "{{{" + srh_word + "}}}"

                    sentence_word.append([sentence.replace(srh_word, rep_word), word_count])

        return sentence_word
