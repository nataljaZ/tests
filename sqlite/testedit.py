#!/usr/bin/python

import sqlite3 as lite
import cgi
import sys
import datetime

print "Content-type: text/html"
print
  
form = cgi.FieldStorage()

if form.has_key('id'):
	id = form['id'].value
else:
	id=""

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

now = datetime.datetime.now()
lastchanged=now.strftime("%Y-%m-%d %H:%M")
string="UPDATE test SET title=\'%s\',description=\'%s\',question=\'%s\',datefrom=\'%s\',dateto=\'%s\',lastchanged=\'%s\',status=\'%s\',teacher=\'%s\',language=\'%s\',authentication=\'%s\' WHERE id=\"%s\";" % (title,description,questions,datefrom,dateto,lastchanged,status,teacher,language,auth,id)

print string
con = lite.connect('test.db')  

#print string
     
cur = con.cursor() 

cur.execute(string)

con.commit()


con.close()

print "success"
