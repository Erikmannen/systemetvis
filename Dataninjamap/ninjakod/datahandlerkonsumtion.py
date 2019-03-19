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

	#sheet = gclient.open("y20152018vis").sheet1
	sheet =  gclient.open("Alkoholvanor")
	# Get a list of all worksheets

	return sheet
def opensheet():
	scope = ['https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/drive']
	creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json',scope)
	gclient = gspread.authorize(creds)

	#sheet = gclient.open("y20152018vis").sheet1
	sheet =  gclient.open("Alkoholvanor")
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
	y20152018 = sheet.col_values(2); 
	y20132016 = sheet.col_values(3);
	y20122015 = sheet.col_values(4);
	y20112014 = sheet.col_values(5);
	y20102013 = sheet.col_values(6);
	y20092012 = sheet.col_values(7);
	y20082011 = sheet.col_values(8);
	y20072010 = sheet.col_values(9);
	y20062009 = sheet.col_values(10);
	y20052008 = sheet.col_values(11);
	y20042007 = sheet.col_values(12);

	Firstslot = 1 #data börjar på 2
	Name = Name[Firstslot::] # ska bli int 
	y20152018 = y20152018[Firstslot::]  # ska bli int , omformatera
	y20132016 = y20132016[Firstslot::] # ska bli int , omformater
	y20122015 = y20122015[Firstslot::]
	y20112014 = y20112014[Firstslot::] # ska bli int
	y20102013 = y20102013[Firstslot::]
	y20092012  = y20092012[Firstslot::]
	y20082011  = y20082011[Firstslot::]
	y20072010  = y20072010[Firstslot::]
	y20062009  = y20062009[Firstslot::]
	y20052008  = y20052008[Firstslot::]
	y20042007  = y20042007[Firstslot::]
	

	print(Name)
	Cattegorarray  = [Name,y20152018,y20132016,y20122015,y20112014,y20102013,y20092012,y20082011,y20072010,y20062009,y20052008,y20042007]
		
	
	return Cattegorarray;

def Gettitles(sheet):

	pythonsheets = sheet.get_all_records()
	Name = sheet.col_values(1);
	y20152018 = sheet.col_values(2);
	y20132016 = sheet.col_values(3);
	y20122015 = sheet.col_values(4);
	y20112014 = sheet.col_values(5);
	y20102013 = sheet.col_values(6);
	y20092012 = sheet.col_values(7);
	y20082011 = sheet.col_values(8);
	y20072010 = sheet.col_values(9);
	y20062009 = sheet.col_values(10);
	y20052008 = sheet.col_values(11);
	y20042007 = sheet.col_values(12);
	
	#convert to arrays 
	Cattegorislot = 0
	
	Namearray = [Name[Cattegorislot],y20152018[Cattegorislot],y20132016[Cattegorislot],y20122015[Cattegorislot],y20112014[Cattegorislot],y20102013[Cattegorislot],y20092012[Cattegorislot],y20082011[Cattegorislot],y20072010[Cattegorislot],y20062009[Cattegorislot],y20052008[Cattegorislot],y20042007[Cattegorislot]]

	return Namearray;
