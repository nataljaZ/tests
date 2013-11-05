#!/usr/bin/python

import sqlite3 as lite
import cgi
import sys

print "Content-type: text/html"
print
  
form = cgi.FieldStorage()
if form.has_key('id'):
	id = form['id'].value
else:
	id=""
	

	




string="DELETE FROM test WHERE id=\"%s\";" % (id)

print string
con = lite.connect('test.db')  


     
cur = con.cursor() 

cur.execute(string)

con.commit()


con.close()

print "success"
