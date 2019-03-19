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

	#sheet = gclient.open("y2006vis").sheet1
	sheet =  gclient.open("Medelbefolkning")
	# Get a list of all worksheets

	return sheet
def opensheet():
	scope = ['https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/drive']
	creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json',scope)
	gclient = gspread.authorize(creds)

	#sheet = gclient.open("y2006vis").sheet1
	sheet =  gclient.open("Medelbefolkning")
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
	y2006 = sheet.col_values(2); 
	y2007 = sheet.col_values(3);
	y2008 = sheet.col_values(4);
	y2009 = sheet.col_values(5);
	y2010 = sheet.col_values(6);
	y2011 = sheet.col_values(7);
	y2012 = sheet.col_values(8);
	y2013 = sheet.col_values(9);
	y2014 = sheet.col_values(10);
	y2015 = sheet.col_values(11);
	y2016 = sheet.col_values(12);
	y2017 = sheet.col_values(13);
	y2018 = sheet.col_values(14);

	Firstslot = 1 #data börjar på 2
	Name = Name[Firstslot::] # ska bli int 
	y2006 = y2006[Firstslot::]  # ska bli int , omformatera
	y2007 = y2007[Firstslot::] # ska bli int , omformater
	y2008 = y2008[Firstslot::]
	y2009 = y2009[Firstslot::] # ska bli int
	y2010 = y2010[Firstslot::]
	y2011  = y2011[Firstslot::]
	y2012  = y2012[Firstslot::]
	y2013  = y2013[Firstslot::]
	y2014  = y2014[Firstslot::]
	y2015  = y2015[Firstslot::]
	y2016  = y2016[Firstslot::]
	y2017  = y2017[Firstslot::]
	y2018  = y2018[Firstslot::]


	print(Name)
	Cattegorarray  = [Name,y2006,y2007,y2008,y2009,y2010,y2011,y2012,y2013,y2014,y2015,y2016,y2017,y2018]
		
	
	return Cattegorarray;

def Gettitles(sheet):

	pythonsheets = sheet.get_all_records()
	Name = sheet.col_values(1);
	y2006 = sheet.col_values(2);
	y2007 = sheet.col_values(3);
	y2008 = sheet.col_values(4);
	y2009 = sheet.col_values(5);
	y2010 = sheet.col_values(6);
	y2011 = sheet.col_values(7);
	y2012 = sheet.col_values(8);
	y2013 = sheet.col_values(9);
	y2014 = sheet.col_values(10);
	y2015 = sheet.col_values(11);
	y2016 = sheet.col_values(12);
	y2017 = sheet.col_values(13);
	y2018 = sheet.col_values(14);
	#convert to arrays 
	Cattegorislot = 0
	
	Namearray = [Name[Cattegorislot],y2006[Cattegorislot],y2007[Cattegorislot],y2008[Cattegorislot],y2009[Cattegorislot],y2010[Cattegorislot],y2011[Cattegorislot],y2012[Cattegorislot],y2013[Cattegorislot],y2014[Cattegorislot],y2015[Cattegorislot],y2016[Cattegorislot],y2017[Cattegorislot],y2018[Cattegorislot]]

	return Namearray;
