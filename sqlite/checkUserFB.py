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

if form.has_key('id'):
	id = form['id'].value
else:
	result=result %("false")
	print result
	sys.exit()

if form.has_key('firstn'):
	firstn = form['firstn'].value
else:
	firstn=""
	
if form.has_key('lastn'):
	lastn = form['lastn'].value
else:
	lastn=""

if form.has_key('email'):
	email = form['email'].value
else:
	email=""

	


string="SELECT * FROM teacher WHERE facebookId= \"%s\";" % (id)



con = lite.connect('test.db')  
  
objects_list = []

con.row_factory = lite.Row
       
cur = con.cursor() 
cur.execute(string)

rows = cur.fetchall()



if not rows:
	status="passive"
	string="INSERT INTO teacher  (firstn,lastn,facebookId,email,status) VALUES (\'%s\',\'%s\',\'%s\',\'%s\',\'%s\');" % (firstn,lastn,id,email,status)
	cur.execute(string)
	con.commit()
	con.close()
	result=result %("passive")
	print result
else:
	for row in rows:
		if row["status"]=="active":
			result=result %(row["id"])
		else:
			result=result %("passive")
		print result
