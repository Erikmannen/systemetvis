#main

from datahandler import *
import time

tojson = 1
loadfromweeb=1


if (loadfromweeb == 0):
	allsheets=loaddatafromweebsheet()

	worksheet_list = allsheets.worksheets()
	nrofsheets=len(worksheet_list) 
	#print(worksheet_list)
	print(nrofsheets)
	#weebsheet = allsheets.get_worksheet(0)
	data = {}
	titlearray = []
	for i in range(0,nrofsheets):
		time.sleep( 2 )
		print(i)
		data[i] = []
		currentSheet = allsheets.get_worksheet(i)
		time.sleep( 10 )
		pythonsheets=setupsheet(currentSheet)
		time.sleep( 2 )
		if i == 0:
			titlearray = Gettitles(currentSheet)
		
		dataset = writetoxml(pythonsheets,titlearray)
		data[i].append(dataset)
		
	
	with open('data.json', 'w') as outfile:  
	   			json.dump(data, outfile)


