#!/usr/bin/python

import sqlite3 as lite
import cgi
import sys

print "Content-type: text/html"
print
  
form = cgi.FieldStorage()
if form.has_key('title'):
	title = form['title'].value
else:
	title=""
	
if form.has_key('description'):
	description = form['description'].value
else:
	description=""
	
if form.has_key('questions'):
	questions = form['questions'].value
else:
	questions=""
	
if form.has_key('from'):
	datefrom = form['from'].value
else:
	datefrom=""
	
if form.has_key('to'):
	dateto = form['to'].value
else:
	dateto=""
	
if form.has_key('status'):
	status = form['status'].value
else:
	status=""

if form.has_key('teacher'):
	teacher = form['teacher'].value
else:
	teacher=""

if form.has_key('language'):
	language = form['language'].value
else:
	language=""
	
if form.has_key('auth'):
	auth = form['auth'].value
else:
	auth=""

string="INSERT INTO test (title,description,question,datefrom,dateto,status,teacher,language,authentication) VALUES (\'%s\',\'%s\',\'%s\',\'%s\',\'%s\',\'%s\',\'%s\',\'%s\',\'%s\');" % (title,description,questions,datefrom,dateto,status,teacher,language,auth)

print string
con = lite.connect('test.db')  


     
cur = con.cursor() 

cur.execute(string)

con.commit()


con.close()

print "success"
