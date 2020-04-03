pm2 stop fika-server
cd /app
rm -rf fika
echo "Fetching fika.."
git clone git@github.com:axelniklasson/fika.git
cd fika
echo "Building server"
cd server
yarn
echo "Launching server"
pm2 start index.js --name fika-server
cd ../client
echo "Building client"
yarn && yarn build
echo "Restarting nginx"
systemctl restart nginx
echo "Done!"