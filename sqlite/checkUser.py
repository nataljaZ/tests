#!/usr/bin/python

import sqlite3 as lite
import collections
import json
import cgi
import sys

print "Content-type: text/html"
print

result="{\"value\":\"%s\"}"

form = cgi.FieldStorage()

if form.has_key('username'):
	username = form['username'].value
else:
	result=result %("false")
	print result
	sys.exit()
	
	
if form.has_key('password'):
	password = form['password'].value
else:
	result=result %("false")
	print result
	sys.exit()
	

	


string="SELECT * FROM teacher WHERE email= \"%s\"  AND password= \"%s\";" % (username,password)



con = lite.connect('test.db')  
  
objects_list = []

con.row_factory = lite.Row
       
cur = con.cursor() 
cur.execute(string)

rows = cur.fetchall()



if not rows:
	result=result %("false")
	print result
else:
	for row in rows:
		if row["status"]=="active":
			result=result %(row["id"])
		else:
			result=result %("passive")
		print result
