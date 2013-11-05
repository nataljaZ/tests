#!/usr/bin/python
# -*- coding: iso-8859-1 -*-
import sqlite3 as lite
import csv
import cgi
import sys
import StringIO

#print "Content-type: text/html"
print "Content-type: application/vnd.ms-excel"
print 'Content-Disposition: attachment; filename="answers.csv"'
print
form = cgi.FieldStorage()

if form.has_key('id'):
	id = form['id'].value
else:
	id=""
	
con = lite.connect('test.db')  

con.row_factory = lite.Row
       
cur = con.cursor() 
string="SELECT * FROM answer WHERE test_id=\'%s\';" % (id)
cur.execute(string)
rows = cur.fetchall()
data=[]
try:
	#print "start"
	output = StringIO.StringIO()
	#print "create"
	writer = csv.writer(output, delimiter=";")
	#print "done"
	writer.writerow([ i[0] for i in cur.description ])
	for row in rows:
		for col in row:
			if isinstance(col,basestring):
				col=col.encode("iso-8859-1")
			data.append(col)
		#print data
		writer.writerow(data)
		data=[]
		#writer.writerow([row["id"],row["test_id"],row["stfirstn"],row["stlastn"],row["stcode"],row["stemail"],row["etime"],row["a0"],row["a1"],row["a2"].encode("iso-8859-1")])
		#print row["a2"].encode("iso-8859-1")
	#print "write"
	print output.getvalue()
except Exception, e:
	print e



	


