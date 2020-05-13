#!/usr/bin/env python3
# -*- coding: UTF-8 -*-
import requests
import json
import pymysql
import time
from django import db
from flask import Flask
from flask import request
from flask import jsonify
from gevent import monkey
from flask import Flask, render_template
from werkzeug.debug import DebuggedApplication
from geventwebsocket import WebSocketServer, WebSocketApplication, Resource
DBHOST = 'localhost'
DBUSER = 'root'
DBPASS = '123456'
DBNAME = 'syj'

app = Flask(__name__,static_folder=r"/workspace_bbt\CC")
@app.route("#",methods=['POST'])

def KaKuNin():
    data=request.get_json()
    IDO=data['ID']
    """数据库也要记录愿望的几个状态：未被人接收为0，已被人接收未完成1，已完成未确认2，完成并确认3"""
    try:
        db = pymysql.connect(DBHOST, DBUSER, DBPASS, DBNAME, charset='utf8mb4')
        cur = db.cursor()
        cur.execute('UPDATE hope SET HopeState=3 WHERE ID=IDO')
        retu = {"errcode": errcode}
        response = requests.post('2', json=retu, headers=headers)
    except pymysql.Error as e:
        errcode = 404
        retu = {"errcode": errcode}
        response = requests.post('', json=retu, headers=headers)
    db.close()
