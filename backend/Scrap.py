import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time
import pandas as pd

# Initialize the web driver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

def search_product_amazon(product_details):
    search_url = f"https://www.amazon.in/s?k={product_details}"
    driver.get(search_url)
    time.sleep(5)  # Allow time for the page to load

    soup = BeautifulSoup(driver.page_source, 'html.parser')
    products = []
    for item in soup.find_all('div', {'data-component-type': 's-search-result'}):
        try:
            product_name = item.h2.text.strip()
        except AttributeError:
            product_name = 'N/A'
        try:
            price = item.find('span', 'a-price-whole').text.strip()
        except AttributeError:
            price = 'N/A'
        try:
            rating = item.find('span', 'a-icon-alt').text.strip()
        except AttributeError:
            rating = 'No rating'
        try:
            num_reviews = item.find('span', {'class': 'a-size-base'}).text.strip()
        except AttributeError:
            num_reviews = 'No reviews'

        if product_name != 'N/A':
            products.append({
                'Product Name': product_name,
                'Price': price,
                'Rating': rating,
                'Number of Reviews': num_reviews
            })

    # Save data to CSV
    if products:
        df_amazon = pd.DataFrame(products)
        df_amazon.to_csv('amazon_product_data.csv', index=False)
        print("Amazon data written to amazon_product_data.csv")
    else:
        print("No product details found on Amazon.")
        df_amazon = pd.DataFrame()

    return df_amazon

def search_product_flipkart(product_details):
    search_url = f"https://www.flipkart.com/search?q={product_details}"
    driver.get(search_url)

    try:
        # Wait for product cards to load
        WebDriverWait(driver, 20).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, '_1AtVbE'))
        )

        soup = BeautifulSoup(driver.page_source, 'html.parser')
        products = []
        for item in soup.find_all('div', {'class': '_1AtVbE'}):
            try:
                product_name = item.find('div', {'class': '_4rR01T'}).text.strip()
            except AttributeError:
                product_name = 'N/A'
            try:
                price = item.find('div', {'class': '_30jeq3 _1_WHN1'}).text.strip()
            except AttributeError:
                price = 'N/A'
            try:
                rating = item.find('div', {'class': '_3LWZlK'}).text.strip()
            except AttributeError:
                rating = 'No rating'

            if product_name != 'N/A':
                products.append({
                    'Product Name': product_name,
                    'Price': price,
                    'Rating': rating
                })

        # Save data to CSV
        if products:
            df_flipkart = pd.DataFrame(products)
            df_flipkart.to_csv('flipkart_product_data.csv', index=False)
            print("Flipkart data written to flipkart_product_data.csv")
        else:
            print("No product details found on Flipkart.")
            df_flipkart = pd.DataFrame()

    except Exception as e:
        print(f"An error occurred while fetching data from Flipkart: {e}")
        df_flipkart = pd.DataFrame()

    return df_flipkart

def get_product_data(product_details):
    amazon_data = search_product_amazon(product_details)
    flipkart_data = search_product_flipkart(product_details)

    # Save data to Excel
    if not amazon_data.empty or not flipkart_data.empty:
        with pd.ExcelWriter('product_data_analysis.xlsx', engine='openpyxl') as writer:
            if not amazon_data.empty:
                amazon_data.to_excel(writer, sheet_name='Amazon Data', index=False)
            if not flipkart_data.empty:
                flipkart_data.to_excel(writer, sheet_name='Flipkart Data', index=False)
        print("Data has been written to product_data_analysis.xlsx")
    else:
        print("No data available to save.")

    return amazon_data, flipkart_data

# Input from user
product_details = input("Enter product details (e.g., 'woolen shirt red pattern'):")
amazon_data, flipkart_data = get_product_data(product_details)

# Print results
print("\nAmazon Products:")
if not amazon_data.empty:
    print(amazon_data)
else:
    print("No Amazon data available.")

print("\nFlipkart Products:")
if not flipkart_data.empty:
    print(flipkart_data)
else:
    print("No Flipkart data available.")

# Close the driver
driver.quit()