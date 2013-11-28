#!/usr/bin/python
import sqlite3 as lite
import cgi
import sys

print "Content-type: text/html"
print

css="""body {text-align:left}
		table {padding-left:10px}
		td {padding-right:30px}"""


resheader="""<!DOCTYPE html>
			<html lang="en">
			  <head>
				<meta charset="utf-8">
				<title>Tests</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta name="description" content="">
				<meta name="author" content="">

				<!-- Le styles -->
				<link href="../css/bootstrap.css" rel="stylesheet">
				<link href="../css/myCss.css" rel="stylesheet">
				
			  </head>
			  <body>
				<div class="container">
					<div class="header">
					</div>
					<div class="content">
						<h2>Statistics</h2>"""
resfooter="</div></div></body></html>"
print resheader

form = cgi.FieldStorage()

if form.has_key('id'):
	id = form['id'].value
else:
	id=""
	
answers = ['a0','a1','a2','a3','a4','a5','a6','a7','a8','a9','a10',
'a11','a12','a13','a14','a15','a16','a17','a18','a19','a20','a21','a22','a23','a24','a25','a26','a27','a28','a29','a30']

con = lite.connect('test.db')  

con.row_factory = lite.Row
       
cur = con.cursor() 
#string="SELECT * FROM answer WHERE test_id=\'%s\';" % (id)
string="SELECT COUNT(*) FROM answer WHERE test_id=\'%s\';" % (id)

cur.execute(string)
rows = cur.fetchall()
all=""
for row in rows:
	all=str(row[0])
	print "Number of students who did the test: <b>"+all+"</b><br><br>"

counter=1

try:
	
	for el in answers:
		print "<b>Question "+str(counter)+"</b><br><table class='table'  style='width:300px'>"
		#print all
		string="SELECT "+el+",count(*)*100/"+all+" from answer WHERE test_id="+id+" group by "+el+";"
		#print string
		cur.execute(string)
		rows = cur.fetchall()
		for row in rows:
			print "<tr>"
			for index,col in enumerate(row):
				if isinstance(col,basestring):
					col=col.encode("utf-8")
				if not col:
					print "<td  style='width:80%; padding-left:30px'>NO ANSWER</td>"
				else:
					if index==0:					
						print "<td  style='width:80%; padding-left:30px'>"+str(col)+"</td>"
					else:
						print "<td  style='width:20%'>"+str(col)+"%</td>"
			print "</tr>"
		print "</table><br>"
		counter=counter+1
	print resfooter
except Exception, e:
	print e



	


