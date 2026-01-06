# This contains prompt templates for the LLM

# Import Necessary Libraries

from langgraph.graph import START, END, StateGraph, MessagesState
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import ToolNode
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_chroma import Chroma
import PyPDF2
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from dotenv import load_dotenv
from IPython.display import Image, display
from typing import Literal
import asyncio
import os


file_path = os.listdir('files')


# Check if file exists
if not os.path.exists(file_path):
    print(f"⚠️ File not found: {file_path}")
    print("Please update the file_path variable with your PDF file.")
    print("\nFor this demo, we'll create sample documents instead...")
    
    # Create sample documents for demo
    from langchain_core.documents import Document
    pages = [
        Document(page_content=" Drug design is part of the virtual component of artificial intelligence in which mathematical algorithms are used, which we discuss as machine learning",
                metadata={"page": 30}),
        Document(page_content="Artificial intelligence (AI) is a vast and exciting field with numerous potential advancements. These include enhanced neural networks, modular neural networks, explainable AI, evolving machine learning, and federallearning.",
                metadata={"page": 209}),
        Document(page_content="Clustering in biostatistics is an essential unsupervised machine learning technique.",
                metadata={"page": 322}),
    ]
    print("✅ Using sample documents for demo")
else:
    # Load the PDF
    loader = PyPDFLoader(file_path)
    pages = []
    
    # Load pages (async loading)
    async for page in loader.alazy_load():
        pages.append(page)
    
    print(f"✅ Loaded {len(pages)} pages from PDF")