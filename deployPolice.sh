tar -czf dist_police.tar dist_police
scp dist_police.tar root@xzd.me:/home/test-chat33pro-police/dist_police.tar
rm -rf dist_police.tar
ssh root@xzd.me 'cd /home/test-chat33pro-police && tar -xzf dist_police.tar && rm -rf dist_police.tar && rm web -rf && mv dist_police web'
echo '👉 https://test-chat33pro-police.xzd.me/web/ done'