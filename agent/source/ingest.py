# This is for document loading and chunking

import os
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

def load_documents(data_path="agent/data") -> list:
    all_pages = []
    document_list = os.listdir(data_path)
    for file in document_list:
        file_path = os.path.join(data_path, file)
        if not os.path.exists(file_path):
            continue
        loader = PyPDFLoader(file_path)
        pages = loader.load()
        all_pages.extend(pages)
    return all_pages

def split_documents(pages: list, chunk_size=1000, chunk_overlap=100) -> list:
    splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    return splitter.split_documents(pages)
