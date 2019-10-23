import requests
import time
import os
import datetime
class Server_Monitor(object):
    __target_url = None
    __script_file = None
    __timeInterval = 60

    def __init__(self, url_to_monitor, script_file_to_trigger):
        self.__target_url = url_to_monitor
        self.__script_file = script_file_to_trigger

    def __fix_url(self, url):
        if url.startswith('http://www.'):
            return 'http://' + url[len('http://www.'):]
        if url.startswith('www.'):
            return 'http://' + url[len('www.'):]
        if not url.startswith('http://'):
            return 'http://' + url
        return url

    def __get_url_status(self):
        self.__target_url = self.__fix_url(self.__target_url)
        req = requests.get(self.__target_url)
        print "Status Code : " + str(req.status_code)
        return req.status_code

    def Monitor(self):
        try:
            is404 = False
            if self.__get_url_status() != 404:
		print "No 404"
                #time.sleep(1 * self.__timeInterval)
            else:
               is404 = True

            if is404:
                os.system("sh " +self.__script_file)
                f = open("restartlog",'a')
                print >>f, 'restarted'
        except:
               print("Connection error:")
               os.system("python /root/app/project/plotsgraph_with_backend/app.py")
if __name__ == '__main__':
    serverMonitor = Server_Monitor("http://78.47.36.48:3000", "/root/server-djvu-pdf/kill-php-fpm-start.sh")
    serverMonitor.Monitor()
    print "Done!"

