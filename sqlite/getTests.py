#!/usr/bin/python

import sqlite3 as lite
import collections
import json

print "Content-type: text/html"
print

con = lite.connect('test.db')  
  
objects_list = []


    
con.row_factory = lite.Row
       
cur = con.cursor() 
cur.execute("SELECT * FROM test JOIN teacher as t ON test.teacher=t.id")

rows = cur.fetchall()

	
	#objects = [1,2]
for row in rows:
	d = collections.OrderedDict()
	d['id'] = row["id"]
	d['title'] = row["title"]
	d['description'] = row["description"]
	d['question'] = row["question"]
	d['datefrom'] = row["datefrom"]
	d['dateto'] = row["dateto"]
	d['status'] = row["status"]
	d['teacher'] = row["teacher"]
	d['teachername'] = row["firstn"]+" "+row["lastn"]
	d['language'] = row["language"]
	d['auth'] = row["authentication"]
	objects_list.append(d)
	

j = json.dumps(objects_list)

final = "{ \"tests\" : " + j + "}"
print final