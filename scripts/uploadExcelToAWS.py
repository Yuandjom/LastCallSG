import openpyxl 
import os
import boto3

SPREADSHEETNAME = 'Phillips market item info'
SPREADSHEETFILE = r"C:\Users\cheej\Desktop\SEND_HELP\scripts\BFG .xlsx"

STORE_ID = 4
DYNAMODB_TABLE = "LastCallSG"



aws_access_key_id = 'AKIAVAY2Y2RRT2TPC7MC'
aws_secret_access_key = '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'

region_name = "ap-southeast-1"

dynamodb = boto3.client(
    'dynamodb',
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    region_name=region_name
)




if not os.path.exists(SPREADSHEETFILE):
    print(f"Error: The file {SPREADSHEETFILE} does not exist.")
else:
    # Load the workbook
    targetSpreadSheet = openpyxl.load_workbook(SPREADSHEETFILE)

    # Select the specific sheet
    storeItemSpreadSheet = targetSpreadSheet[SPREADSHEETNAME]

    # Prepare the list to hold item dictionaries
    items_list = []

    # Iterate through the rows, starting from the second row to skip headers
    for i, row in enumerate(storeItemSpreadSheet.iter_rows(min_row=2), start=2):
        item = {"M":{
            'description': {"S": str(row[0].value)},
            'discount': {"N": str(row[1].value)},
            'expiryDate': {"S": str(row[2].value)},
            'imageURL': {"S": str(row[3].value)},
            'name': {"S": str(row[4].value)},
            'originalPrice': {"N": str(row[5].value)},
            'quantity': {"N": str(row[6].value)},
            'finalPrice': {"N": str(row[7].value)}  # Convert to string
        }}
        items_list.append(item)

    new_items_list = {"L":items_list}
    # Update the items in DynamoDB
    dynamodb.update_item(
        TableName=DYNAMODB_TABLE,
        Key={'id': {'S': str(STORE_ID)}},
        UpdateExpression="SET #m = :newItems",
        ExpressionAttributeNames={'#m': 'items'},
        ExpressionAttributeValues={
            ":newItems": new_items_list
        }
    )


    print("Data has been updated successfully.")

    




