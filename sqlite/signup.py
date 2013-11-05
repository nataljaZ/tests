#!/usr/bin/python

import sqlite3 as lite
import cgi
import sys

print "Content-type: text/html"
print
  
form = cgi.FieldStorage()
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
	
if form.has_key('password'):
	password = form['password'].value
else:
	password=""
	
status="passive"

string="INSERT INTO teacher (firstn,lastn,email,password,status) VALUES (\'%s\',\'%s\',\'%s\',\'%s\',\'%s\');" % (firstn,lastn,email,password,status)

print string
con = lite.connect('test.db')  


     
cur = con.cursor() 

cur.execute(string)

con.commit()


con.close()

print "success"
