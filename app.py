#################################################################################################################
###                                                                                                            ###
###                               import the nessecary libraries                                               ###
##################################################################################################################
from flask import (
    Flask,
    request,
    abort,
    session, 
    render_template
)
import json
import os
from os import listdir
from os.path import isfile, join
import datetime
import uuid
import subprocess
from flask_googletrans import translator
from random import randint


#from functions import *

STATIC_DIR = os.path.abspath('./static')
TEMPLATE_DIR = os.path.abspath('./views')

app = Flask(__name__, template_folder=TEMPLATE_DIR, static_folder=STATIC_DIR)
ts = translator(app)
@app.route('/postXML', methods=['POST','GET'])
def postXML():

    cur_str = str(request.json)
    data = cur_str.split('xlow')
    print(data)
    xml = data[0]
    data2 = data[1].split("xhigh")
    xlow=data2[0]
    xhigh = data2[1]
    #xhigh = int(data[1].replace('xhigh', '').strip())
    print(xml)
    print(xlow)
    print("xhigh",xhigh)

    rand = randint(-10, -1)

    my_json =[{
            'x': xlow,
            'y': xlow
        }, {
            'x': rand,
            'y': randint(-25, 25),
        }, {
            'x': -rand,
            'y': randint(-25, 25),
        }, {
            'x': xhigh,
                'y': xhigh
        }]
    print(my_json)
    #print("JSON",json.dumps(dict_object))
    #print("JSON dummy",json.dumps(my_json))
    return json.dumps(my_json) #sending my dummy data

@app.route('/postDerive', methods=['POST','GET'])
def postDerive():

    # cur_str = str(request.json)
    # data = cur_str.split('xlow')
    # print(data)
    # xml = data[0]
    # data2 = data[1].split("xhigh")
    # xlow=data2[0]
    # xhigh = data2[1]
    # #xhigh = int(data[1].replace('xhigh', '').strip())
    # print(xml)
    # print(xlow)
    # print("xhigh",xhigh)

    # unique_filename = str(uuid.uuid4())
    
    # # Write-Overwrites 
    # file1 = open("/tmp/"+unique_filename,"w")#write mode
    # file1.write(xml)
    # file1.close()

    # #p1 = subprocess.Popen(('someprog.exe', str(i))
    # #p2.wait()
	
    # os.system("/root/test/plot-graphs/charts/pg-cli "+"/tmp/"+unique_filename+" derive")
    # os.system("python functions.py "+"/tmp/"+unique_filename+".txt "+str(xlow)+" "+str(xhigh)) 
    # #print(evaluate('cos(x)+(e^(x)/ln(x))', 1, 10, 1))
   
    # fn="/tmp/"+unique_filename+".txt.json"
    # file2 = open(fn,"r")#write mode
    # print("File2: "+fn)
    # #contents =file2.read()
    # #contents=contents.strip()
    # #print(contents)
    # #d = json.loads(contents)
    # # Load JSON file data to a python dict object.
    # dict_object = json.load(file2)
    # print("Dict object",dict_object)
    # my_json =[{
    #         'x': xlow,
    #         'y': xlow
    #     }, {
    #         'x': -1,
    #         'y': -1
    #     }, {
    #         'x': 1,
    #         'y': 1
    #     }, {
    #         'x': xhigh,
    #         'y': xhigh
    #     }]
    # print(request.json)
    # #print("JSON",json.dumps(dict_object))
    # #print("JSON dummy",json.dumps(my_json))
    # return dict_object #sending my dummy data
    cur_str = str(request.json)
    data = cur_str.split('xlow')
    print(data)
    xml = data[0]
    data2 = data[1].split("xhigh")
    xlow=data2[0]
    xhigh = data2[1]
    #xhigh = int(data[1].replace('xhigh', '').strip())
    print(xml)
    print(xlow)
    print("xhigh",xhigh)

    rand = randint(-10, -1)

    my_json =[{
            'x': xlow,
            'y': xlow
        }, {
            'x': rand,
            'y': randint(-25, 25),
        }, {
            'x': -rand,
            'y': randint(-25, 25),
        }, {
            'x': xhigh,
            'y': xhigh
        }]
    print(my_json)
    #print("JSON",json.dumps(dict_object))
    #print("JSON dummy",json.dumps(my_json))
    return json.dumps(my_json) #sending my dummy data


@app.route('/')
def home():
    id=request.values.get("id")
    return render_template("index.html", id=id)

@app.route('/ads.txt')
def ads():
    return "google.com, pub-4559838995070559, DIRECT, f08c47fec0942fa0"


@app.route('/3d-plot/')
def threeD():
    id=request.values.get("id")
    return render_template("3d.html", id=id)


@app.route('/faq/')
def faq():
    id=request.values.get("id")
    return render_template("faq.html", id=id)

@app.route('/function-derivatives/')
def function_derivatives():
    id=request.values.get("id")
    return render_template("function-derivatives.html", id=id)
 
if __name__ == '__main__':
    app.run(host="localhost", port=3000, debug=True)
