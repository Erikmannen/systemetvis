#interpolation#interpolation

import gspread
import numpy as np
import string
import json
from oauth2client.service_account import ServiceAccountCredentials


def loaddatafromweebsheet():
	scope = ['https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/drive']
	creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json',scope)
	gclient = gspread.authorize(creds)

	#sheet = gclient.open("Spritvis").sheet1
	sheet =  gclient.open("Spritvis")
	# Get a list of all worksheets

	return sheet
def opensheet():
	scope = ['https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/drive']
	creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json',scope)
	gclient = gspread.authorize(creds)

	#sheet = gclient.open("Spritvis").sheet1
	sheet =  gclient.open("Spritvis")
	# Get a list of all worksheets

	return sheet	

def writetoxml(toxml,titles):
	


	if(toxml):
		endat = len(toxml[0][:]) 
		data = {}  
		for i in range(0,endat):
			data[toxml[0][i]] = []
			for u in range(1,len(titles)-1):
				data[toxml[0][i]].append({(titles[u]): toxml[u][i]})
	
		
		#with open('data.json', 'w') as outfile:  
   		#	json.dump(data, outfile)
	else:
		print("Could not write/was nothing to be written")
		data = {} 
		
	return data
def write2json(jsondata,titles,nrofsheets):

	if(jsondata):
		bigData = {}
		for listindex in range(0,nrofsheets):
			tojson = jsondata[listindex]
			bigData[listindex]= []
			endat = len(tojson[0][:]) 
			print(endat)
			data = {}  
			for i in range(0,endat):
				#print(tojson[listindex])

				#print(tojson[listindex][0][i])
				data[tojson[0][i]] = []
				for u in range(1,len(titles)):
					data[tojson[0][i]].append({(titles[u]): tojson[u][i]})
		
			bigData[listindex].append(data[tojson[listindex][0][i]])
			
		with open('data.json', 'w') as outfile:  
	   			json.dump(data, outfile)
	else:
		print("Could not write/was nothing to be written")
		bigData = {} 
		
	return bigData	

def setupsheet(sheet):
	# read in from sheet

	#pythonsheets = sheet.get_all_records()
	Name = sheet.col_values(1);
	Sprit = sheet.col_values(2); 
	Vin = sheet.col_values(3);
	ol = sheet.col_values(4);
	CideroBlanddrycker = sheet.col_values(5);
	Alkoholfri = sheet.col_values(6);
	Total = sheet.col_values(7);
	Totalt_ren_alkohol = sheet.col_values(8);
	
	
	Firstslot = 2 #data börjar på 2
	Name = Name[Firstslot::] # ska bli int 
	Sprit = Sprit[Firstslot::]  # ska bli int , omformatera
	Vin = Vin[Firstslot::] # ska bli int , omformater
	ol = ol[Firstslot::]
	CideroBlanddrycker = CideroBlanddrycker[Firstslot::] # ska bli int
	Alkoholfri = Alkoholfri[Firstslot::]
	Total  = Total[Firstslot::]
	Totalt_ren_alkohol  = Totalt_ren_alkohol[Firstslot::]
	print(Name)
	Cattegorarray  = [Name,Sprit,Vin,ol,CideroBlanddrycker,Alkoholfri,Total,Totalt_ren_alkohol]
		
	
	return Cattegorarray;

def Gettitles(sheet):

	pythonsheets = sheet.get_all_records()
	Name = sheet.col_values(1);
	Sprit = sheet.col_values(2);
	Vin = sheet.col_values(3);
	ol = sheet.col_values(4);
	CideroBlanddrycker = sheet.col_values(5);
	Alkoholfri = sheet.col_values(6);
	Total = sheet.col_values(7);
	Totalt_ren_alkohol = sheet.col_values(8);

	#convert to arrays 
	Cattegorislot = 0
	
	Namearray = [Name[Cattegorislot],Sprit[Cattegorislot],Vin[Cattegorislot],ol[Cattegorislot],CideroBlanddrycker[Cattegorislot],Alkoholfri[Cattegorislot],Total[Cattegorislot],Totalt_ren_alkohol[Cattegorislot]]

	return Namearray;
