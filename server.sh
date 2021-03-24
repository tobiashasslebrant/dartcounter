python -m SimpleHTTPServer 8099 &
google-chrome http://0.0.0.0:8099
kill -9 `ps -ef |grep SimpleHTTPServer |grep 8099 |awk '{print $2}'`
