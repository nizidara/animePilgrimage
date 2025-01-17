
# This function is used to normalize the line breaks in the input text. It replaces all the different types of line breaks with the Unix line break "\n".
def normalize_break(input: str) -> str:
    return input.replace("\r\n", "\n").replace("\r", "\n")