import os
import re
import urllib.parse
import webbrowser

import eel

@eel.expose
def process(text):
	text = re.sub("-\n", "", text)
	text = re.sub("\.\s*([A-Z])", ".\n\\1", text)
	text = re.sub("([^.:;])\n", "\\1 ", text)
	return text, 


@eel.expose
def open_translator(translator, text_en):
	translator_url = {
		"googletrans":"translate.google.co.jp",
		"deepl":"www.deepl.com/translator",
	}
	exst_en_quote = urllib.parse.quote(text_en.replace("/", "\/"))
	url = "https://"+translator_url[translator]+"/#en/ja/"+exst_en_quote
	webbrowser.open(url, new=1, autoraise=True)
	return


@eel.expose
def reprace_math_typeset(text, math_text_arr):
	num_len = len(str(len(math_text_arr)))
	for i, s in enumerate(math_text_arr):
		text = text.replace(s, "#"+str(i).zfill(num_len), 1)
	return text


@eel.expose
def restore_math_typeset(text, math_text_arr):
	num_len = len(str(len(math_text_arr)))
	for i, s in enumerate(math_text_arr):
		text = text.replace("#"+str(i).zfill(num_len), s, 1)
	return text


@eel.expose
def extraction_math_typeset(text):
	return re.findall("\$[^\$]*\$", text)


def main():
    # eel.init(os.getcwd(sys.argv[0]))
    eel.init(os.path.dirname(__file__))
    eel.start("web/text_shaping.html", size=(700, 700), port=8080)


if __name__ == "__main__":
    main()