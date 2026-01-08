# This contains the retrieval logic

import os
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma

def create_vectorstore(chunks: list, persist_dir="database/chroma_db"):
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
    vectorstore = Chroma(
        collection_name="agentic_rag_docs",
        persist_directory=persist_dir,
        embedding_function=embeddings
    )
    vectorstore.add_documents(chunks)
    return vectorstore
