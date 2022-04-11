tar -czf dist.tar dist
scp dist.tar root@xzd.me:/home/test-chat33pro/dist.tar
rm -rf dist.tar
ssh root@xzd.me 'cd /home/test-chat33pro && tar -xzf dist.tar && rm -rf dist.tar && rm web -rf && mv dist web'
echo '👉 https://test-chat33pro.xzd.me/web/ done'